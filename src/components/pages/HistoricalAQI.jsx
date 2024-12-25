import React, { useState, useEffect } from "react";
import { listAQIs } from "../../services/AqiService";
import "./HistoricalAQI.css";

function HistoricalAQI() {
  const [aqiData, setAqiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    date: "",
    aqi: "",
    verdict: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch AQI Data
  useEffect(() => {
    listAQIs()
      .then((response) => {
        // Enrich data with calculated date
        const enrichedData = response.data.map((item) => ({
          ...item,
          date: calculateDate(item.slNo),
        }));
        setAqiData(enrichedData);
        setFilteredData(enrichedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Calculate the date based on slNo
  const calculateDate = (slNo) => {
    const day = (slNo % 26) + 1; // Mod 26 ensures day is between 1 and 26
    return `${day}/12/2024`; // Return a string for proper date format
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Update the filter state with new filter values
    const updatedFilters = { ...filters, [name]: value.trim() };
    setFilters(updatedFilters);

    // Filter the data
    const newFilteredData = aqiData.filter((item) => {
      const dateMatch = !updatedFilters.date || item.date === updatedFilters.date; // Exact date match
      const cityMatch = !updatedFilters.city || item.city.toLowerCase().includes(updatedFilters.city.toLowerCase());
      const aqiMatch = !updatedFilters.aqi || item.aqi.toString().includes(updatedFilters.aqi); // Matching based on AQI string
      const verdictMatch = !updatedFilters.verdict || item.verdict.toLowerCase().includes(updatedFilters.verdict.toLowerCase());

      return dateMatch && cityMatch && aqiMatch && verdictMatch;
    });

    // Set filtered data
    setFilteredData(newFilteredData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Historical Air Quality Data</h1>

      {/* Filters */}
      <div className="filters">
        <label>
          City:
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Date (e.g., 2/12/2024):
          <input
            type="text"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          AQI:
          <input
            type="text"
            name="aqi"
            value={filters.aqi}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Verdict:
          <input
            type="text"
            name="verdict"
            value={filters.verdict}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      {/* Table */}
      <table className="aqi-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>City</th>
            <th>AQI</th>
            <th>CO</th>
            <th>NO2</th>
            <th>Ozone</th>
            <th>SO2</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((aqi, index) => (
              <tr key={index}>
                <td>{aqi.date}</td>
                <td>{aqi.city}</td>
                <td>{aqi.aqi}</td>
                <td>{aqi.co}</td>
                <td>{aqi.no2}</td>
                <td>{aqi.ozone}</td>
                <td>{aqi.so2}</td>
                <td>{aqi.verdict}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricalAQI;

