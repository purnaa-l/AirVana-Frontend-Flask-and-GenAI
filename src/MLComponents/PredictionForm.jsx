import React, { useState, useEffect } from "react";
import "./PredictionForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Info cards data
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
    link: "",
  },
  {
    title: "Weather Parameters",
    content: (
      <div style={{ paddingLeft: "1rem" }}>
        <ul style={{ listStyleType: "disc", paddingLeft: "1.2rem", margin: 0 }}>
          <li><strong>Temperature:</strong> -50°C to 50°C</li>
          <li><strong>Humidity:</strong> 0% to 100%</li>
          <li><strong>Windspeed:</strong> 0 to 300 km/h</li>
          <li><strong>Pressure:</strong> 950 to 1050 hPa</li>
          <li><strong>Cloud Cover:</strong> 0% to 100%</li>
          <li><strong>UV Index:</strong> 0 to 11+</li>
        </ul>
      </div>
    ),
  },
];

const PredictionForm = () => {
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["ML-based PM 2.5 Prediction"];
  const [openIndex, setOpenIndex] = useState(null); 
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

    const thresholds = {
      temperature_celsius: 50,
      wind_kph: 150,
      pressure_mb: 1050,
      humidity: 100,
      cloud: 100,
      uv_index: 11,
    };

    const exceededParams = Object.keys(thresholds).filter(
      (key) => data[key] > thresholds[key]
    );

    if (exceededParams.length > 0) {
      toast.warning(
        `High values detected in: ${exceededParams.join(", ")}. Please refer to the parameter guideline card.`
      );
    }

    if (Object.values(data).some((value) => value < 0)) {
      toast.error(`Please enter valid positive values.`);
      return;
    }
    if (Object.values(data).some((value) => isNaN(value))) {
      toast.error(`Please enter valid numeric values.`);
      return;
    }
    if (Object.values(data).some((value) => value === "")) {
      toast.error(`Please fill in all fields.`);
      return;
    }

    toast.info("Processing your request...");
    toast.success("Request processed successfully! Check the result down.");

    console.log("Sending data:", data);
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage(`The Predicted PM 2.5 is: ${result.prediction}`);
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
            {infoCards.map((card, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className={`dropdown-card ${isOpen ? "open" : ""}`}>
                  <div className="dropdown-header" onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <h3>{card.title}</h3>
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && (
                    <div className="dropdown-body">
                      <p>
                        {card.link ? (
                          <>
                            {card.content.split(" ").map((word, i) =>
                              i === 2 ? (
                                <a
                                  key={i}
                                  href={card.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    color: "#007aff",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                >
                                  {" " + word}
                                </a>
                              ) : (
                                " " + word
                              )
                            )}
                          </>
                        ) : (
                          card.content
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>

      {/* Toast Container for warnings */}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
    </div>
  );
};

export default PredictionForm;
