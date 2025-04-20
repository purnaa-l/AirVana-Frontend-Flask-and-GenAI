# backend/model/train_model.py

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

# 1. Load dataset (replace with your actual dataset)
df = pd.read_csv("TempVSAqi.csv")  # Make sure this file exists

# 2. Feature columns and target
features = ["temperature_celsius", "wind_kph", "pressure_mb", "humidity", "cloud", "uv_index"]
target = 'air_quality_PM2.5'

X = df[features]
y = df[target]

# 3. Preprocess: scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 4. Train/Test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# 5. Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 6. Save model and scaler
joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model and scaler saved successfully.")
