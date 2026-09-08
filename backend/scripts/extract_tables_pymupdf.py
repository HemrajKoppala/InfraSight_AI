from pathlib import Path
import pymupdf


RAW_DIR = Path("backend/data/raw")
PROCESSED_DIR = Path("backend/data/processed")

PROCESSED_DIR.mkdir(parents=True, exist_ok=True)


def extract_pdf(pdf_path):

    print(f"\nProcessing: {pdf_path.name}")

    try:
        doc = pymupdf.open(pdf_path)

        output = []

        for page_number, page in enumerate(doc, start=1):

            try:
                text = page.get_text("text")
            except Exception as e:
                print(f"  Page {page_number}: extraction error - {e}")
                text = ""

            output.append(
                f"\n===== PAGE {page_number} =====\n"
            )

            output.append(text)

        doc.close()

        return "".join(output)

    except Exception as e:

        print(f"ERROR opening {pdf_path.name}: {e}")

        return ""


def main():

    print("=" * 60)
    print("PAIMANA PDF TEXT EXTRACTION")
    print("=" * 60)

    # Automatically find every PDF in backend/data/raw
    pdf_files = sorted(RAW_DIR.glob("*.pdf"))

    if not pdf_files:

        print("\nNo PDF files found.")

        return

    print(f"\nPDF files found: {len(pdf_files)}")

    for pdf_path in pdf_files:

        text = extract_pdf(pdf_path)

        if not text:

            print(f"Skipped: {pdf_path.name}")

            continue

        output_name = pdf_path.stem + "_pymupdf.txt"

        output_path = PROCESSED_DIR / output_name

        output_path.write_text(
            text,
            encoding="utf-8"
        )

        print(f"Saved: {output_path}")

        print(f"Characters: {len(text):,}")


if __name__ == "__main__":
    main()