import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  // Sample Data
  const totalIncome = 75000;
  const totalExpense = 42000;
  const totalSavings = totalIncome - totalExpense;
  const monthlyEarnings = [40000, 45000, 50000, 55000, 60000, 75000];
  const expenseBreakdown = {
    labels: ["Rent", "Groceries", "Entertainment", "Transport", "Others"],
    data: [15000, 12000, 5000, 7000, 3000],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Financial Dashboard</h1>

      {/* Full-screen Grid Layout for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-screen">
        
        {/* Total Income & Expense Summary */}
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-green-600">Total Income: ₹{totalIncome}</h2>
          <h2 className="text-xl font-semibold text-red-500">Total Expense: ₹{totalExpense}</h2>
          <h2 className="text-xl font-semibold text-blue-600 mt-2">Total Savings: ₹{totalSavings}</h2>
        </div>

       

        {/* Expense Breakdown Pie Chart */}
        <div className="bg-white p-6 rounded shadow-md w-full mx-auto">
          <h2 className="text-lg font-semibold text-center">Expense Breakdown</h2>
          <Pie
            data={{
              labels: expenseBreakdown.labels,
              datasets: [
                {
                  data: expenseBreakdown.data,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-6 rounded shadow-md w-full mx-auto">
          <h2 className="text-lg font-semibold text-center">Financial Comparison</h2>
          <Radar
            data={{
              labels: expenseBreakdown.labels,
              datasets: [
                {
                  label: "Spending (₹)",
                  data: expenseBreakdown.data,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "#36A2EB",
                  borderWidth: 2,
                },
              ],
            }}
          />
        </div>

        {/* Monthly Earnings Line Chart */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold text-center">Monthly Earnings</h2>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Earnings (₹)",
                  data: monthlyEarnings,
                  borderColor: "#4F46E5",
                  borderWidth: 2,
                  fill: true,
                  backgroundColor: "rgba(79, 70, 229, 0.2)",
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>

        {/* Budget Trend Analysis */}
        <div className="bg-white p-6 rounded shadow-md col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-center">Budget Trend</h2>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Budget (₹)",
                  data: [50000, 52000, 54000, 56000, 58000, 60000],
                  borderColor: "#6366F1",
                  borderWidth: 2,
                  fill: false,
                  tension: 0.3,
                },
                {
                  label: "Expense (₹)",
                  data: [30000, 32000, 35000, 37000, 40000, 42000],
                  borderColor: "#EF4444",
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  borderWidth: 2,
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>

        {/* Spending Trends Bar Chart */}
        <div className="bg-white p-6 rounded shadow-md col-span-2">
          <h2 className="text-lg font-semibold mb-4">Spending Trends</h2>
          <Bar
            data={{
              labels: expenseBreakdown.labels,
              datasets: [
                {
                  label: "Amount (₹)",
                  data: expenseBreakdown.data,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
