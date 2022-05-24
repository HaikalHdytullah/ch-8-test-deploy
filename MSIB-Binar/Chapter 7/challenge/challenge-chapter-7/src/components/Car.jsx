import React from "react";
import { Card } from "react-bootstrap";
import "../css/searchCar.css";

const Car = ({ car }) => {
  const {
    manufacture,
    image,
    rent_per_day,
    capacity,
    description,
    transmission,
    year,
    model,
  } = car;

  return (
    <Card className="h-100">
      <Card.Body>
        <img
          src={image}
          alt={(manufacture, model)}
          className="img-fluid img-car mb-3 h-100"
        />
        <br />
        <Card.Text>
          {manufacture} {model}
        </Card.Text>
        <Card.Text>
          {capacity} seats, {transmission} transmission, {year}
        </Card.Text>
        <Card.Text>Rp. {rent_per_day} / day</Card.Text>
        <Card.Text className="text">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Car;
