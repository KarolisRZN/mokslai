import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button 
      onClick={onClick} 
      className="bg-purple-600 text-white py-2 px-4 rounded mt-2 hover:bg-purple-700"
    >
      {children}
    </button>
  );
};

export default Button;
