import React from "react";
import Button from "./Button";

const Header = ({ title, onLogout }) => {
  return (
    <header className="bg-purple-700 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button
        onClick={onLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-lg"
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
