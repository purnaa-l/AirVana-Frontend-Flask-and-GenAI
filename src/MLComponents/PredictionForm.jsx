import React, { useState, useEffect } from "react";
import "./PredictionForm.css";

// Info cards data
const infoCards = [
  {
    title: "Why PM2.5 Matters",
    content:
      "PM2.5 is a major pollutant impacting AQI. It's made up of tiny particles that penetrate deep into the lungs, affecting respiratory health.",
    link: "https://www.epa.gov/pm-pollution",
  },
  {
    title: "Relation with AQI",
    content:
      "Higher PM2.5 levels result in a higher AQI. This prediction helps identify potential health risks and pollution sources.",
    link: "https://www.airnow.gov/aqi/aqi-basics/",
  },
  {
    title: "Model Info",
    content:
      "We're using Random Forest Regression with a 65% accuracy rate to make predictions based on real-time features.",
    link: "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html",
  },
  {
    title: "Disclaimer",
    content:
      "Temperature may not significantly influence AQI. Other features like wind, humidity, and UV index play a bigger role.",
    link: "",
  },
];

const PredictionForm = () => {
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["AI/ML-based PM2.5 Prediction"];

  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (!isDeleting) {
        setTypingText((prev) => currentText.substring(0, prev.length + 1));
        if (typingText === currentText) setTimeout(() => setIsDeleting(true), 1000);
      } else {
        setTypingText((prev) => currentText.substring(0, prev.length - 1));
        if (typingText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, 150);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, textIndex]);

  // Handle form submission and call the prediction API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      temperature_celsius: parseFloat(formData.get("temperature_celsius")),
      wind_kph: parseFloat(formData.get("wind_kph")),
      pressure_mb: parseFloat(formData.get("pressure_mb")),
      humidity: parseFloat(formData.get("humidity")),
      cloud: parseFloat(formData.get("cloud")),
      uv_index: parseFloat(formData.get("uv_index")),
    };

    console.log("Sending data:", data);  // Log the data being sent
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // alert(`Predicted PM2.5: ${result.prediction}`);
        setErrorMessage(`The Predicted PM 2.5 is: ${result.prediction}`); // Clear any previous error message
    } else {
        setErrorMessage(result.error || "Prediction failed.");
      }
    } catch (error) {
      console.error("Error calling prediction API:", error);
      setErrorMessage("Server error.");
    }
  };

  return (
    <div className="prediction-form-page">
      <div className="sidebar">
        <div className="sidebar-content">
          <h3>Explore</h3>
          <ul>
            <li><a href="#models">Accurate Predictive Models</a></li>
            <li><a href="#weather">Weather vs AQI</a></li>
            <li><a href="#temperature">Temperature vs AQI</a></li>
            <li><a href="#more">More Insights</a></li>
          </ul>
        </div>
      </div>

      <div style={{ marginLeft: "60px" }}>
        <h1 className="typing-effect">{typingText}</h1>
        <div className="form-container">
          <div className="info-section">
            {infoCards.map((card, index) => (
              <div className="info-card" key={index}>
                <h3 className="title">{card.title}</h3>
                <p className="content">{card.content}</p>
                {card.link && (
                  <a href={card.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                )}
              </div>
            ))}
          </div>

          <form className="predict-form" onSubmit={handleSubmit}>
            <label>
              Temperature (°C): <input type="number" name="temperature_celsius" required />
            </label>
            <label>
              Wind Speed (kph): <input type="number" name="wind_kph" required />
            </label>
            <label>
              Pressure (mb): <input type="number" name="pressure_mb" required />
            </label>
            <label>
              Humidity (%): <input type="number" name="humidity" required />
            </label>
            <label>
              Cloud (%): <input type="number" name="cloud" required />
            </label>
            <label>
              UV Index: <input type="number" name="uv_index" required />
            </label>
            <button type="submit">Predict</button>
          </form>

          {/* Display error message below the form */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
