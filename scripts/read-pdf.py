import sys
from pypdf import PdfReader

def extract_pdf(filepath):
    print(f"\n--- CONTENT OF {filepath} ---")
    try:
        reader = PdfReader(filepath)
        for page in reader.pages:
            print(page.extract_text() or '')
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

if __name__ == "__main__":
    extract_pdf(r"C:\Users\Lenovo\Documents\Work\888232 IPM\Group project\Website\Novel_N_Comic_Web\novel-comic-web\Infrastructure Design\662415024-888343-Relational Model.pdf")
    extract_pdf(r"C:\Users\Lenovo\Documents\Work\888232 IPM\Group project\Website\Novel_N_Comic_Web\novel-comic-web\Infrastructure Design\662415024-888343-ER Diagram.pdf")
