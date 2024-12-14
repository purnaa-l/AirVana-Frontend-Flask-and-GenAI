import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchAQI.css';
import Spinner from '../layouts/Spinner';

const FetchAQI = () => {
    const [aqi, setAqi] = useState(null);
    const [city, setCity] = useState('');
    const [stationName, setStationName] = useState('');
    const [geo, setGeo] = useState([]);
    const [measurementTime, setMeasurementTime] = useState('');
    const [timezone, setTimezone] = useState('');
    const [iaqi, setIaqi] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state to show spinner
    const [source, setSource] = useState('');

    const fetchAQI = async () => {
        setLoading(true);  // Set loading to true when fetching data
        const token = 'ef07f1b896e6842a1b1233c8ee916f84155ed377'; // Replace with your valid token
        const url = `https://api.waqi.info/feed/${city}/?token=${token}`;
        
        try {
            const response = await axios.get(url);
            console.log(response);
            
            if (response.data.status === 'ok') {
                const { aqi, city, time, iaqi, attributions } = response.data.data; 

                setAqi(aqi);
                setStationName(city.name);
                setGeo(city.geo);
                setMeasurementTime(time.s);
                setTimezone(time.tz);
                setIaqi(iaqi);
                setError('');
                setSource(attributions[0].name);  // Assuming attributions is an array
                console.log(attributions[0].name);
            } else {
                setError('Failed to fetch AQI data for this city.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please check your connection or city name.');
        } finally {
            setLoading(false);  // Set loading to false once data is fetched or error occurs
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const renderMetrics = () => {
        const metrics = [
            { key: 'co', label: 'CO (Carbon Monoxide)' },
            { key: 'h', label: 'Humidity (%)' },
            { key: 'no2', label: 'NO2 (Nitrogen Dioxide)' },
            { key: 'o3', label: 'O3 (Ozone)' },
            { key: 'p', label: 'Pressure (hPa)' },
            { key: 'pm10', label: 'PM10' },
            { key: 'pm25', label: 'PM2.5' },
            { key: 'so2', label: 'SO2 (Sulfur Dioxide)' },
            { key: 't', label: 'Temperature (°C)' },
            { key: 'w', label: 'Wind Speed (m/s)' },
        ];

        return metrics.map((metric) => (
            <div className="metric-card" key={metric.key}>
                <strong>{metric.label}</strong>
                <div className="value">
                {iaqi[metric.key] ? (Math.round(iaqi[metric.key].v * 100) / 100).toFixed(2) : 'N/A'}
                </div>
            </div>
        ));
    };

    return (
        <div className="app">
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter the City Name"
                    value={city}
                    onChange={handleCityChange}
                    className="city-input"
                />
                <button className="button" onClick={fetchAQI}>
                    <span>Fetch AQI</span>
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <h1 className="error">{error}</h1>
                ) : aqi !== null ? (
                    <div className="card-content">
                        <h1 className="heading">Air Quality Index (AQI): {aqi}</h1>
                        <p>
                            <strong>Station:</strong> {stationName}
                            <br />
                            <strong>Fetched From:</strong> {source}
                            <br />
                            <strong>Coordinates:</strong> {geo.join(', ')}
                            <br />
                            <strong>Measurement Time:</strong> {measurementTime} ({timezone})
                        </p>

                        <div className="metrics-section">
                            <h2>Air Quality Metrics</h2>
                            <div className="metrics-list">{renderMetrics()}</div>
                        </div>


                    </div>
                ) : (
                    <h1 className="loading">Awaiting the City Name!</h1>
                )}
            </div>
        </div>
    );
};

export default FetchAQI;
