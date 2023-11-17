import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log(response);
  
      const result = await response.json();
      setData(result.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">

      <h1>CarMatch</h1>
      <h1>{data}</h1>
    </div>
  );
}

export default App;
