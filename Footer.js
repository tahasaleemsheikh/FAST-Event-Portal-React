import React, { useState } from 'react';
import { Card, Button, Badge, Col } from 'react-bootstrap';

// Maps each category to a Bootstrap color
const categoryColor = {
  Tech: 'primary',
  Sports: 'success',
  Arts: 'warning',
};

// EventCard manages isRegistered and seatsLeft as local state (Task 3)
function EventCard({ title, desc, category, seats, onRegister }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(seats); // initialized from props

  const handleRegister = () => {
    if (isRegistered || seatsLeft === 0) return;

    setIsRegistered(true);        // mark this event as registered
    setSeatsLeft(prev => prev - 1); // decrease seatsLeft by 1
    onRegister(title);            // notify App.js to update global state
  };

  // Decide card border color based on status
  const borderColor = isRegistered ? 'success' : seatsLeft === 0 ? 'danger' : 'primary';

  // Decide button variant based on status
  const btnVariant = isRegistered ? 'success' : seatsLeft === 0 ? 'secondary' : 'primary';

  // Decide button label based on status
  const btnLabel = isRegistered ? 'Registered ✓' : seatsLeft === 0 ? 'Full' : 'Register';

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card border={borderColor} className="h-100 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          {/* Category badge */}
          <Badge bg={categoryColor[category] || 'secondary'}>
            {category}
          </Badge>
          {/* Seats remaining badge */}
          <Badge bg={seatsLeft === 0 ? 'danger' : 'info'}>
            {seatsLeft === 0 ? '🚫 Full' : `🪑 ${seatsLeft} seat${seatsLeft > 1 ? 's' : ''} left`}
          </Badge>
        </Card.Header>

        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="text-muted flex-grow-1">{desc}</Card.Text>

          <Button
            variant={btnVariant}
            disabled={isRegistered || seatsLeft === 0}
            onClick={handleRegister}
            className="w-100 mt-2"
          >
            {btnLabel}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default EventCard;
