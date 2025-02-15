import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "./Button";
import Modal from "./Modal";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination"; // Import the Pagination component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: "pet_name",
    order: "asc",
  });
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10); // Number of appointments per page
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/check-auth",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/appointments",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setAppointments(response.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchUser();
      fetchAppointments();
    }
  }, [navigate]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
    setShowModal(false);
  };

  const updateAppointment = (updatedAppointment) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      )
    );
  };

  const deleteAppointment = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleSort = (field, order) => {
    setSortConfig({ field, order });
  };

  const filteredAndSortedAppointments = [...appointments]
    .filter(
      (appointment) =>
        appointment.pet_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.pet_owner?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.order === "asc") {
        return a[sortConfig.field] > b[sortConfig.field] ? 1 : -1;
      } else {
        return a[sortConfig.field] < b[sortConfig.field] ? 1 : -1;
      }
    });

  // Get current appointments
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAndSortedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Pets Medicare" onLogout={handleLogout} />

      <div className="container mx-auto p-6 flex flex-col items-center">
        <Button
          onClick={() => setShowModal(true)}
          className="bg-purple-700 text-white py-3 px-6 rounded-lg text-lg w-full max-w-xs"
        >
          + Add Appointment
        </Button>

        <div className="flex flex-col md:flex-row justify-between w-full max-w-3xl mt-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <SortDropdown onSort={handleSort} />
        </div>

        <AppointmentList
          appointments={currentAppointments}
          onUpdate={updateAppointment}
          onDelete={deleteAppointment}
          user={user}
          className="mt-6 w-full max-w-3xl"
        />

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <AppointmentForm onAdd={addAppointment} onSave={updateAppointment} />
        </Modal>

        <Pagination
          appointmentsPerPage={appointmentsPerPage}
          totalAppointments={filteredAndSortedAppointments.length}
          paginate={paginate}
        />
      </div>

      <footer className="bg-purple-700 text-white text-center py-4 mt-auto">
        <p>All contents © 2025</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="underline">
            Terms of use
          </a>
          <a href="#" className="underline">
            Privacy policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
