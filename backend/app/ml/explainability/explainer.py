def generate_explanation(
    delay_probability,
    physical_progress,
    expected_progress,
    progress_gap,
    risk_score,
    risk_level,
):
    """
    Generate a human-readable explanation
    for the project's risk assessment.
    """

    factors = []
    recommendations = []

    # ========================================================
    # DELAY PROBABILITY
    # ========================================================

    if delay_probability >= 75:
        factors.append(
            f"High predicted delay probability ({delay_probability:.1f}%)."
        )

        recommendations.append(
            "Immediate project review and corrective action are recommended."
        )

    elif delay_probability >= 50:
        factors.append(
            f"Moderate predicted delay probability ({delay_probability:.1f}%)."
        )

        recommendations.append(
            "The project should be closely monitored for schedule slippage."
        )

    else:
        factors.append(
            f"Low predicted delay probability ({delay_probability:.1f}%)."
        )

    # ========================================================
    # PHYSICAL PROGRESS
    # ========================================================

    if physical_progress < 25:
        factors.append(
            f"Physical progress is very low at {physical_progress:.1f}%."
        )

        recommendations.append(
            "Review execution capacity, resource availability, and site constraints."
        )

    elif physical_progress < 50:
        factors.append(
            f"Physical progress is only {physical_progress:.1f}%."
        )

    elif physical_progress < 75:
        factors.append(
            f"Physical progress is {physical_progress:.1f}%."
        )

    else:
        factors.append(
            f"Physical progress is {physical_progress:.1f}%."
        )

    # ========================================================
    # PROGRESS GAP
    # ========================================================

    if progress_gap > 30:
        factors.append(
            f"Actual progress is significantly behind expected progress "
            f"by {progress_gap:.1f} percentage points."
        )

        recommendations.append(
            "Prioritize activities that can accelerate physical progress."
        )

    elif progress_gap > 15:
        factors.append(
            f"Actual progress is behind expected progress "
            f"by {progress_gap:.1f} percentage points."
        )

        recommendations.append(
            "Increase monitoring of project execution and milestones."
        )

    elif progress_gap > 5:
        factors.append(
            f"Actual progress is slightly behind expected progress "
            f"by {progress_gap:.1f} percentage points."
        )

    else:
        factors.append(
            "Actual progress is close to or ahead of expected progress."
        )

    # ========================================================
    # RISK LEVEL
    # ========================================================

    if risk_level == "CRITICAL":

        summary = (
            f"CRITICAL RISK: The project requires immediate intervention. "
            f"The current risk score is {risk_score:.1f}/100."
        )

    elif risk_level == "HIGH":

        summary = (
            f"HIGH RISK: The project shows significant warning signs. "
            f"The current risk score is {risk_score:.1f}/100."
        )

    elif risk_level == "MEDIUM":

        summary = (
            f"MEDIUM RISK: The project requires closer monitoring. "
            f"The current risk score is {risk_score:.1f}/100."
        )

    else:

        summary = (
            f"LOW RISK: No major warning signs are currently detected. "
            f"The current risk score is {risk_score:.1f}/100."
        )

    # ========================================================
    # REMOVE DUPLICATES
    # ========================================================

    factors = list(dict.fromkeys(factors))
    recommendations = list(dict.fromkeys(recommendations))

    if not recommendations:
        recommendations.append(
            "Continue regular project monitoring."
        )

    # ========================================================
    # FINAL RESULT
    # ========================================================

    return {
        "summary": summary,
        "factors": factors,
        "recommendations": recommendations,
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    result = generate_explanation(
        delay_probability=17.17,
        physical_progress=35,
        expected_progress=77.78,
        progress_gap=42.78,
        risk_score=53.95,
        risk_level="MEDIUM",
    )

    print("\nExplainability:")
    print("=" * 60)

    print("\nSummary:")
    print(result["summary"])

    print("\nFactors:")

    for factor in result["factors"]:
        print(f"- {factor}")

    print("\nRecommendations:")

    for recommendation in result["recommendations"]:
        print(f"- {recommendation}")