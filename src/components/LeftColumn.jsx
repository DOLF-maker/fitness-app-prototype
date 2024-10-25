import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LeftColumn = () => {
  return (
    <Col>
      <img 
        src="https://static.wixstatic.com/media/59c26c_82294ea93f9943a198b2eb6896404923~mv2.webp/v1/fill/w_479,h_479,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/171a2908-6469b5245801a.webp" 
        alt="Blueprint Martial Arts"
        className="img-fluid"
      />
      <h1 className="mt-4">Blueprint Martial Arts - KLCC</h1>
      <p className="mt-3">
        Martial Arts help build fitness, morale, discipline and have many other
        positive impacts on people's lives. Their goal at Blueprint Martial Arts is to
        provide a haven for training in multiple Martial Arts styles and disciplines
        for people of all ages.
      </p>
      <Link to="/booking">
        <Button variant="primary" size="md" className="mt-4 shadow">
          Book an Appointment
        </Button>
      </Link>
    </Col>
  );
};

export default LeftColumn;
