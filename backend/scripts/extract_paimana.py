from pathlib import Path
from pypdf import PdfReader


RAW_DIR = Path("backend/data/raw")
OUTPUT_DIR = Path("backend/data/processed")

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


PDF_FILES = [
    "FlashReport_April2026.pdf",
    "FlashReport_May2026.pdf",
    "FlashReport_June_2026.pdf",
    "FlashReport_July_2026.pdf",
]


def extract_text_from_pdf(pdf_path):
    print(f"\nReading: {pdf_path.name}")

    reader = PdfReader(str(pdf_path))

    print(f"Total pages: {len(reader.pages)}")

    text_parts = []

    for page_number, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text()

            if text:
                text_parts.append(
                    f"\n===== PAGE {page_number} =====\n{text}"
                )

        except Exception as e:
            print(f"Warning: Could not extract page {page_number}: {e}")

    return "\n".join(text_parts)


def main():

    for filename in PDF_FILES:

        pdf_path = RAW_DIR / filename

        if not pdf_path.exists():
            print(f"NOT FOUND: {pdf_path}")
            continue

        try:
            text = extract_text_from_pdf(pdf_path)

            output_path = OUTPUT_DIR / f"{pdf_path.stem}.txt"

            output_path.write_text(
                text,
                encoding="utf-8"
            )

            print(f"Saved: {output_path}")

        except Exception as e:
            print(f"ERROR processing {filename}: {e}")


if __name__ == "__main__":
    main()