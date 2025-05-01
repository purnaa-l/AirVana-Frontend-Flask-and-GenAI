
# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import joblib
# Importing the dataset
df=pd.read_csv('/Users/purnaa/JCE/MiniProject-FrontEnd/backend-flask/health-impact-class/health_data.csv')

df = df.drop(columns=['RecordID', 'PM10', 'PM2_5', 'NO2', 'SO2', 'O3', 'Humidity', 'WindSpeed', 'HealthImpactScore'])
X = df.drop(columns=['HealthImpactClass'])  # Features
y = df['HealthImpactClass']

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 43)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
classifier.fit(X_train, y_train)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
y_pred = classifier.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
print(cm)
accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy_score(y_test, y_pred))

# 6. Save model and scaler
joblib.dump(classifier, "HealthImpactClassmodel.pkl")
joblib.dump(sc, "HealthImpactscaler.pkl")

print("✅ Model and scaler saved successfully.")
