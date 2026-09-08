def calculate_risk(
    delay_probability,
    physical_progress,
    planned_duration_days,
    elapsed_days,
):
    """
    Calculate overall infrastructure project risk.

    Returns:
        risk_score
        risk_level
        factors
    """

    # --------------------------------------------------------
    # Normalize inputs
    # --------------------------------------------------------

    delay_probability = max(
        0,
        min(100, float(delay_probability))
    )

    physical_progress = max(
        0,
        min(100, float(physical_progress))
    )

    planned_duration_days = max(
        1,
        float(planned_duration_days)
    )

    elapsed_days = max(
        0,
        float(elapsed_days)
    )

    # --------------------------------------------------------
    # 1. Delay Risk
    # --------------------------------------------------------

    delay_risk = delay_probability

    # --------------------------------------------------------
    # 2. Progress Risk
    # --------------------------------------------------------

    # Expected progress based on elapsed time.

    expected_progress = min(
        100,
        (elapsed_days / planned_duration_days) * 100
    )

    progress_gap = (
        expected_progress - physical_progress
    )

    # Only penalize projects that are behind expected progress.

    if progress_gap <= 0:
        progress_risk = 0
    else:
        progress_risk = min(
            100,
            progress_gap * 2
        )

    # --------------------------------------------------------
    # 3. Schedule Risk
    # --------------------------------------------------------

    if elapsed_days >= planned_duration_days:
        schedule_risk = 100
    else:
        schedule_risk = (
            elapsed_days
            / planned_duration_days
        ) * 100

    # --------------------------------------------------------
    # 4. Completion Risk
    # --------------------------------------------------------

    completion_gap = 100 - physical_progress

    if completion_gap <= 10:
        completion_risk = 0
    else:
        completion_risk = min(
            100,
            completion_gap
        )

    # --------------------------------------------------------
    # Weighted Risk Score
    # --------------------------------------------------------

    risk_score = (
        delay_risk * 0.40
        + progress_risk * 0.30
        + schedule_risk * 0.15
        + completion_risk * 0.15
    )

    risk_score = round(
        min(100, max(0, risk_score)),
        2
    )

    # --------------------------------------------------------
    # Risk Level
    # --------------------------------------------------------

    if risk_score >= 80:
        risk_level = "CRITICAL"

    elif risk_score >= 60:
        risk_level = "HIGH"

    elif risk_score >= 30:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    # --------------------------------------------------------
    # Risk Factors
    # --------------------------------------------------------

    factors = []

    if delay_probability >= 75:
        factors.append(
            "High probability of project delay"
        )

    elif delay_probability >= 50:
        factors.append(
            "Moderate probability of project delay"
        )

    if progress_gap > 20:
        factors.append(
            "Physical progress is significantly behind schedule"
        )

    elif progress_gap > 10:
        factors.append(
            "Physical progress is behind schedule"
        )

    if elapsed_days >= planned_duration_days:
        factors.append(
            "Planned project duration has been exceeded"
        )

    if physical_progress < 30 and elapsed_days > (
        planned_duration_days * 0.50
    ):
        factors.append(
            "Low physical progress despite significant elapsed time"
        )

    if physical_progress >= 90:
        factors.append(
            "Project is close to completion"
        )

    if not factors:
        factors.append(
            "No major risk indicators detected"
        )

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "expected_progress": round(
            expected_progress,
            2
        ),
        "progress_gap": round(
            progress_gap,
            2
        ),
        "factors": factors,
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    result = calculate_risk(
        delay_probability=17.17,
        physical_progress=35,
        planned_duration_days=900,
        elapsed_days=700,
    )

    print("\nRisk Analysis:")
    print("=" * 50)

    for key, value in result.items():
        print(f"{key}: {value}")