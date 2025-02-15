// filepath: /C:/Users/pakaifu/Desktop/Pets/frontend/src/components/Pagination.jsx
import React from "react";

const Pagination = ({ appointmentsPerPage, totalAppointments, paginate }) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalAppointments / appointmentsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item mx-1">
            <button
              onClick={() => paginate(number)}
              className="page-link bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
