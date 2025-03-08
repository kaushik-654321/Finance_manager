import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Personal Expense Tracker</h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "font-bold underline" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "font-bold underline" : ""}`
              }
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/budgets"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? "font-bold underline" : ""}`
              }
            >
              Budgets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="hover:text-gray-200"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
