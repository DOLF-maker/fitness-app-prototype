import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLoadScript } from '@react-google-maps/api';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumns';
RightColumn

const center = {
  lat: 3.1525875, // Latitude for KLCC
  lng: 101.712256, // Longitude for KLCC
};

const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // or process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMarkerLibrary = async () => {
      if (map) {
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
        
        const marker = new AdvancedMarkerElement({
          map,
          position: center,
        });

        marker.addListener('click', () => {
          window.open('https://www.google.com/maps/place/Blueprint+Martial+Arts+Kuala+Lumpur+City+Centre/@3.1525875,101.7096811,17z/data=!3m1!4b1!4m6!3m5!1s0x31cc372a260d9c0d:0x1dc156933475ef44!8m2!3d3.1525875!4d101.712256!16s%2Fg%2F11w1v726kc?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D', '_blank');
        });
      }
    };

    loadMarkerLibrary();
  }, [map]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container fluid className="mt-1">
    {/* Center the row content */}
    <Row className="justify-content-center my-5">
      {/* Left Column */}
      <Col xs={12} md={5} className="text-center mb-4">
        <LeftColumn />
      </Col>

      {/* Right Column */}
      <Col md={5} className="text-center mb-4">
        <RightColumn setMap={setMap} />
      </Col>
    </Row>
  </Container>
);
};
export default HomePage;
