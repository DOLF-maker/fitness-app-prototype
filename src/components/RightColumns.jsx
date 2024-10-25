import React from 'react';
import { Col } from 'react-bootstrap';
import { GoogleMap } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '400px',  // Set width to a smaller size
  height: '200px', // Set height to a smaller size
};

const center = {
  lat: 3.1525875, // Latitude for KLCC
  lng: 101.712256, // Longitude for KLCC
};

const RightColumn = ({ setMap }) => {
  return (
    <Col md={6}>  {/* Adjusted to use sm for smaller screens */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={{ mapId: 'DEMO_MAP_ID' }} // Replace with your actual map ID if available
        onLoad={mapInstance => setMap(mapInstance)} // Save the map instance
      />
      <div className='text-center mt-3 mx-3   '>
        <p>
          <i className="bi bi-geo-alt-fill"></i> Wisma Uoa 2, Unit 1-7/8, 21, Jalan Pinang, Kuala Lumpur, 50450
        </p>
        <p>
          <i className="bi bi-telephone-fill"></i> +60 10 907 6878
        </p>
        <p>
          <i className="bi bi-envelope-fill"></i> <a href="mailto:info@blueprintmartialarts.com">info@blueprintmartialarts.com</a>
        </p>
        <div>
          <i className="bi bi-globe"></i> <a href="https://blueprintmartialarts.com">blueprintmartialarts.com</a>
        </div>
        <div className="mt-3">
          <a href="https://instagram.com/blueprintmartialarts">
            <i className="bi bi-instagram"></i>
          </a> |{' '}
          <a href="https://facebook.com/blueprintmartialarts">
            <i className="bi bi-facebook"></i>
          </a>
        </div>
      </div>
    </Col>
  );
};

export default RightColumn;

