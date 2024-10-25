import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditAppointment = ({ appointmentId, onUpdateSuccess, uid }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [appointment, setAppointment] = useState({
    session: '',
    date_time: '',
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/appointments/${appointmentId}`);
        setAppointment({
          session: response.data.session || '',
          date_time: response.data.date_time || '',
        });
      } catch (error) {
        console.error('Error fetching appointment details', error);
      }
    };
    fetchAppointment();
  }, [appointmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/appointments/${appointmentId}`, { 
      ...appointment,
      uid
    });
      onUpdateSuccess(); // Call the success callback
    } catch (error) {
      console.error('Error updating the appointment', error);
    }
  };

  return (
    <Form 
      className="p-4" 
      style={{ backgroundColor: 'white', borderRadius: '10px' }} 
      onSubmit={handleSubmit}
    >
      <h3 className="text-center" style={{ fontFamily: 'Kotohogi', fontWeight: 'bold' }}>Edit Appointment</h3>

      <Form.Group controlId="formBasicSelect">
        <Form.Label>Select session</Form.Label>
        <Form.Control 
          as="select" 
          name="session" 
          value={appointment.session} 
          onChange={handleChange} 
          required
        >
          <option value="">Select session</option>
          <option value="Weight Training">Weight Training</option>
          <option value="Physiotherapy">Physiotherapy</option>
          <option value="Cardio">Cardio</option>
          <option value="HIIT">HIIT</option>
          <option value="HIIT">Martial Art</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicDateTime">
        <Form.Label>Date and Time</Form.Label>
        <Form.Control 
          type="text" 
          name="date_time" 
          value={appointment.date_time} 
          onChange={handleChange} 
          placeholder="Date and Time" 
          required 
        />
      </Form.Group>

      <Button 
        type="submit" 
        className="btn btn-primary mt-3"
      >
        Update
      </Button>
    </Form>
  );
};

export default EditAppointment;
