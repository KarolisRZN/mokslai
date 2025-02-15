import React, { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Modal from './components/Modal';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const PetAppointments = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <Container>
      <Header title="Pets Medicare" />
      <Button onClick={() => setShowModal(true)}>+ Add Appointment</Button>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AppointmentForm onClose={() => setShowModal(false)} />
      </Modal>
      <AppointmentList />
    </Container>
  );
};

export default PetAppointments;
