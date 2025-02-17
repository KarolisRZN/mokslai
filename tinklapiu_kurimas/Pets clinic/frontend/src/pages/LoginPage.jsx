import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      setMessage(response.data.message);

      // fetch user data after login
      const userResponse = await axios.get(
        "http://localhost:5000/api/check-auth",
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      );
      setUser(userResponse.data.user);

      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-4 hover:bg-gray-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
