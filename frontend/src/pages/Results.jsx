import React from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const similarCars = location.state?.data;
  return (
    <>
      <h1>{similarCars}</h1>
    </>
  );
};

export default Results;
