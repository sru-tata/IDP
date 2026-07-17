# pdf_extraction.py

import os
import pdfplumber

def pdf_to_text(pdf_path: str):
    """
    Extracts text from a PDF and writes it into a text file with the same name
    in the same directory.
    """
    try:
        base_name = os.path.splitext(os.path.basename(pdf_path))[0]
        txt_path = os.path.join(os.path.dirname(pdf_path), base_name + ".txt")

        with pdfplumber.open(pdf_path) as pdf:
            all_text = ""
            for page_num, page in enumerate(pdf.pages, start=1):
                text = page.extract_text()
                if text:
                    all_text += f"\n--- Page {page_num} ---\n{text}\n"

        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(all_text.strip())

        print(f"✅ Extracted: {pdf_path} → {txt_path}")

    except Exception as e:
        print(f"❌ Error processing {pdf_path}: {e}")


if __name__ == "__main__":
    current_dir = os.getcwd()  # the folder from where you run the script
    for file in os.listdir(current_dir):
        if file.lower().endswith(".pdf"):
            pdf_path = os.path.join(current_dir, file)
            pdf_to_text(pdf_path)
            pass  #------------> remove this line if you want to process more than 1 pdf to text
