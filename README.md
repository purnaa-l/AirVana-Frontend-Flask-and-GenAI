# AirVana
- Check the front-end code here: https://github.com/purnaa-l/AirVana-Frontend-Flask-and-GenAI
- Check the backend code here: https://github.com/purnaa-l/AirVana-SpringBoot-Backend
- Check all the ML Models here: https://github.com/purnaa-l/AirVana-ML-Models


# 🌬️ AirVana: AI-Powered Air Quality Intelligence and Awareness Platform

## Overview

**AirVana** is an AI-driven platform designed to provide real-time air quality monitoring, health risk assessments, and interactive environmental awareness tools. Integrating data science, machine learning, geospatial mapping, and generative AI, AirVana empowers users to understand and respond to air pollution threats in a personalized and actionable way.

All work included in this repository was created by purnaa-l. Unauthorized claims of authorship are strictly prohibited.

---

## 🔧 Technology Stack

### Frontend
- **React.js** – Dynamic, responsive UI
- **Leaflet.js** – Interactive geospatial maps
- **Recharts.js** – Data visualizations (line charts, heatmaps, bar charts)
- **CSS** – Responsive design and styling

### Backend
- **Spring Boot (Java)** – REST API, user authentication, admin logic
- **Flask (Python)** – ML model hosting and inference services

### Database
- **PostgreSQL** – AQI data, user profiles, logs, health diagnostics

### AI/ML & NLP
- **Scikit-learn** – ML models (Random Forests, SVM)
- **Hugging Face Transformers** – Summarization, classification, chatbots
- **Gemini AI (Pro, 1.5 Flash)** – Multimodal generative intelligence
- **spaCy, NLTK** – Classical NLP tools

### Interface Tools
- **Streamlit** – AI demos and health tools

### External APIs
- **WAQI** – Real-time/historical AQI data
- **NASA EONET** – Natural hazard tracking (e.g., wildfires)
- **NewsAPI** – Environmental news aggregation

### Security
- **Spring Security** – Stateless sessions, role-based access, hashed passwords

### Others
- **Spring Mail** – Email alerts and query automation

---

## 🌟 Core Features

### 1. Real-Time Air Quality Monitoring
- Live AQI data for pollutants (PM2.5, PM10, CO, NO₂, SO₂, O₃)
- City-level exposure analysis
- Severity-based visual alerts

### 2. Interactive Pollution Mapping
- Geospatial AQI visualization using Leaflet.js
- Time-based pollutant trend overlays
- Toggle views by pollutant or region

### 3. Historical Data Explorer
- Advanced filters (city, pollutant, date, severity)
- Downloadable analytics reports (PDF)
- Graphical trend analysis

### 4. Intelligent Query Management
- HTML-based contact form
- Auto-acknowledgment emails
- Spring Mail for backend email service

### 5. Java-Based On-Site Chatbot
- Java string-matching logic for FAQs
- Assists users with navigation and general queries

### 6. Secure User Authentication
- Stateless sessions using Spring Security
- Role-based controls for users/admins
- Encrypted password storage

### 7. Alerts and Subscriptions
- Custom alerts based on AQI thresholds and location
- Email delivery (daily, weekly, monthly)

### 8. Admin Dashboard
- User management
- API health/status monitoring
- Moderation and logging tools

---

## 🤖 Advanced AI Modules

### 📷 PolluScan: Visual Pollution Detector
- Upload photos of the environment
- Gemini AI detects pollution features (smog, green cover)
- Outputs multilingual summaries

### 🧠 Healthify AI
- Health suggestions based on local AQI + user health history
- Adaptive advice for conditions like asthma or allergies

### 📰 Eco News Aggregator
- Filters environmental news by topic and sentiment
- User-customizable keyword alerts and relevance scores

### 🗣️ Airi: Voice & Text Assistant
- Natural language assistant using Gemini AI
- Handles site navigation, AQI education, and environment FAQs

### 🎙️ AiraSpeaks: Podcast Generator
- Converts environmental insights into audio episodes
- Multiple presentation modes (news anchor, educator, narrator)

### 🌍 EarthLens: Natural Event Tracker
- Real-time map of wildfires, volcanic activity, dust storms (via NASA EONET)
- Interactive overlays and filtering

### ♻️ EcoImpact: Lifestyle Simulator
- Users simulate environmental effects of choices (travel, food, electricity)
- Generates impact charts and eco-friendly suggestions

---

## 🧬 NLP & Machine Learning Systems

### 🧾 Pollution News Sentiment Dashboard
- Extracts and analyzes article sentiment
- Abstractive summarization
- Word clouds, bigrams/trigrams

### 🔮 AQI Forecasting Engine
- Predicts AQI using weather + pollution data
- Built with Random Forest classifier
- Flask microservice for asynchronous access

### 🏥 Health Impact Classifier
- Uses SVM to forecast health risks (respiratory/cardiovascular)
- Geographically and demographically tuned

-----




