import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CarCard from "../components/CarCard";

const Results = () => {
  const location = useLocation();
  const similarCars = location.state?.data;

  const chunkArray = (array, columns) => {
    const result = [];
    for (let i = 0; i < array.length; i += columns) {
      result.push(array.slice(i, i + columns));
    }
    return result;
  };

  const rows = chunkArray(similarCars, 3);

  return (
    <Container>
      <h1>Results</h1>
      <Container>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((car, colIndex) => (
              <Col key={colIndex}>
                <CarCard img="Acura_MDX.avif" />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default Results;
