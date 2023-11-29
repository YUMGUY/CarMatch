import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FormSelect } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("Any");

  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("Any");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBrand();
  }, []);

  useEffect(() => {
    fetchModel(selectedBrand);
  }, [selectedBrand]);

  const handleSearch = async () => {
    try {
      const computedData = await findSimilarResults();
      navigate("/results", {
        state: {
          data: computedData,
          model: selectedModel,
          brand: selectedBrand,
        },
      });
    } catch (error) {
      console.error("Error finding similar results:", error);
    }
  };

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

  const findSimilarResults = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/similar/${selectedBrand}/${selectedModel}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;
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
          <FormSelect
            onChange={(event) => setSelectedModel(event.target.value)}
          >
            <option value="Any">Any Model</option>
            {models.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Col>
          <Button
            onClick={() => handleSearch()}
            variant="primary"
            disabled={selectedBrand === "Any"}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
