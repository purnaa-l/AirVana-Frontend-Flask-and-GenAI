import React, { useState, useEffect } from 'react';

// Sample of AQI Data (Assuming this is the structure)
const sampleData = [
  { date: '2023-01-01', aqi: 150, city: 'City A' },
  { date: '2023-01-02', aqi: 80, city: 'City B' },
  { date: '2023-01-03', aqi: 200, city: 'City A' },
  // Add more data
];

const AQIData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // To track sort order
  const [filterCity, setFilterCity] = useState(''); // Filter by city

  // Load data (simulating fetching data)
  useEffect(() => {
    // You can load data from an API or use static data like sampleData
    setData(sampleData);
    setFilteredData(sampleData); // Initialize filtered data with all data
  }, []);

  // Function to filter the data by city
  const handleCityFilter = (event) => {
    setFilterCity(event.target.value);
  };

  // Function to sort the data
  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.aqi - b.aqi;
      } else {
        return b.aqi - a.aqi;
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Apply city filter
  useEffect(() => {
    const filtered = data.filter(item => item.city.toLowerCase().includes(filterCity.toLowerCase()));
    setFilteredData(filtered);
  }, [filterCity, data]);

  return (
    <div>
      <h1>AQI Data</h1>

      {/* Filter by City */}
      <input 
        type="text" 
        placeholder="Filter by city" 
        value={filterCity} 
        onChange={handleCityFilter}
      />

      {/* Sort Data */}
      <button onClick={handleSort}>
        Sort by AQI ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {/* Display AQI Data */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>City</th>
            <th>AQI</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.city}</td>
              <td>{item.aqi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AQIData;
