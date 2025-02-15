import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({ title, buttonText, onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ...(isRegister && { confirmPassword: '' }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        <form onSubmit={(e) => onSubmit(e, formData)}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
          )}
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
            {buttonText}
          </button>
        </form>
        <p className="text-center mt-4">
          {isRegister ? (
            <>
              Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
            </>
          ) : (
            <>
              Don't have an account? <Link to="/register" className="text-purple-600">Sign Up</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
