import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./HealthImpactPrediction.css";
const infoCards = [
  {
    title: "Why PM 2.5 Matters?",
    content:
      "PM 2.5 is a major pollutant impacting AQI. It's made up of tiny particles that penetrate deep into the lungs, affecting respiratory health.",
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
  },
  {
    title: "Weather Parameters",
    content: (
      <ul>
        <li><strong>Temperature:</strong> -50°C to 50°C</li>
        <li><strong>Humidity:</strong> 0% to 100%</li>
        <li><strong>Windspeed:</strong> 0 to 300 km/h</li>
        <li><strong>Pressure:</strong> 950 to 1050 hPa</li>
        <li><strong>Cloud Cover:</strong> 0% to 100%</li>
        <li><strong>UV Index:</strong> 0 to 11+</li>
      </ul>
    ),
  },
];

const HealthPredictionForm = () => {
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const texts = ["ML-based Health Risk Prediction"];

  useEffect(() => {
    const currentText = texts[textIndex];
    const timer = setTimeout(() => {
      setTypingText((prev) =>
        !isDeleting ? currentText.slice(0, prev.length + 1) : currentText.slice(0, prev.length - 1)
      );
      if (!isDeleting && typingText === currentText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typingText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, textIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      AQI: parseFloat(formData.get("AQI")),
      Temperature: parseFloat(formData.get("Temperature")),
      RespiratoryCases: parseFloat(formData.get("RespiratoryCases")),
      CardiovascularCases: parseFloat(formData.get("CardiovascularCases")),
      HospitalAdmissions: parseFloat(formData.get("HospitalAdmissions"))
    };
    console.log(data); // This will show the data being sent


    const thresholds = { Temperature: 60, AQI: 700 };
    const exceededParams = Object.keys(thresholds).filter((key) => data[key] > thresholds[key]);

    if (exceededParams.length) {
      toast.warning(`High values detected in: ${exceededParams.join(", ")}`);
      return;
    }

    if (Object.values(data).some((v) => v < 0 || isNaN(v))) {
      toast.error("Please enter valid positive numbers.");
      return;
    }

    toast.info("Processing your request...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/health-impact-class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Prediction completed!");
        setErrorMessage(`The Health Impact class is: ${result.HealthImpactClass} and the Risk Level is: ${result.RiskLevel}`);
      } else {
        setErrorMessage(result.error || "Prediction failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while processing your request.");
    }
    toast.dismiss();
    toast.success("Data inserted successfully!");
  };

  return (
    <div className="health-prediction-form-page">
      <ToastContainer />
      <h1 className="typing-effect">{typingText}</h1>

      <div className="form-container">
        <div className="info-section">
          {infoCards.map((card, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className={`dropdown-card ${isOpen ? "open" : ""}`}
                key={index}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="dropdown-header">
                  <span>{card.title}</span>
                  <span>{isOpen ? "▲" : "▼"}</span>
                </div>
                {isOpen && (
                  <div className="dropdown-body">
                    {typeof card.content === "string" ? (
                      <p>
                        {card.content}
                        {card.link && (
                          <a href={card.link} target="_blank" rel="noopener noreferrer">
                            Learn more
                          </a>
                        )}
                      </p>
                    ) : (
                      card.content
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="predict-form">
          <label>Temperature (°C)</label>
          <input type="number" name="Temperature" required />
          <label>AQI</label>
          <input type="number" name="AQI" required />
          <label>Respiratory Diseases (%)</label>
          <input type="number" name="RespiratoryCases" required />
          
          <label>Cardiovascular Diseases (%)</label>
          <input type="number" name="CardiovascularCases" required />
          <label>Hospital Admissions (%)</label>
          <input type="number" name="HospitalAdmissions" required />
          <button type="submit">Predict</button>

        </form>
      </div>

      {errorMessage && <div className="prediction-result">{errorMessage}</div>}
    </div>
  );
};

export default HealthPredictionForm;
