import os
from pypdf import PdfReader
from docx import Document


def extract_txt(file):
    """
    Extract text from TXT file.
    """

    content = file.read()

    return content.decode(
        "utf-8",
        errors="ignore"
    )


def extract_pdf(file):
    """
    Extract text from PDF file.
    """

    reader = PdfReader(file)

    pages = []

    for page in reader.pages:

        text = page.extract_text()

        if text:
            pages.append(text)

    return "\n".join(pages)


def extract_docx(file):
    """
    Extract text from DOCX file.
    """

    document = Document(file)

    paragraphs = []

    for paragraph in document.paragraphs:

        if paragraph.text.strip():
            paragraphs.append(
                paragraph.text
            )

    return "\n".join(paragraphs)


def extract_text_from_file(file):

    filename = file.filename.lower()

    extension = os.path.splitext(
        filename
    )[1]

    if extension == ".txt":

        return extract_txt(file)

    elif extension == ".pdf":

        return extract_pdf(file)

    elif extension == ".docx":

        return extract_docx(file)

    else:

        raise ValueError(
            "Unsupported file format. "
            "Please upload TXT, PDF, or DOCX."
        )