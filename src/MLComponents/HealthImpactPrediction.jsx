import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./HealthImpactPrediction.css";

const infoCards = [
  {
    title: "Why This Prediction Matters",
    content:
      "Timely prediction of health risks due to poor air quality helps cities prepare for public health interventions, issue alerts, and allocate medical resources effectively.",
    link: "https://www.who.int/health-topics/air-pollution#tab=tab_1",
  },
  {
    title: "Why PM 2.5 Matters?",
    content:
      "PM 2.5 refers to fine inhalable particles that can penetrate deep into the lungs. It's one of the most harmful pollutants and a major contributor to increased AQI.",
    link: "https://www.epa.gov/pm-pollution",
  },
  {
    title: "Relation with AQI",
    content:
      "Higher PM2.5 levels lead to increased AQI, indicating worse air quality and heightened health risks, especially for vulnerable populations.",
    link: "https://www.airnow.gov/aqi/aqi-basics/",
  },
  {
    title: "Model Info",
    content:
      "We're using a Random Forest Regression model with approximately 90% accuracy. It evaluates weather and health indicators to predict the potential health risk class and level.",
    link: "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html",
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
      HospitalAdmissions: parseFloat(formData.get("HospitalAdmissions")),
    };

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
        setErrorMessage(
          `The Health Impact class is: ${result.HealthImpactClass} and the Risk Level is: ${result.RiskLevel}`
        );
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
    <div className="prediction-form-page">
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
                          <>
                            {" "}
                            <a href={card.link} target="_blank" rel="noopener noreferrer">
                              Learn more
                            </a>
                          </>
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
