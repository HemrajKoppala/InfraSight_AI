from pathlib import Path
import re


DATA_DIR = Path("backend/data/processed")


for file in sorted(DATA_DIR.glob("FlashReport_*.txt")):

    print("\n" + "=" * 70)
    print(file.name)
    print("=" * 70)

    text = file.read_text(
        encoding="utf-8",
        errors="ignore"
    )

    pages = re.split(
        r"===== PAGE \d+ =====",
        text
    )

    for page_number, page in enumerate(pages, start=1):

        lower = page.lower()

        keywords = [
            "project code",
            "physical progress",
            "cumulative expenditure",
            "original/target",
            "revised doc",
        ]

        found = [
            keyword
            for keyword in keywords
            if keyword in lower
        ]

        if len(found) >= 2:

            print(
                f"PAGE {page_number}: "
                + ", ".join(found)
            )