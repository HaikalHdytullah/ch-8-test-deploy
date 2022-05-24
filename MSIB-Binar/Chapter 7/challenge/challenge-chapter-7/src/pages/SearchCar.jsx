import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { getAllCars } from "../redux/actions/carActions";

// Import components
import NavBar from "../components/Navbar";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import Car from "../components/Car";

import "../css/searchCar.css";

function SearchCar(props) {
  const dispatch = useDispatch();
  const { cars, error } = useSelector((state) => state.post);

  useEffect(() => {
    (async () => {
      dispatch(getAllCars());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passenger, setPassenger] = useState("");
  const [driver, setDriver] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date === "") {
      alert("Date is required");
    }
    if (time === "") {
      alert("Time is required");
    }
    if (passenger === "") {
      alert("Passenger is required");
    }
    if (driver === "") {
      alert("Driver is required");
    }
    if (date !== "" && time !== "" && passenger !== "" && driver !== "") {
      dispatch(getAllCars({ date, time, passenger }));
    }
  };

  return (
    <>
      {/* Navbar and Main Section */}
      <div className="bg-nav">
        <NavBar />
        <MainSection />
      </div>
      {/* Search Container */}
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="search p-4 row-cols-md-auto mx-auto mb-4">
            <Col md={6} sm={12} lg className="p-2 mb-2 mx-auto">
              <Form.Label>Tipe Driver</Form.Label>
              <Form.Select
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
              >
                <option selected value="">
                  Pilih Tipe Driver
                </option>
                <option value="1">Dengan Sopir</option>
                <option value="2">Tanpa Sopir (Lepas Kunci)</option>
              </Form.Select>
            </Col>
            <Col md={6} sm={12} lg className="p-2 mb-2 mx-auto">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Col>
            <Col md={6} sm={12} lg className="p-2 mb-2 mx-auto">
              <Form.Label>Waktu Jemput/Ambil</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></Form.Control>
            </Col>
            <Col md={6} sm={12} lg className="p-2 mb-2 mx-auto">
              <Form.Label>Jumlah Penumpang (optional)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Jumlah Penumpang"
                className="passenger"
                value={passenger}
                onChange={(e) => setPassenger(e.target.value)}
              ></Form.Control>
            </Col>
            <Col md={12} sm={12} lg={2} className="p-2 mb-2 m-auto">
              <Button variant="success" type="submit" className="w-100">
                Cari Mobil
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        {handleSubmit ? (
          <>
            <Row className="my-4">
              {cars.length === 0 ? (
                <>
                  <h1>Loading...</h1>
                </>
              ) : (
                cars.map((car) => (
                  <Col key={car.id} md={4} className="my-2">
                    <Car car={car} />
                  </Col>
                ))
              )}
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
      {/* Footer Section */}
      <Footer />
    </>
  );
}

export default SearchCar;
