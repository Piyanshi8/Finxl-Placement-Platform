import re


def read_jd(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


def clean_text(text):
    text = text.replace("\r", "\n")

    # Convert bullets to spaces
    text = re.sub(r"[•▪●]", " ", text)

    # Remove excessive whitespace
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def extract_role(text):
    patterns = [
        r"Role\s*:\s*(.+?)(?:\.|,|\n|$)",
        r"Position\s*:\s*(.+?)(?:\.|,|\n|$)",
        r"Job Title\s*:\s*(.+?)(?:\.|,|\n|$)",
        r"Designation\s*:\s*(.+?)(?:\.|,|\n|$)"
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            return match.group(1).strip()

    return "Unknown Role"


def extract_sections(text):
    sections = {}

    headings = [
        "responsibilities",
        "required skills",
        "requirements",
        "qualifications",
        "preferred skills",
        "preferred qualifications",
        "job description"
    ]

    for heading in headings:
        pattern = rf"{heading}\s*:\s*(.*?)(?=\b(?:{'|'.join(headings)})\s*:|$)"

        match = re.search(
            pattern,
            text,
            re.IGNORECASE
        )

        if match:
            sections[heading] = match.group(1).strip()

    return sections