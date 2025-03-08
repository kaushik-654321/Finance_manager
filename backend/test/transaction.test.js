const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const Transaction = require("../models/Transaction");

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB server for testing
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Close database connection and stop server
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Transaction.deleteMany(); // Clear database before each test
});

describe("Transaction API Endpoints", () => {
  /** 🟢 Test: Create a new transaction */
  it("should create a new transaction", async () => {
    const res = await request(app).post("/api/transactions").send({
      description: "Groceries",
      amount: 100,
      type: "expense",
      category: "Food",
      isRecurring: false,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.description).toBe("Groceries");
  });

  /** 🟢 Test: Get all transactions */
  it("should fetch all transactions", async () => {
    await Transaction.create([
      { description: "Salary", amount: 5000, type: "income", category: "Job" },
      { description: "Movie", amount: 200, type: "expense", category: "Entertainment" },
    ]);

    const res = await request(app).get("/api/transactions");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  /** 🟢 Test: Get transaction by ID */
  it("should fetch a transaction by ID", async () => {
    const transaction = await Transaction.create({
      description: "Freelance Work",
      amount: 1200,
      type: "income",
      category: "Freelance",
    });

    const res = await request(app).get(`/api/transactions/${transaction._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe("Freelance Work");
  });

  /** 🔴 Test: Handle non-existing transaction */
  it("should return 404 if transaction does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/transactions/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });

  /** 🟢 Test: Update a transaction */
  it("should update a transaction", async () => {
    const transaction = await Transaction.create({
      description: "Shopping",
      amount: 1000,
      type: "expense",
      category: "Retail",
    });

    const res = await request(app)
      .put(`/api/transactions/${transaction._id}`)
      .send({ amount: 1200 });

    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(1200);
  });

  /** 🟢 Test: Delete a transaction */
  it("should delete a transaction", async () => {
    const transaction = await Transaction.create({
      description: "Gym Membership",
      amount: 500,
      type: "expense",
      category: "Health",
    });

    const res = await request(app).delete(`/api/transactions/${transaction._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Transaction deleted");
  });
});
