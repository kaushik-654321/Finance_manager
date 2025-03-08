import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://financemanager-production-2712.up.railway.app/api/transactions";

const fetchTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const Transactions = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  // Fetch transactions with React Query (caching included)
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]); // Refresh data after delete
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // Filter transactions
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

      {/* Handle Loading & Error States */}
      {isLoading && <div className="text-center py-4 text-gray-600">Loading transactions...</div>}
      {error && <div className="text-center py-4 text-red-500">Error loading data!</div>}

      {!isLoading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Type</th>
             
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
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
