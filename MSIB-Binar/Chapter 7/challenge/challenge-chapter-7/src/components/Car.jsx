import React from "react";
import { Card } from "react-bootstrap";

const Car = ({ car }) => {
  const { plate, manufacture } = car;

  return (
    <Card>
      <Card.Header as="h5">{plate}</Card.Header>
      <Card.Body>
        <Card.Title>{plate}</Card.Title>
        <Card.Text>{plate}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Car;
