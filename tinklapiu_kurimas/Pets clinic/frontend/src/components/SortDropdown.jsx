import React from "react";

const SortDropdown = ({ onSort }) => {
  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    onSort(field, order);
  };

  return (
    <select
      onChange={handleSortChange}
      className="border border-gray-300 rounded-lg p-2"
    >
      <option value="pet_name-asc">Pet Name (A-Z)</option>
      <option value="pet_name-desc">Pet Name (Z-A)</option>
      <option value="pet_owner-asc">Owner Name (A-Z)</option>
      <option value="pet_owner-desc">Owner Name (Z-A)</option>
      <option value="date-asc">Date (Ascending)</option>
      <option value="date-desc">Date (Descending)</option>
      <option value="time-asc">Time (Ascending)</option>
      <option value="time-desc">Time (Descending)</option>
    </select>
  );
};

export default SortDropdown;
