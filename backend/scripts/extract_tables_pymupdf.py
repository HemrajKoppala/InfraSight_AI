from pathlib import Path
import pymupdf


RAW_DIR = Path("backend/data/raw")
PROCESSED_DIR = Path("backend/data/processed")

PROCESSED_DIR.mkdir(parents=True, exist_ok=True)


FILES = [
    "FlashReport_April2026.pdf",
    "FlashReport_May2026.pdf",
    "FlashReport_June_2026.pdf",
    "FlashReport_July_2026.pdf",
]


def extract_pdf(pdf_path):

    print(f"\nProcessing: {pdf_path.name}")

    doc = pymupdf.open(pdf_path)

    output = []

    for page_number, page in enumerate(doc, start=1):

        text = page.get_text("text")

        output.append(
            f"\n===== PAGE {page_number} =====\n"
        )

        output.append(text)

    doc.close()

    return "".join(output)


def main():

    print("=" * 60)
    print("PAIMANA PDF TEXT EXTRACTION")
    print("=" * 60)

    for filename in FILES:

        pdf_path = RAW_DIR / filename

        if not pdf_path.exists():

            print(f"Missing: {filename}")
            continue

        text = extract_pdf(pdf_path)

        output_name = pdf_path.stem + "_pymupdf.txt"

        output_path = PROCESSED_DIR / output_name

        output_path.write_text(
            text,
            encoding="utf-8"
        )

        print(
            f"Saved: {output_path}"
        )

        print(
            f"Characters: {len(text):,}"
        )


if __name__ == "__main__":
    main()