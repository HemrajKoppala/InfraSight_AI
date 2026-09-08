from pathlib import Path
import re
import pandas as pd


# ============================================================
# CONFIGURATION
# ============================================================

INPUT_DIR = Path("backend/data/processed")
OUTPUT_FILE = INPUT_DIR / "projects_monthly.csv"


REPORTS = {
    "FlashReport_June_2025_pymupdf.txt": "2025-06",
    "FlashReport_July_2025_pymupdf.txt": "2025-07",
    "FlashReport_August_2025_pymupdf.txt": "2025-08",
    "FlashReport_September_2025_pymupdf.txt": "2025-09",
    "FlashReport_October_2025_pymupdf.txt": "2025-10",
    "FlashReport_November_2025_pymupdf.txt": "2025-11",
    "FlashReport_December_2025_pymupdf.txt": "2025-12",
    "FlashReport_January_2026_pymupdf.txt": "2026-01",
    "FlashReport_February_2026_pymupdf.txt": "2026-02",
    "FlashReport_March_2026_pymupdf.txt": "2026-03",
    "FlashReport_April2026_pymupdf.txt": "2026-04",
    "FlashReport_May2026_pymupdf.txt": "2026-05",
    "FlashReport_June_2026_pymupdf.txt": "2026-06",
    "FlashReport_July_2026_pymupdf.txt": "2026-07",
}


STATES = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
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
]


# ============================================================
# STATE
# ============================================================

def find_state(block):
    """
    Find a state inside a project block.

    Longest state names are checked first.
    """

    for state in sorted(STATES, key=len, reverse=True):

        pattern = r"\b" + re.escape(state) + r"\b"

        if re.search(
            pattern,
            block,
            flags=re.IGNORECASE,
        ):
            return state

    if re.search(
        r"\bMULTI\s+STATE\b",
        block,
        flags=re.IGNORECASE,
    ):
        return "Multi State"

    return ""


# ============================================================
# DATE NORMALIZATION
# ============================================================

def normalize_date(value):
    """
    Convert:

        08/2022 -> 2022-08
        8/2022  -> 2022-08
        08-2022 -> 2022-08

    Keep other values unchanged.
    """

    if not value:
        return ""

    value = value.strip()

    value = value.replace("/", "-")

    match = re.fullmatch(
        r"(\d{1,2})-(\d{4})",
        value,
    )

    if not match:
        return value

    month = int(match.group(1))
    year = match.group(2)

    if not 1 <= month <= 12:
        return value

    return f"{year}-{month:02d}"


# ============================================================
# PROJECT CODE DETECTION
# ============================================================

def find_project_code_matches(section):
    """
    Automatically detect project codes.

    Supported examples:

        (N24001273)
        (N04000092)

    and numeric codes used by some later reports:

        (701404)
        (400102)

    The code MUST be inside parentheses to avoid accidentally
    treating dates/numbers as project codes.
    """

    patterns = [
        # PAIMANA-style alphanumeric codes
        r"\(\s*(N\d{8})\s*\)",

        # Numeric project codes
        r"\(\s*(\d{6,8})\s*\)",
    ]

    matches = []

    for pattern in patterns:

        matches.extend(
            re.finditer(
                pattern,
                section,
                flags=re.IGNORECASE,
            )
        )

    # Sort according to original document position.
    matches.sort(
        key=lambda m: m.start()
    )

    # Remove duplicate matches at same position.
    unique = []

    seen_positions = set()

    for match in matches:

        if match.start() in seen_positions:
            continue

        seen_positions.add(match.start())

        unique.append(match)

    return unique


# ============================================================
# ONGOING PROJECT SECTION
# ============================================================

def extract_table_section(text):
    """
    Locate the ongoing-project table.

    Different PDF versions use slightly different headings.
    Therefore we search using several patterns.

    Importantly, we DO NOT require a specific project-code
    format while locating the section.
    """

    text = text.replace("\r", "\n")

    # --------------------------------------------------------
    # Remove repeated page headers/footers where possible
    # --------------------------------------------------------

    # Exact common heading.
    patterns = [

        r"Table\s*[:\-]?\s*7\s*\.\s*Project\s+List\s*:\s*Ongoing\s+Projects",

        r"Table\s*[:\-]?\s*7\s*[\.\-]?\s*Project\s+List\s*:\s*Ongoing\s+Projects",

        r"Project\s+List\s*:\s*Ongoing\s+Projects",

        r"Project\s+List\s*:\s*Ongoing\s+Projects\s+as\s+of",

        r"Ongoing\s+Projects\s+as\s+of",

        r"Ongoing\s+Projects",
    ]

    candidates = []

    for pattern in patterns:

        for match in re.finditer(
            pattern,
            text,
            flags=re.IGNORECASE,
        ):

            candidates.append(match)

    if not candidates:
        return ""

    # --------------------------------------------------------
    # Select the occurrence which has the largest number
    # of project-code candidates after it.
    #
    # This prevents accidentally selecting a TOC/reference
    # occurrence near the beginning of the document.
    # --------------------------------------------------------

    best_match = None
    best_count = -1

    for match in candidates:

        candidate_text = text[match.start():]

        codes = find_project_code_matches(
            candidate_text
        )

        count = len(codes)

        if count > best_count:

            best_count = count
            best_match = match

    if best_match is None:
        return ""

    section = text[best_match.start():]

    # --------------------------------------------------------
    # Stop at obvious tables after ongoing projects.
    # --------------------------------------------------------

    end_patterns = [

        r"Table\s*[:\-]?\s*8\s*\.",
        r"Table\s*[:\-]?\s*9\s*\.",
        r"Project\s+List\s*:\s*Frozen",
        r"Project\s+List\s*:\s*Deleted",
        r"Frozen\s*/\s*Deleted",
    ]

    end_positions = []

    for pattern in end_patterns:

        match = re.search(
            pattern,
            section[1000:],
            flags=re.IGNORECASE,
        )

        if match:
            end_positions.append(
                1000 + match.start()
            )

    if end_positions:

        section = section[
            :min(end_positions)
        ]

    print(
        f"Selected ongoing section with "
        f"{best_count} project-code candidates"
    )

    return section


# ============================================================
# SERIAL NUMBER
# ============================================================

def find_serial_number(section, project_match):
    """
    Try to find the serial number immediately before a
    project-code occurrence.

    PDF extraction can put serial number on its own line
    or beside the project name.
    """

    before = section[
        max(
            0,
            project_match.start() - 1200
        ):
        project_match.start()
    ]

    # --------------------------------------------------------
    # Most reliable:
    # number on its own line
    # --------------------------------------------------------

    serial_matches = re.findall(
        r"(?:^|\n)\s*(\d{1,4})\s*$",
        before,
        flags=re.MULTILINE,
    )

    if serial_matches:

        return int(serial_matches[-1])

    # --------------------------------------------------------
    # Fallback:
    # number followed by text
    # --------------------------------------------------------

    serial_matches = re.findall(
        r"(?:^|\n)\s*(\d{1,4})\s+(?=[A-Za-zA-Z])",
        before,
        flags=re.MULTILINE,
    )

    if serial_matches:

        return int(serial_matches[-1])

    return None


# ============================================================
# DATE EXTRACTION
# ============================================================

def extract_dates(block):
    """
    Extract MM/YYYY or MM-YYYY dates.

    We deliberately ignore things such as:
        2025-06

    because the source table uses MM/YYYY.
    """

    dates = re.findall(
        r"\b\d{1,2}[/-]\d{4}\b",
        block,
    )

    return [
        normalize_date(date)
        for date in dates
    ]


# ============================================================
# PHYSICAL PROGRESS
# ============================================================

def extract_physical_progress(block):
    """
    Extract physical progress.

    Physical progress is normally the final percentage-like
    numeric field in the project row.

    Values must be between 0 and 100.
    """

    numbers = re.findall(
        r"(?<![\d.])\d+(?:\.\d+)?(?![\d.])",
        block,
    )

    candidates = []

    for value in numbers:

        try:

            number = float(value)

        except ValueError:

            continue

        if 0 <= number <= 100:

            candidates.append(number)

    if not candidates:
        return None

    return candidates[-1]


# ============================================================
# PROJECT ROW EXTRACTION
# ============================================================

def extract_project_rows(section, month):

    section = section.replace(
        "\r",
        "\n",
    )

    # Remove known unwanted text.
    section = re.sub(
        r"Project Assessment, Infrastructure Monitoring and Analytics for Nation-building",
        "",
        section,
        flags=re.IGNORECASE,
    )

    section = re.sub(
        r"For details visit:.*",
        "",
        section,
        flags=re.IGNORECASE,
    )

    # --------------------------------------------------------
    # Find ALL supported project-code formats.
    # --------------------------------------------------------

    matches = find_project_code_matches(
        section
    )

    print(
        f"{month}: project-code occurrences = "
        f"{len(matches)}"
    )

    records = []

    for i, match in enumerate(matches):

        project_code = match.group(1).upper()

        # ----------------------------------------------------
        # Serial number
        # ----------------------------------------------------

        serial_no = find_serial_number(
            section,
            match,
        )

        if serial_no is None:

            # Do not discard the project.
            # Use sequential fallback.
            serial_no = i + 1

        # ----------------------------------------------------
        # Determine project block.
        #
        # We take enough text before the project code to
        # include:
        #
        #   serial
        #   project name
        #   agency
        #   code
        #   state
        #
        # and enough after it for the table fields.
        # ----------------------------------------------------

        start = max(
            0,
            match.start() - 1800,
        )

        if i + 1 < len(matches):

            end = matches[i + 1].start()

        else:

            end = min(
                len(section),
                match.end() + 2500,
            )

        block = section[
            start:end
        ]

        # ----------------------------------------------------
        # State
        # ----------------------------------------------------

        state = find_state(
            block
        )

        # ----------------------------------------------------
        # Dates
        # ----------------------------------------------------

        dates = extract_dates(
            block
        )

        approval_date = (
            dates[0]
            if len(dates) >= 1
            else ""
        )

        start_date = (
            dates[1]
            if len(dates) >= 2
            else ""
        )

        target_doc = (
            dates[2]
            if len(dates) >= 3
            else ""
        )

        revised_doc = (
            dates[3]
            if len(dates) >= 4
            else ""
        )

        # ----------------------------------------------------
        # Physical progress
        #
        # June 2025 table does not contain this field.
        # ----------------------------------------------------

        if month == "2025-06":

            physical_progress = None

        else:

            physical_progress = (
                extract_physical_progress(
                    block
                )
            )

        # ----------------------------------------------------
        # Record
        # ----------------------------------------------------

        records.append(
            {
                "report_month": month,
                "serial_no": serial_no,
                "project_code": project_code,
                "state": state,
                "approval_date": approval_date,
                "start_date": start_date,
                "target_doc": target_doc,
                "revised_doc": revised_doc,
                "physical_progress": physical_progress,
            }
        )

    return records


# ============================================================
# VALIDATION
# ============================================================

def validate_dataset(df):

    print()
    print("=" * 60)
    print("DATASET VALIDATION")
    print("=" * 60)

    expected_months = list(
        REPORTS.values()
    )

    actual_months = sorted(
        df["report_month"]
        .dropna()
        .unique()
        .tolist()
    )

    print()
    print(
        f"Expected months: {len(expected_months)}"
    )

    print(
        f"Actual months:   {len(actual_months)}"
    )

    missing_months = [
        month
        for month in expected_months
        if month not in actual_months
    ]

    if missing_months:

        print()
        print("WARNING - Missing months:")

        for month in missing_months:

            print(
                f"  {month}"
            )

    else:

        print(
            "All 14 months are present."
        )

    # --------------------------------------------------------
    # State coverage
    # --------------------------------------------------------

    state_present = (
        df["state"]
        .fillna("")
        .astype(str)
        .str.strip()
        .ne("")
        .sum()
    )

    print()
    print(
        f"State present: {state_present:,}"
    )

    print(
        f"State missing: "
        f"{len(df) - state_present:,}"
    )

    # --------------------------------------------------------
    # Physical progress
    # --------------------------------------------------------

    progress_present = (
        df["physical_progress"]
        .notna()
        .sum()
    )

    print()
    print(
        f"Physical progress present: "
        f"{progress_present:,}"
    )

    print(
        f"Physical progress missing: "
        f"{len(df) - progress_present:,}"
    )

    # --------------------------------------------------------
    # Rows by month
    # --------------------------------------------------------

    print()
    print("Rows by month:")

    print(
        df.groupby("report_month")
        .size()
        .to_string()
    )

    # --------------------------------------------------------
    # Duplicate project/month rows
    # --------------------------------------------------------

    duplicate_count = df.duplicated(
        subset=[
            "report_month",
            "project_code",
        ]
    ).sum()

    print()
    print(
        f"Duplicate project/month rows: "
        f"{duplicate_count:,}"
    )

    # --------------------------------------------------------
    # June validation
    # --------------------------------------------------------

    june = df[
        df["report_month"] == "2025-06"
    ]

    if not june.empty:

        print()
        print("June 2025 validation:")

        print(
            f"June rows: {len(june):,}"
        )

        print(
            f"June states present: "
            f"{june['state'].notna().sum():,}"
        )

        print(
            f"June approval dates present: "
            f"{june['approval_date'].ne('').sum():,}"
        )

    # --------------------------------------------------------
    # Sample
    # --------------------------------------------------------

    print()
    print("Sample rows:")

    print(
        df.head(10)
        .to_string(index=False)
    )

    # --------------------------------------------------------
    # Missing values
    # --------------------------------------------------------

    print()
    print("=" * 60)
    print("MISSING VALUES")
    print("=" * 60)

    print(
        df.isna()
        .sum()
        .to_string()
    )

    # --------------------------------------------------------
    # State distribution
    # --------------------------------------------------------

    print()
    print("=" * 60)
    print("STATE COVERAGE")
    print("=" * 60)

    print(
        f"State present: {state_present:,}"
    )

    print(
        f"State missing: "
        f"{len(df) - state_present:,}"
    )

    print()
    print("State distribution:")

    print(
        df["state"]
        .value_counts(dropna=False)
        .to_string()
    )

    # --------------------------------------------------------
    # Physical progress
    # --------------------------------------------------------

    print()
    print("=" * 60)
    print("PHYSICAL PROGRESS COVERAGE")
    print("=" * 60)

    print(
        f"Physical progress present: "
        f"{progress_present:,}"
    )

    print(
        f"Physical progress missing: "
        f"{len(df) - progress_present:,}"
    )


# ============================================================
# MAIN
# ============================================================

def main():

    all_records = []

    print()
    print("=" * 60)
    print("PAIMANA 14-MONTH DATASET BUILDER")
    print("=" * 60)

    for filename, month in REPORTS.items():

        print()
        print("-" * 60)

        print(
            f"Processing: {filename}"
        )

        path = INPUT_DIR / filename

        if not path.exists():

            print(
                "FILE NOT FOUND"
            )

            continue

        # ----------------------------------------------------
        # Read text
        # ----------------------------------------------------

        text = path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

        # ----------------------------------------------------
        # Extract ongoing project table
        # ----------------------------------------------------

        section = extract_table_section(
            text
        )

        if not section:

            print(
                "Ongoing projects section NOT FOUND"
            )

            continue

        print(
            f"Ongoing projects section characters: "
            f"{len(section):,}"
        )

        # ----------------------------------------------------
        # Extract projects
        # ----------------------------------------------------

        records = extract_project_rows(
            section,
            month,
        )

        print(
            f"Records extracted: "
            f"{len(records):,}"
        )

        if len(records) == 0:

            print()
            print(
                f"WARNING: {month} produced only 0 records."
            )

            print(
                "This month may have an extraction problem."
            )

        all_records.extend(
            records
        )

    # ========================================================
    # No records
    # ========================================================

    if not all_records:

        print()
        print(
            "ERROR: No records extracted."
        )

        return

    # ========================================================
    # DATAFRAME
    # ========================================================

    df = pd.DataFrame(
        all_records
    )

    # --------------------------------------------------------
    # Before deduplication
    # --------------------------------------------------------

    rows_before = len(df)

    # --------------------------------------------------------
    # Remove duplicate project/month combinations
    # --------------------------------------------------------

    df = df.drop_duplicates(
        subset=[
            "report_month",
            "project_code",
        ],
        keep="first",
    )

    duplicates_removed = (
        rows_before - len(df)
    )

    # --------------------------------------------------------
    # Sort
    # --------------------------------------------------------

    df = df.sort_values(
        [
            "report_month",
            "project_code",
        ]
    ).reset_index(
        drop=True
    )

    # --------------------------------------------------------
    # Save
    # --------------------------------------------------------

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    df.to_csv(
        OUTPUT_FILE,
        index=False,
    )

    # ========================================================
    # SUMMARY
    # ========================================================

    print()
    print("=" * 60)
    print("DATASET CREATED")
    print("=" * 60)

    print(
        f"Rows: {len(df):,}"
    )

    print(
        f"Unique projects: "
        f"{df['project_code'].nunique():,}"
    )

    print(
        f"Months: "
        f"{df['report_month'].nunique()}"
    )

    print(
        f"Duplicates removed: "
        f"{duplicates_removed:,}"
    )

    validate_dataset(
        df
    )

    print()
    print(
        f"Saved to: {OUTPUT_FILE}"
    )


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":

    main()