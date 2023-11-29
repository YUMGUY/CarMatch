import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CarCard from "../components/CarCard";

const Results = () => {
  const location = useLocation();
  const similarCars = location.state?.data;
  const model = location.state?.model;
  const brand = location.state?.brand;
  const [priceData, setPriceData] = useState([]);

  const chunkArray = (array, columns) => {
    const result = [];
    for (let i = 0; i < array.length; i += columns) {
      result.push(array.slice(i, i + columns));
    }
    return result;
  };

  const rows = chunkArray(priceData, 3);

  const getPricesForSimilarCars = async (similarCars) => {
    try {
      const carsWithPrices = await Promise.all(
        similarCars.map(async ([brand, model]) => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/price/${brand}/${model}`
            );

            if (!response.ok)
              throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log(result);

            return {
              make: brand,
              model,
              price: result,
              // Add other properties from the API response if needed
            };
          } catch (error) {
            console.error("Error fetching data:", error);
            return null;
          }
        })
      );

      return carsWithPrices.filter(Boolean);
    } catch (error) {
      console.error("Error fetching prices:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const carsWithPrices = await getPricesForSimilarCars(similarCars);
        setPriceData(carsWithPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, [similarCars]);

  return (
    <Container>
      <h1>
        Results for {brand} {model}
      </h1>
      <Container>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((car, colIndex) => (
              <Col key={colIndex}>
                <CarCard
                  img={`${car.make.replace(/\s/g, "")}_${car.model.replace(
                    /\s/g,
                    ""
                  )}.avif`}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default Results;
