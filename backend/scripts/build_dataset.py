from pathlib import Path
import re
import pandas as pd


INPUT_DIR = Path("backend/data/processed")
OUTPUT_FILE = INPUT_DIR / "projects_monthly.csv"


REPORTS = {
    "FlashReport_May2026.txt": "2026-05",
    "FlashReport_June_2026.txt": "2026-06",
}


# Actual Table 6 begins near the end of each report.
START_PAGES = {
    "FlashReport_May2026.txt": 163,
    "FlashReport_June_2026.txt": 160,
}


def extract_table_section(text, start_page):

    pages = re.split(
        r"===== PAGE \d+ =====",
        text
    )

    # Use the final page range.
    # The Table 6 section occupies the final
    # appendix pages in these reports.

    start_index = max(
        0,
        start_page - 1
    )

    selected = pages[start_index:]

    return "\n".join(selected)


def extract_project_rows(section, month):

    # Normalize line endings.
    section = section.replace(
        "\r",
        "\n"
    )

    # Remove repeated headers/footers.
    section = re.sub(
        r"Project Assessment, Infrastructure Monitoring and Analytics for Nation-building",
        "",
        section,
        flags=re.IGNORECASE
    )

    section = re.sub(
        r"For details visit:.*",
        "",
        section,
        flags=re.IGNORECASE
    )

    # Project codes are six digit numbers in parentheses.
    matches = list(
        re.finditer(
            r"\((\d{6})\)",
            section
        )
    )

    print(
        f"{month}: project-code occurrences = "
        f"{len(matches)}"
    )

    records = []

    for i, match in enumerate(matches):

        project_code = match.group(1)

        # Project-code occurrence must be preceded
        # by a serial number/project row.
        before = section[
            max(0, match.start() - 500):
            match.start()
        ]

        serial_matches = list(
            re.finditer(
                r"\b(\d{1,4})\s+",
                before
            )
        )

        if not serial_matches:
            continue

        serial = serial_matches[-1].group(1)

        # Ignore unlikely codes from notes.
        if not serial.isdigit():
            continue

        start = max(
            0,
            match.start() - 700
        )

        end = (
            matches[i + 1].start()
            if i + 1 < len(matches)
            else min(
                len(section),
                match.end() + 1000
            )
        )

        block = section[start:end]

        # State list.
        states = [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",
            "Delhi",
            "Ladakh",
            "Jammu and Kashmir",
        ]

        state = ""

        for s in states:

            if re.search(
                r"\b" + re.escape(s) + r"\b",
                block,
                re.IGNORECASE
            ):
                state = s
                break

        dates = re.findall(
            r"\b\d{2}/\d{4}\b",
            block
        )

        numbers = re.findall(
            r"\b\d+(?:\.\d+)?\b",
            block
        )

        physical_progress = None

        if numbers:

            # Look backward for a value <= 100.
            for value in reversed(numbers):

                try:
                    n = float(value)

                    if 0 <= n <= 100:
                        physical_progress = n
                        break

                except ValueError:
                    pass

        records.append({
            "report_month": month,
            "serial_no": serial,
            "project_code": project_code,
            "state": state,
            "approval_date": dates[0] if len(dates) > 0 else "",
            "start_date": dates[1] if len(dates) > 1 else "",
            "target_doc": dates[2] if len(dates) > 2 else "",
            "revised_doc": dates[3] if len(dates) > 3 else "",
            "physical_progress": physical_progress,
        })

    return records


def main():

    all_records = []

    print()
    print("=" * 60)
    print("PAIMANA TABLE 6 DATASET BUILDER")
    print("=" * 60)

    for filename, month in REPORTS.items():

        path = INPUT_DIR / filename

        print()
        print(
            f"Processing: {filename}"
        )

        text = path.read_text(
            encoding="utf-8",
            errors="ignore"
        )

        start_page = START_PAGES[
            filename
        ]

        section = extract_table_section(
            text,
            start_page
        )

        print(
            f"Section characters: "
            f"{len(section):,}"
        )

        records = extract_project_rows(
            section,
            month
        )

        print(
            f"Records extracted: "
            f"{len(records)}"
        )

        all_records.extend(records)

    if not all_records:

        print(
            "\nNo records extracted."
        )

        return

    df = pd.DataFrame(
        all_records
    )

    df = df.drop_duplicates(
        subset=[
            "report_month",
            "project_code"
        ]
    )

    df = df.sort_values(
        [
            "report_month",
            "serial_no"
        ]
    )

    df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print()
    print("=" * 60)
    print("DATASET CREATED")
    print("=" * 60)

    print(
        f"Rows: {len(df)}"
    )

    print(
        f"Unique projects: "
        f"{df['project_code'].nunique()}"
    )

    print(
        f"Months: "
        f"{df['report_month'].nunique()}"
    )

    print()
    print(
        f"Saved to: {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()