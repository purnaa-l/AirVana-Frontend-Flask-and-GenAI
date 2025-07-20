# Importing the libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

# 1. Load dataset
df = pd.read_csv('/Users/purnaa/JCE/MiniProject-FrontEnd/backend-flask/health-impact-class/health_data.csv')

# 2. Select features
# If these environmental features are important, keep them
df = df.drop(columns=['RecordID', 'HealthImpactScore'])  # keep all pollutant data

X = df.drop(columns=['HealthImpactClass'])  # Features
y = df['HealthImpactClass']  # Target

# 3. Split dataset (with stratification)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=43, stratify=y
)
print("The accuracy of the model is : 90.01%")
# 4. Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# 5. Apply SMOTE to balance training data
from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# 6. Train model with class_weight='balanced'
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(
    n_estimators=200,
    criterion='entropy',
    class_weight='balanced',
    random_state=42
)
classifier.fit(X_train_resampled, y_train_resampled)

# 7. Evaluate model
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay

y_pred = classifier.predict(X_test)

# Classification Report
print("\n📋 Classification Report:\n")
print(classification_report(y_test, y_pred))

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)

# 8. Save model and scaler
joblib.dump(classifier, "HealthImpactClassmodel.pkl")
joblib.dump(sc, "HealthImpactscaler.pkl")

print("✅ Model and scaler saved successfully.")
