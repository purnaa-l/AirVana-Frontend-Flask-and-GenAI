import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchAQI.css';
import Spinner from '../layouts/Spinner';

const AQI_LEVELS = [
    { range: [0, 50], label: 'Good', color: 'green', emoji: '😊' },
    { range: [51, 100], label: 'Satisfactory', color: 'yellow', emoji: '🙂' },
    { range: [101, 200], label: 'Moderate', color: 'orange', emoji: '😐' },
    { range: [201, 300], label: 'Poor', color: 'red', emoji: '😷' },
    { range: [301, 400], label: 'Very Poor', color: 'purple', emoji: '🤢' },
    { range: [401, 500], label: 'Hazardous', color: 'maroon', emoji: '☠️' },
];

const FetchAQI = () => {
    const [aqi, setAqi] = useState(null);
    const [city, setCity] = useState('');
    const [stationName, setStationName] = useState('');
    const [geo, setGeo] = useState([]);
    const [measurementTime, setMeasurementTime] = useState('');
    const [timezone, setTimezone] = useState('');
    const [iaqi, setIaqi] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState('');

    const fetchAQI = async () => {
        setLoading(true);
        const token = import.meta.env.VITE_API_TOKEN;
        const url = `https://api.waqi.info/feed/${city}/?token=${token}`;

        try {
            const response = await axios.get(url);
            if (response.data.status === 'ok') {
                const { aqi, city, time, iaqi, attributions } = response.data.data;
                setAqi(aqi);
                setStationName(city.name);
                setGeo(city.geo);
                setMeasurementTime(time.s);
                setTimezone(time.tz);
                setIaqi(iaqi);
                setError('');
                setSource(attributions[0]?.name || 'Unknown');
            } else {
                setError('Failed to fetch AQI data for this city.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please check your connection or city name.');
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const getAQILevel = () => {
        if (aqi === null) return { label: 'Unknown', color: 'grey', emoji: '❓' };
        return AQI_LEVELS.find((level) => aqi >= level.range[0] && aqi <= level.range[1]) || AQI_LEVELS[AQI_LEVELS.length - 1];
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
                    {iaqi[metric.key] ? Math.abs((Math.round(iaqi[metric.key].v * 100) / 100).toFixed(2)) : 'N/A'}
                </div>
            </div>
        ));
    };

    const renderAQICard = () => {
        const { label, color, emoji } = getAQILevel();
        return (
            <div className="horizontal-card" style={{ borderColor: color }}>
                <div className="card-content">
                    <h2 style={{ color }}>{label} {emoji}</h2>
                    <h3>AQI: {aqi}</h3>
                    <p>
                        <strong>Station:</strong> {stationName || 'N/A'}
                        <br />
                        <strong>Coordinates:</strong> {geo.join(', ') || 'N/A'}
                        <br />
                        <strong>Measurement Time:</strong> {measurementTime || 'N/A'} ({timezone || 'N/A'})
                    </p>
                    <div className="horizontal-bar-container">
                        <div className="horizontal-bar">
                            <div
                                className="aqi-marker"
                                style={{ left: `${(aqi / 500) * 100}%`, backgroundColor: color }}
                            ></div>
                        </div>
                    </div>
                    <div className="live-button">LIVE</div>
                </div>
            </div>
        );
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
                    <>
                        {renderAQICard()}
                        <div className="metrics-section">
                            <h2>Air Quality Metrics</h2>
                            <div className="metrics-list">{renderMetrics()}</div>
                        </div>
                    </>
                ) : (
                    <h1 className="loading">Awaiting the City's Name!</h1>
                )}
            </div>
        </div>
    );
};

export default FetchAQI;
