import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchAQI.css';
import Spinner from '../layouts/Spinner';
import { useNavigate } from 'react-router-dom';
import { postAQIs } from '../../services/AqiService';

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

    // const fetchAQI = async () => {
    //     setLoading(true);
    //     const token = import.meta.env.VITE_API_TOKEN;
    //     const url = `https://api.waqi.info/feed/${city}/?token=${token}`;

    //     try {
    //         const response = await axios.get(url);
    //         if (response.data.status === 'ok') {
    //             console.log(response);
    //             const { aqi, city, time, iaqi, attributions } = response.data.data;
    //             setAqi(aqi);
    //             setStationName(city.name);
    //             setGeo(city.geo);
    //             setMeasurementTime(time.s);
    //             setTimezone(time.tz);
    //             setIaqi(iaqi);
    //             setError('');
    //             setSource(attributions[0]?.name || 'Unknown');
    //             postAQIs(response.data.data).then((response)=>{
    //                 console.log(response.data);
    //             })
    //         } else {
    //             setError('Failed to fetch AQI data for this city.');
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         setError('An error occurred. Please check your connection or city name.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // const fetchAQI = async () => {
    //     setLoading(true);
    //     const token = import.meta.env.VITE_API_TOKEN;
    //     const url = `https://api.waqi.info/feed/${city}/?token=${token}`;
    
    //     try {
    //         const response = await axios.get(url);
    //         if (response.data.status === 'ok') {
    //             const { aqi, city, time, iaqi, attributions } = response.data.data;
    
    //             // Determine AQI verdict
    //             const getVerdict = (aqi) => {
    //                 if (aqi <= 50) return 'Good';
    //                 if (aqi <= 100) return 'Satisfactory';
    //                 if (aqi <= 200) return 'Moderate';
    //                 if (aqi <= 300) return 'Poor';
    //                 if (aqi <= 400) return 'Very Poor';
    //                 return 'Hazardous';
    //             };
    
    //             // Get current date and time
    //             const currentDate = new Date();
    //             const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    //             const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:mm:ss
    
    //             // Construct payload
    //             const aqiPayload = {
    //                 city: city.name || '',
    //                 station: city.name || 'Unknown',
    //                 coordinates: city.geo ? city.geo.join(', ') : null,
    //                 measuringTime: time.s || '',
    //                 carbonMonoxide: iaqi.co?.v?.toString() || null,
    //                 humidity: iaqi.h?.v?.toString() || null,
    //                 nitrogenDioxide: iaqi.no2?.v?.toString() || null,
    //                 ozone: iaqi.o3?.v?.toString() || null,
    //                 pressure: iaqi.p?.v?.toString() || null,
    //                 pm10: iaqi.pm10?.v?.toString() || null,
    //                 pm2_5: iaqi.pm25?.v?.toString() || null,
    //                 sulphurDioxide: iaqi.so2?.v?.toString() || null,
    //                 temperature: iaqi.t?.v?.toString() || null,
    //                 windSpeed: iaqi.w?.v?.toString() || null,
    //                 AQI: aqi,
    //                 verdict: getVerdict(aqi), // Dynamically assign verdict
    //                 date: formattedDate,     // Current date
    //                 time: formattedTime,     // Current time
    //             };
    
    //             console.log('Posting payload:', aqiPayload);
    
    //             // Send payload to backend
    //             const postResponse = await postAQIs(aqiPayload);
    //             console.log('Data posted successfully:', postResponse.data);
    
    //             // Update state
    //             setAqi(aqi);
    //             setStationName(city.name);
    //             setGeo(city.geo);
    //             setMeasurementTime(time.s);
    //             setTimezone(time.tz);
    //             setIaqi(iaqi);
    //             setError('');
    //             setSource(attributions[0]?.name || 'Unknown');
    //         } else {
    //             throw new Error('City data not available.');
    //         }
    //     } catch (err) {
    //         console.error(err);
    
    //         // Handle cities that cannot be accessed by the API
    //         const currentDate = new Date();
    //         const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    //         const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:mm:ss
    
    //         const fallbackPayload = {
    //             city: city,               // Use the user-provided city
    //             station: null,            // Null for unaccessible cities
    //             coordinates: null,
    //             measuringTime: null,
    //             carbonMonoxide: null,
    //             humidity: null,
    //             nitrogenDioxide: null,
    //             ozone: null,
    //             pressure: null,
    //             pm10: null,
    //             pm2_5: null,
    //             sulphurDioxide: null,
    //             temperature: null,
    //             windSpeed: null,
    //             AQI: null,
    //             verdict: null,
    //             date: formattedDate,      // Current date
    //             time: formattedTime,      // Current time
    //         };
    
    //         console.log('Posting fallback payload:', fallbackPayload);
    
    //         // Send fallback payload to backend
    //         try {
    //             const postResponse = await postAQIs(fallbackPayload);
    //             console.log('Fallback data posted successfully:', postResponse.data);
    //         } catch (postErr) {
    //             console.error('Error posting fallback payload:', postErr);
    //         }
    
    //         // Update error state
    //         setError('City data not available.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchAQI = async () => {
        setLoading(true);
        const token = import.meta.env.VITE_API_TOKEN;
        const url = `https://api.waqi.info/feed/${city}/?token=${token}`;
    
        try {
            const response = await axios.get(url);
            if (response.data.status === 'ok') {
                const { aqi, city: apiCity, time, iaqi, attributions } = response.data.data;
    
                // Determine AQI verdict
                const getVerdict = (aqi) => {
                    if (aqi <= 50) return 'Good';
                    if (aqi <= 100) return 'Satisfactory';
                    if (aqi <= 200) return 'Moderate';
                    if (aqi <= 300) return 'Poor';
                    if (aqi <= 400) return 'Very Poor';
                    return 'Hazardous';
                };
    
                // Get current date and time
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
                const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:mm:ss
    
                // Ensure the city in the payload is a string (user-entered city name)
                const cityName = typeof city === 'string' ? city : city.name || 'Unknown';
                const stationName = response.data.data.city.name || 'N/A';
    
                // Construct payload
                const aqiPayload = {
                    city: cityName, // Ensure it's a string
                    station: stationName, // Use station name if available, else 'N/A'
                    coordinates: apiCity.geo ? apiCity.geo.join(', ') : 'N/A',
                    measuringTime: time.s || 'N/A',
                    carbonMonoxide: iaqi.co?.v ? Math.abs(Math.round(iaqi.co.v * 100) / 100).toString() : 'N/A',
                    humidity: iaqi.h?.v ? Math.abs(Math.round(iaqi.h.v * 100) / 100).toString() : 'N/A',
                    nitrogenDioxide: iaqi.no2?.v ? Math.abs(Math.round(iaqi.no2.v * 100) / 100).toString() : 'N/A',
                    ozone: iaqi.o3?.v ? Math.abs(Math.round(iaqi.o3.v * 100) / 100).toString() : 'N/A',
                    pressure: iaqi.p?.v ? Math.abs(Math.round(iaqi.p.v * 100) / 100).toString() : 'N/A',
                    pm10: iaqi.pm10?.v ? Math.abs(Math.round(iaqi.pm10.v * 100) / 100).toString() : 'N/A',
                    pm2_5: iaqi.pm25?.v ? Math.abs(Math.round(iaqi.pm25.v * 100) / 100).toString() : 'N/A',
                    sulphurDioxide: iaqi.so2?.v ? Math.abs(Math.round(iaqi.so2.v * 100) / 100).toString() : 'N/A',
                    temperature: iaqi.t?.v ? Math.abs(Math.round(iaqi.t.v * 100) / 100).toString() : 'N/A',
                    windSpeed: iaqi.w?.v ? Math.abs(Math.round(iaqi.w.v * 100) / 100).toString() : 'N/A',
                    AQI: aqi,
                    verdict: getVerdict(aqi),
                    date: formattedDate,
                    time: formattedTime,
                };
    
                console.log('Posting payload:', aqiPayload);
    
                // Send payload to backend
                try {
                    const postResponse = await postAQIs(aqiPayload);
                    console.log('Data posted successfully:', postResponse.data);
    
                    // Update state
                    setAqi(aqi);
                    setStationName(stationName);
                    setGeo(apiCity.geo);
                    setMeasurementTime(time.s);
                    setTimezone(time.tz);
                    setIaqi(iaqi);
                    setError('');
                    setSource(attributions[0]?.name || 'Unknown');
                } catch (postErr) {
                    console.error('Error posting payload:', postErr.response ? postErr.response.data : postErr.message);
    
                    // If posting fails, attempt to post fallback payload
                    const fallbackPayload = {
                        city: cityName, // Always use the user-entered city here
                        station: 'N/A', // Default to 'N/A' if no station data is available
                        coordinates: 'N/A',
                        measuringTime: 'N/A',
                        carbonMonoxide: 'N/A',
                        humidity: 'N/A',
                        nitrogenDioxide: 'N/A',
                        ozone: 'N/A',
                        pressure: 'N/A',
                        pm10: 'N/A',
                        pm2_5: 'N/A',
                        sulphurDioxide: 'N/A',
                        temperature: 'N/A',
                        windSpeed: 'N/A',
                        AQI: 0, // Set AQI to 0
                        verdict: 'N/A', // Set verdict to N/A
                        date: formattedDate,
                        time: formattedTime,
                    };
    
                    console.log('Posting fallback payload:', fallbackPayload);
    
                    try {
                        const fallbackPostResponse = await postAQIs(fallbackPayload);
                        console.log('Fallback data posted successfully:', fallbackPostResponse.data);
                    } catch (fallbackPostErr) {
                        console.error('Error posting fallback payload:', fallbackPostErr.response ? fallbackPostErr.response.data : fallbackPostErr.message);
                    }
    
                    setError('City data not available.');
                }
            } else {
                throw new Error('City data not available.');
            }
        } catch (err) {
            console.error('Error fetching AQI:', err.message);
    
            // Attempt to post a fallback payload if initial API call fails
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
            const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:mm:ss
    
            const fallbackPayload = {
                city: city || 'Unknown', // Always use the user-entered city here
                station: 'N/A', // Default to 'N/A' if no station data is available
                coordinates: 'N/A',
                measuringTime: 'N/A',
                carbonMonoxide: 'N/A',
                humidity: 'N/A',
                nitrogenDioxide: 'N/A',
                ozone: 'N/A',
                pressure: 'N/A',
                pm10: 'N/A',
                pm2_5: 'N/A',
                sulphurDioxide: 'N/A',
                temperature: 'N/A',
                windSpeed: 'N/A',
                AQI: 0, // AQI set to 0
                verdict: 'N/A',
                date: formattedDate,
                time: formattedTime,
            };
    
            console.log('Posting fallback payload:', fallbackPayload);
    
            try {
                const postResponse = await postAQIs(fallbackPayload);
                console.log('Fallback data posted successfully:', postResponse.data);
            } catch (fallbackPostErr) {
                console.error('Error posting fallback payload:', fallbackPostErr.response ? fallbackPostErr.response.data : fallbackPostErr.message);
            }
    
            setError('City data not available.');
        } finally {
            setLoading(false);
        }
    };
    
    
    
    

    const navigator=useNavigate();
    function viewAllAQIs(){
        navigator('/viewAQIs');
    }

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
