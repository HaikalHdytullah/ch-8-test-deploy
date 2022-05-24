import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/searchCar.css";
import Mobil from "../img/mobil.png";
function MainSection() {
  return (
    <>
      <Container className="d-flex">
        <Row>
          <Col sm={12} md={5} lg={5} className="main-section-left">
            <h3>
              <strong>Sewa & Rental Mobil Terbaik di Kawasan Karawang</strong>
            </h3>
            <p>
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
          </Col>
          <Col sm={12} md={7} lg={7} className="main-section-right">
            <img src={Mobil} className="img-fluid" alt="Car" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainSection;
