import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';


const AddAppointment = ({ fetchAppointments }) => {
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    session: '',
    date_time: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalSession, setModalSession] = useState('');
  const [modalDateTime, setModalDateTime] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({...appointment, uid})
    try {
      const response = await axios.post(`${BASE_URL}/appointments`, { 
        ...appointment, 
        uid });

      console.log(response);

      // Set modal session and date time to show confirmation
      setModalSession(appointment.session);
      setModalDateTime(appointment.date_time);
      setShowModal(true); // Show the modal after successful submission



      // Reset the form
      setAppointment({ session: '', date_time: '' });
    } catch (error) {
      console.error('Error submitting the appointment', error);
      // You might want to show an error message to the user here
    }
  };

  const handleClose = () => {
    navigate('/myappointment');
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <Container 
        className="d-flex justify-content-center align-items-center" 
        fluid
        style={{ 
          height: '100vh', 
          backgroundImage: 'url(https://www.workoutbristol.co.uk/storage/app/uploads/public/5f6/dfa/f49/5f6dfaf4931df177553693.jpg)', 
          backgroundSize: 'cover' 
        }}
      >
        <Form 
          className="p-4" 
          style={{ backgroundColor: 'white', borderRadius: '10px' }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-center" style={{ fontFamily: 'Kotohogi', fontWeight: 'bold' }}>Book your fitness appointment</h1>

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
              <option value="Martial Art">Martial Art</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicDateTime">
            <Form.Label className='mt-3'>Date and Time</Form.Label>
            <Form.Control 
              type="datetime-local"  // Consider using datetime-local for better UX
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
            style={{ backgroundColor: '#007bff', borderColor: '#add8e6' }} // Light blue color
          >
            Submit
          </Button>
        </Form>
      </Container>

      <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Congratulations! You have booked ${modalSession} on ${modalDateTime}.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAppointment;
