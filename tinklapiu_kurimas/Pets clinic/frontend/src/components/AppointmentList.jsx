import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import AppointmentForm from "./AppointmentForm";
import axios from "axios";

const AppointmentList = ({
  appointments,
  onUpdate,
  onDelete,
  user,
  className,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const handleEditClick = (appointment) => {
    console.log("Editing appointment:", appointment);
    setCurrentAppointment(appointment);
    setShowModal(true);
  };

  const handleUpdate = (updatedAppointment) => {
    console.log("Appointment updated:", updatedAppointment);
    onUpdate(updatedAppointment);
    setShowModal(false);
  };

  const handleStatusChange = async (appointment, status) => {
    console.log(
      `Changing status for appointment ${appointment.id} to ${status}`
    );

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${appointment.id}`,
        { ...appointment, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Updated appointment:", response.data);
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className={className}>
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        <ul className="border border-gray-300 rounded-lg overflow-hidden">
          {appointments.map((appointment, index) => {
            const formattedDate = appointment.date
              ? new Date(appointment.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Date not provided";

            const formattedTime = appointment.time
              ? new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString(
                  "en-GB",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )
              : "Time not provided";

            console.log("Appointment Date:", appointment.date);
            console.log("Formatted Date:", formattedDate);
            console.log("Appointment Time:", appointment.time);
            console.log("Formatted Time:", formattedTime);

            return (
              <li key={index} className="border-b p-4 flex flex-col">
                <div>
                  <h3 className="text-xl font-bold">{appointment.pet_name}</h3>
                  <p>Owner: {appointment.pet_owner}</p>
                  <p>Description: {appointment.description}</p>
                  <p>Date: {formattedDate}</p>
                  <p>Time: {formattedTime}</p>
                  <p>Status: {appointment.status}</p>
                </div>
                {user && (
                  <div className="flex space-x-2 mt-2">
                    {appointment.status === "pending" &&
                      user.role === "admin" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(appointment, "confirmed")
                            }
                            className="bg-green-500 text-white py-1 px-3 rounded"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(appointment, "rejected")
                            }
                            className="bg-red-500 text-white py-1 px-3 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    {appointment.status === "confirmed" && (
                      <>
                        <p className="text-green-500 font-bold">Confirmed</p>
                        {user.role === "admin" && (
                          <>
                            <button
                              onClick={() => handleEditClick(appointment)}
                              className="bg-blue-500 text-white py-1 px-3 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(appointment.id)}
                              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {appointment.status === "rejected" && (
                      <>
                        <p className="text-red-500 font-bold">Rejected</p>
                        {user.role === "admin" && (
                          <button
                            onClick={() => onDelete(appointment.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </>
                    )}
                    {appointment.status === "pending" && (
                      <>
                        {user.role === "admin" && (
                          <button
                            onClick={() => handleEditClick(appointment)}
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(appointment.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <AppointmentForm
            appointment={currentAppointment}
            onSave={handleUpdate}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

AppointmentList.propTypes = {
  appointments: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default AppointmentList;
