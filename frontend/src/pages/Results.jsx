import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CarCard from "../components/CarCard";

const Results = () => {
  const location = useLocation();
  const similarCars = location.state?.data;
  const [priceData, setPriceData] = useState([]);

  const chunkArray = (array, columns) => {
    const result = [];
    for (let i = 0; i < array.length; i += columns) {
      result.push(array.slice(i, i + columns));
    }
    return result;
  };

  const rows = chunkArray(similarCars, 3);

  const getPricesForSimilarCars = async (similarCars) => {
    try {
      const prices = await Promise.all(
        similarCars.map(async ([brand, model]) => {
          try {
            const response = await fetch(`http://localhost:5000/api/price/${brand}/${model}`);
  
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
            const result = await response.json();
            console.log(result);
            return result;
          } catch (error) {
            console.error("Error fetching data:", error);
            return null;
          }
        })
      );
  
      return prices.filter(Boolean);
    } catch (error) {
      console.error("Error fetching prices:", error);
      return [];
    }
  };
  
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const prices = await getPricesForSimilarCars(similarCars);
        setPriceData(prices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
  
    fetchPrices();
  }, [similarCars]);
  

  return (
    <Container>
      <h1>Results</h1>
      <Container>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((car, colIndex) => (
              <Col key={colIndex}>
                <CarCard 
                  img={`${car[0]}_${car[1]}.avif`}
                  make={car[0]} 
                  model={car[1]} 
                  price={priceData[colIndex + rowIndex * 3]} 
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
