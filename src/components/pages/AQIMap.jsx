import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './AQIMap.css';

function LocationMarker({ setMapCenter }) {
  useMapEvents({
    click(e) {
      setMapCenter([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const AQIMap = () => {
  const [mapCenter, setMapCenter] = useState([22.9734, 78.6569]); // Center of India
  const [selectedLayer, setSelectedLayer] = useState("usepa-aqi");
  const [stations, setStations] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const token = import.meta.env.VITE_API_TOKEN;

  const handleLayerChange = (e) => {
    setSelectedLayer(e.target.value);
  };

  // Fetch AQI station data
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get(
          `https://api.waqi.info/map/bounds/?latlng=6,66,37,98&token=${token}`
        );
        setStations(res.data.data);
        setLastUpdated(new Date().toLocaleString());
      } catch (err) {
        console.error('Error fetching AQI stations:', err);
      }
    };

    fetchStations();

    // Refresh data every 10 minutes
    const interval = setInterval(fetchStations, 600000); // 600000 ms = 10 minutes
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="full-map-container">
        <h1 className="map-title">AeroMaps: Mapping the Air Around You!</h1>
      
      <div className="map-controls">
        <select id="layer" value={selectedLayer} onChange={handleLayerChange}>
          <option value="usepa-aqi">Composite AQI</option>
          <option value="usepa-pm25">PM 2.5</option>
          <option value="usepa-o3">Ozone (O3)</option>
          <option value="usepa-no2">Nitrogen Dioxide (NO₂)</option>
          <option value="usepa-so2">Sulfur Dioxide (SO₂)</option>
          <option value="usepa-co">Carbon Monoxide (CO)</option>
          <option value="asean-pm10">ASEAN PM10 (Raw)</option>
        </select>
      </div>

      {/* Map & Legend */}
      <div className="map-with-legend">
        <MapContainer
          center={mapCenter}
          zoom={5}
          minZoom={4}
          maxZoom={10}
          scrollWheelZoom={true}
          className="fullscreen-map"
          bounds={[
            [6, 66],    // South-West (Kanyakumari, Lakshadweep)
            [37, 98]    // North-East (J&K, Arunachal)
          ]}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          <TileLayer
            url={`https://tiles.aqicn.org/tiles/${selectedLayer}/{z}/{x}/{y}.png`}
            attribution="Air Quality © AQICN.org"
            opacity={0.6}
          />

          <LocationMarker setMapCenter={setMapCenter} />
        </MapContainer>

        {/* AQI Legend */}
        <div className="legend-box">
          <h3>AQI Risk Levels</h3>
          <div className="legend-row"><span style={{ background: '#00e400' }}></span>Good (0–50)</div>
          <div className="legend-row"><span style={{ background: '#ffff00' }}></span>Moderate (51–100)</div>
          <div className="legend-row"><span style={{ background: '#ff7e00' }}></span>Unhealthy for Sensitive (101–150)</div>
          <div className="legend-row"><span style={{ background: '#ff0000' }}></span>Unhealthy (151–200)</div>
          <div className="legend-row"><span style={{ background: '#8f3f97' }}></span>Very Unhealthy (201–300)</div>
          <div className="legend-row"><span style={{ background: '#7e0023' }}></span>Hazardous (301+)</div>
        </div>

        {lastUpdated && <div className="last-updated">Last Updated: {lastUpdated}</div>}
      </div>
    </div>
  );
};

export default AQIMap;
