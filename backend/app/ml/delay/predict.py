import os
import joblib
import pandas as pd


MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model.pkl",
)


# ============================================================
# LOAD MODEL
# ============================================================

model = joblib.load(MODEL_PATH)


# ============================================================
# PREDICT DELAY
# ============================================================

def predict_delay(
    state,
    physical_progress,
    planned_duration_days,
    elapsed_days,
):
    """
    Predict whether a project is likely to be delayed.

    Returns:
        delay_probability
        prediction
        risk_level
    """

    # Avoid division by zero
    elapsed_days_safe = max(elapsed_days, 1)

    progress_per_day = (
        physical_progress / elapsed_days_safe
    )

    data = pd.DataFrame(
        [
            {
                "state": state,
                "physical_progress": physical_progress,
                "planned_duration_days": planned_duration_days,
                "elapsed_days": elapsed_days,
                "progress_per_day": progress_per_day,
            }
        ]
    )

    # Prediction
    prediction = int(
        model.predict(data)[0]
    )

    # Probability of delay
    probability = float(
        model.predict_proba(data)[0][1]
    )

    # Risk classification
    if probability >= 0.75:
        risk_level = "CRITICAL"
    elif probability >= 0.50:
        risk_level = "HIGH"
    elif probability >= 0.25:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "delay_probability": round(
            probability * 100,
            2,
        ),
        "prediction": (
            "DELAYED"
            if prediction == 1
            else "ON SCHEDULE"
        ),
        "risk_level": risk_level,
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    result = predict_delay(
        state="Andhra Pradesh",
        physical_progress=35,
        planned_duration_days=900,
        elapsed_days=700,
    )

    print("\nPrediction:")
    print(result)