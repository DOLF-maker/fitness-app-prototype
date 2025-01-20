// ShowBookingPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddAppointment from "./BookingForm";
import EditAppointment from "./EditAppointment";
import { AuthContext } from "../components/AuthProvider";

const ShowAppointmentCard = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const uid = "USER_UID";

  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which appointment is being edited

  const fetchAppointments = async () => {
    const response = await axios.get(`${BASE_URL}/appointments`);
    setAppointments(response.data.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/appointments/${id}`);
      // Refresh the appointment list after deletion
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting the appointment", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container fluid className="mt-4">
      <AddAppointment fetchAppointments={fetchAppointments} />{" "}
      {/* Pass fetchAppointments to AddAppointment */}
    </Container>
  );
};

export default ShowAppointmentCard;
