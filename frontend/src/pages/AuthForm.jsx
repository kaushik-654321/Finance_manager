import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./authform.css";

const API_URL = "https://reimagined-winner-6p9qqpq74xw3w7v-5001.app.github.dev/api/user";

const AuthForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Separate form states for login and register
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    let newErrors = {};

    if (activeTab === "register") {
      if (!registerData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!registerData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(registerData.email)) newErrors.email = "Valid email is required";
      if (!registerData.phone || !/^\d{10}$/.test(registerData.phone)) newErrors.phone = "Valid 10-digit phone number is required";
      if (!registerData.password.trim()) newErrors.password = "Password is required";
      else if (registerData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    } else {
      if (!loginData.email.trim()) newErrors.email = "Email is required";
      if (!loginData.password.trim()) newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const endpoint = activeTab === "login" ? "/login" : "/register";
      const payload = activeTab === "login" ? loginData : registerData;
      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      toast.success(response.data.message);
      localStorage.setItem("userToken", response.data.token);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-8">
        
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-3 text-lg font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "login" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-lg font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "register" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {activeTab === "register" && (
            <>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  className={`w-full p-3 border rounded mt-1 focus:ring focus:ring-blue-200 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full p-3 border rounded mt-1 focus:ring focus:ring-blue-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              value={activeTab === "login" ? loginData.email : registerData.email}
              onChange={(e) =>
                activeTab === "login"
                  ? setLoginData({ ...loginData, email: e.target.value })
                  : setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          {activeTab === "register" && (
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className={`w-full p-3 border rounded mt-1 focus:ring focus:ring-blue-200 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          )}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className={`w-full p-3 border rounded mt-1 focus:ring focus:ring-blue-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              value={activeTab === "login" ? loginData.password : registerData.password}
              onChange={(e) =>
                activeTab === "login"
                  ? setLoginData({ ...loginData, password: e.target.value })
                  : setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          {activeTab === "register" && (
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className={`w-full p-3 border rounded mt-1 focus:ring focus:ring-blue-200 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          )}
          <button 
            type="submit" 
            className="w-full text-white login-btn cursor-pointer" 
            disabled={loading}
          >
            {loading ? "Processing..." : activeTab === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
