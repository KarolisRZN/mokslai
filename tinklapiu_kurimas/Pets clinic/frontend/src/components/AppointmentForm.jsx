import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AppointmentForm = ({ appointment, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    pet_name: appointment?.pet_name || "",
    pet_owner: appointment?.pet_owner || "",
    description: appointment?.description || "",
    date: appointment?.date
      ? new Date(appointment.date).toISOString().split("T")[0]
      : "",
    time: appointment?.time || "",
    status: appointment?.status || "pending", // Ensure status is preserved
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting appointment:", formData);

    try {
      if (appointment) {
        console.log("Updating appointment");
        const response = await axios.put(
          `http://localhost:5000/api/appointments/${appointment.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        onSave(response.data);
      } else {
        console.log("Creating new appointment");
        const response = await axios.post(
          "http://localhost:5000/api/appointments",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        onSave(response.data);
      }
      console.log("Closing modal after save");
      onClose();
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white rounded-lg shadow-md w-full"
    >
      <h2 className="text-2xl font-bold mb-4">
        {appointment ? "Edit Appointment" : "New Appointment"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Pet Name</label>
        <input
          type="text"
          name="pet_name"
          value={formData.pet_name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Owner</label>
        <input
          type="text"
          name="pet_owner"
          value={formData.pet_owner}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => {
            console.log("Cancel button clicked");
            onClose();
          }}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

AppointmentForm.propTypes = {
  appointment: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AppointmentForm;
