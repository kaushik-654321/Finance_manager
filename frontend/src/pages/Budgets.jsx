import { useState } from "react";

const budgetData = [
  { category: "Groceries", budget: 500, spent: 300 },
  { category: "Rent", budget: 1200, spent: 1200 },
  { category: "Entertainment", budget: 200, spent: 150 },
  { category: "Transport", budget: 100, spent: 80 },
  { category: "Utilities", budget: 250, spent: 200 },
];

const Budgets = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredBudgets = budgetData.filter((budget) => {
    if (filter === "all") return true;
    if (filter === "overspent") return budget.spent > budget.budget;
    if (filter === "underspent") return budget.spent < budget.budget;
    return false;
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Budget Overview</h1>
      <p className="text-gray-600 text-center mb-6">Track your spending and manage budgets efficiently.</p>
      
      <div className="flex justify-center gap-3 mb-4">
        <button className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`px-4 py-2 rounded ${filter === "overspent" ? "bg-red-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("overspent")}>
          Overspent
        </button>
        <button className={`px-4 py-2 rounded ${filter === "underspent" ? "bg-green-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("underspent")}>
          Underspent
        </button>
      </div>

      <div className="space-y-4">
        {filteredBudgets.map(({ category, budget, spent }) => {
          const percentage = (spent / budget) * 100;
          return (
            <div key={category} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{category}</h2>
              <p className="text-gray-600">Budget: ${budget} | Spent: ${spent}</p>
              <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                <div
                  className={`h-4 rounded-full ${percentage > 100 ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;