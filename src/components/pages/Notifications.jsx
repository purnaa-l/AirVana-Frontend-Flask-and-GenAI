import React, { useState } from "react";
import "./Notifications.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { postNotification } from "../../services/AqiService";

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "monthly", label: "Monthly" },
  { value: "frequent", label: "Frequently" },
];

const Notifications = () => {
  const [city, setCity] = useState("");
  const [aqiThreshold, setAqiThreshold] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleCityCheck = async (cityName) => {
    setLoading(true);
    const token = import.meta.env.VITE_API_TOKEN;
    const url = `https://api.waqi.info/feed/${cityName}/?token=${token}`;

    try {
      const response = await axios.get(url);
      setLoading(false);
      return response.data.status === "ok";
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !aqiThreshold || !email) {
      toast.error("🚨 Please fill all fields.");
      return;
    }

    const cityExists = await handleCityCheck(city);
    if (!cityExists) {
      toast.error("❌ City not supported yet. We're working on expanding coverage!");
      return;
    }

    const formData = {
      city,
      aqiThreshold,
      frequency,
      email,
    };

    try {
      const formResponse = await postNotification(formData);
      console.log("✅ Success:", formResponse);
      toast.success(`🎉 Subscribed! You'll receive ${frequency} alerts for ${city} if AQI > ${aqiThreshold}.`);
      setSubscribed(true);
    } catch (error) {
      console.error("❌ Error submitting data:", error.response?.data || error.message);
      toast.error("🚨 Something went wrong while subscribing. Please try again.");
    }
  };

  return (
    <div className="notifications-wrapper">
      <div className="notifications-header-card">
        <h2>🌱 We’re Committed to Clean Air</h2>
        <p>Empowering you with personalised air quality alerts to breathe safer every day. </p>
      </div>

      <div className="notifications-container">
        <ToastContainer />
        <h2 className="notifications-title">📢 Get real-time personalised AQI Notifications</h2>
        <form className="notifications-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="notifications-input"
            required
          />
          <input
            type="number"
            placeholder="Desired AQI Threshold (e.g. 100)"
            value={aqiThreshold}
            onChange={(e) => setAqiThreshold(e.target.value)}
            className="notifications-input"
            min="0"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="notifications-input"
            required
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="notifications-select"
          >
            {frequencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button type="submit" className="notifications-btn" disabled={loading}>
            {loading ? "🔍 Checking..." : "✅ Subscribe"}
          </button>
        </form>

        {subscribed && (
          <div className="notifications-success">
            <span>🎉 You are subscribed successfully!</span>
          </div>
        )}
      </div>

      <div className="notifications-cards">
        <div className="info-card">
          <h3>🌐 Real-Time Monitoring</h3>
          <p>We fetch data from trusted, global AQI networks live.</p>
        </div>
        <div className="info-card">
          <h3>🔔 Personalized Alerts</h3>
          <p>Set your city & threshold — stay in control of your air safety.</p>
        </div>
        <div className="info-card">
          <h3>📊 Data-Driven Protection</h3>
          <p>Make informed choices to reduce exposure and protect your family.</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
