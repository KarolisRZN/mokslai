import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      setError("Error registering user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
            Register
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-4 hover:bg-gray-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
