import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FormSelect } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarCard from "../components/CarCard";

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("Any");

  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchBrand();
  }, []);

  useEffect(() => {
    fetchModel(selectedBrand);
  }, [selectedBrand]);

  const fetchModel = async (selectedBrand) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/models/${selectedBrand}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setModels(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/brands");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setBrands(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Container>
      <h1>Find a Similar Car</h1>
      <Row>
        <Col>
          <FormSelect
            onChange={(event) => setSelectedBrand(event.target.value)}
          >
            <option value="Any">Any Make</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Col>
          <FormSelect>
            <option value="Any">Any Model</option>
            {models.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Col>
          <Link to={"/results"}>
            <Button variant="primary">Search</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
