import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://reimagined-winner-6p9qqpq74xw3w7v-5001.app.github.dev/api/transactions";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (filter === "all" || transaction.type === filter) &&
      transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transactions Management</h1>
      <p className="mb-4">Manage your income and expenses.</p>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id} className="text-center">
              <td className="border p-2">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="border p-2">{transaction.description}</td>
              <td className={`border p-2 ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                ${Math.abs(transaction.amount)}
              </td>
              <td className="border p-2 capitalize">{transaction.type}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(transaction._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
