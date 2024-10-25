import React, { useContext, useEffect, useState } from 'react';
import EditAppointment from './EditAppointment';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../components/AuthProvider';

const MyAppointment = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { currentUser } = useContext(AuthContext)
  const uid = currentUser?.uid;
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

const fetchAppointments = async () => {
    const uid = currentUser?.uid; // Assuming you have currentUser from AuthContext
    if (!uid) {
        console.error("User ID (uid) is not available.");
        return;
    }
    try {
        const response = await axios.get(`${BASE_URL}/appointments`, {
            params: { uid }, // Include uid as a query parameter
        });
        setAppointments(response.data.data);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting the appointment', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleUpdateSuccess = () => {
    handleClose();
    fetchAppointments(); // Refresh the appointments after updating
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container fluid className="mt-4">
      {appointments.length > 0 ? (
        appointments.map(appt => (
          <Row key={appt.id} className="mb-3 border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
            <Col className="d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h5>{appt.session}</h5>
                  <p>{appt.date_time}</p>
                </div>
                <div>
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="me-2" 
                    onClick={() => handleEdit(appt.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    size="md" 
                    onClick={() => handleDelete(appt.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <Row className="mb-3">
          <Col className="text-center">
            <p>No appointments scheduled.</p>
          </Col>
        </Row>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingId && (
            <EditAppointment 
              appointmentId={editingId} 
              // Pass the callback to the EditAppointment
              onUpdateSuccess={handleUpdateSuccess}
              uid = {currentUser?.uid} 
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default MyAppointment;
