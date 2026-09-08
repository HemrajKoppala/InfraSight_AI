from pathlib import Path
import re

DATA_DIR = Path("backend/data/processed")


for file in sorted(DATA_DIR.glob("FlashReport_*.txt")):

    text = file.read_text(
        encoding="utf-8",
        errors="ignore"
    )

    pages = re.split(
        r"===== PAGE \d+ =====",
        text
    )

    print("\n" + "=" * 60)
    print(file.name)
    print("=" * 60)

    candidates = []

    for page_no, page in enumerate(pages, start=1):

        clean = re.sub(
            r"\s+",
            " ",
            page
        )

        # Actual table header indicators.
        score = 0

        if re.search(
            r"Sl\.?\s*No",
            clean,
            re.I
        ):
            score += 1

        if re.search(
            r"Project\s*Name",
            clean,
            re.I
        ):
            score += 1

        if re.search(
            r"Project\s*Code",
            clean,
            re.I
        ):
            score += 1

        if re.search(
            r"Cumulative\s*Expenditure",
            clean,
            re.I
        ):
            score += 1

        if re.search(
            r"Original\s*Cost",
            clean,
            re.I
        ):
            score += 1

        if re.search(
            r"Revised\s*Cost",
            clean,
            re.I
        ):
            score += 1

        if score >= 5:

            candidates.append(
                (page_no, score)
            )

    print(
        "Candidate table-header pages:",
        candidates[:20]
    )

    if candidates:

        # The last strong header candidate is usually
        # the beginning of the final project table.
        page_no, score = candidates[-1]

        print(
            f"Selected page: {page_no}"
        )

        clean = re.sub(
            r"\s+",
            " ",
            pages[page_no - 1]
        )

        print(
            "Sample:"
        )

        print(
            clean[:1000]
        )