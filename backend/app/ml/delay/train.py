import os
import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


# ============================================================
# CONFIGURATION
# ============================================================

DATA_PATH = "data/processed/projects_monthly.csv"
MODEL_PATH = "app/ml/delay/model.pkl"


# ============================================================
# LOAD DATA
# ============================================================

print("=" * 60)
print("INFRA SIGHT AI - DELAY MODEL TRAINING")
print("=" * 60)

df = pd.read_csv(DATA_PATH)

print(f"\nDataset shape: {df.shape}")


# ============================================================
# DATE CONVERSION
# ============================================================

date_columns = [
    "report_month",
    "approval_date",
    "start_date",
    "target_doc",
    "revised_doc",
]

for column in date_columns:
    df[column] = pd.to_datetime(
        df[column],
        format="%Y-%m",
        errors="coerce",
    )


# ============================================================
# SELECT APPLICABLE COMPLETION DATE
# ============================================================

# Prefer revised completion date.
# If unavailable, use original target date.

df["completion_date"] = df["revised_doc"].fillna(
    df["target_doc"]
)


# ============================================================
# REMOVE ROWS WITHOUT REQUIRED DATES
# ============================================================

df = df.dropna(
    subset=[
        "report_month",
        "start_date",
        "completion_date",
    ]
).copy()


# ============================================================
# REMOVE IMPOSSIBLE PROJECT TIMELINES
# ============================================================

# A project whose start date is after its report month
# has not started yet. It should not be treated as delayed.

df = df[
    df["start_date"] <= df["report_month"]
].copy()


# ============================================================
# FEATURE ENGINEERING
# ============================================================

# Planned project duration
df["planned_duration_days"] = (
    df["completion_date"] - df["start_date"]
).dt.days


# Time already elapsed at the reporting date
df["elapsed_days"] = (
    df["report_month"] - df["start_date"]
).dt.days


# Remaining planned duration
df["remaining_days"] = (
    df["completion_date"] - df["report_month"]
).dt.days


# Physical progress
df["physical_progress"] = pd.to_numeric(
    df["physical_progress"],
    errors="coerce",
)


# Missing progress is treated as zero for the first model.
df["physical_progress"] = df["physical_progress"].fillna(0)


# Progress per elapsed day
df["progress_per_day"] = (
    df["physical_progress"]
    / df["elapsed_days"].clip(lower=1)
)


# ============================================================
# CREATE TARGET
# ============================================================

# Delayed:
# completion date has already passed AND project is not complete.

df["delay"] = (
    (df["completion_date"] < df["report_month"])
    & (df["physical_progress"] < 100)
).astype(int)


print("\nTarget distribution:")
print(df["delay"].value_counts())
print("\nTarget percentage:")
print(df["delay"].value_counts(normalize=True) * 100)


# ============================================================
# FEATURES
# ============================================================

feature_columns = [
    "state",
    "physical_progress",
    "planned_duration_days",
    "elapsed_days",
    "progress_per_day",
]

X = df[feature_columns]
y = df["delay"]


# ============================================================
# TIME-BASED TRAIN / TEST SPLIT
# ============================================================

# Sort chronologically so that older reports train the model
# and newer reports are used for evaluation.

df = df.sort_values("report_month")

split_index = int(len(df) * 0.8)

train_df = df.iloc[:split_index]
test_df = df.iloc[split_index:]

X_train = train_df[feature_columns]
y_train = train_df["delay"]

X_test = test_df[feature_columns]
y_test = test_df["delay"]


print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))


# ============================================================
# PREPROCESSING
# ============================================================

numeric_features = [
    "physical_progress",
    "planned_duration_days",
    "elapsed_days",
    "progress_per_day",
]

categorical_features = [
    "state",
]


numeric_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median"),
        )
    ]
)


categorical_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="most_frequent"),
        ),
        (
            "onehot",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
        ),
    ]
)


preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            numeric_transformer,
            numeric_features,
        ),
        (
            "categorical",
            categorical_transformer,
            categorical_features,
        ),
    ]
)


# ============================================================
# MODEL
# ============================================================

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    min_samples_split=10,
    min_samples_leaf=4,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)


pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "model",
            model,
        ),
    ]
)


# ============================================================
# TRAIN
# ============================================================

print("\nTraining model...")

pipeline.fit(
    X_train,
    y_train,
)


# ============================================================
# EVALUATION
# ============================================================

predictions = pipeline.predict(X_test)
probabilities = pipeline.predict_proba(X_test)[:, 1]


accuracy = accuracy_score(
    y_test,
    predictions,
)


print("\n" + "=" * 60)
print("MODEL RESULTS")
print("=" * 60)

print(f"\nAccuracy: {accuracy:.4f}")


try:
    auc = roc_auc_score(
        y_test,
        probabilities,
    )
    print(f"ROC-AUC: {auc:.4f}")
except ValueError:
    print("ROC-AUC could not be calculated.")


print("\nClassification Report:")
print(
    classification_report(
        y_test,
        predictions,
        zero_division=0,
    )
)


print("\nConfusion Matrix:")
print(
    confusion_matrix(
        y_test,
        predictions,
    )
)


# ============================================================
# SAVE MODEL
# ============================================================

os.makedirs(
    os.path.dirname(MODEL_PATH),
    exist_ok=True,
)

joblib.dump(
    pipeline,
    MODEL_PATH,
)


print("\nModel saved to:")
print(MODEL_PATH)

print("\nTraining complete.")