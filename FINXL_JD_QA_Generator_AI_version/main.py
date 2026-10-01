import json
import os

from jd_parser import read_jd
from skill_engine import extract_skills
from question_engine import generate_questions


INPUT_FILE = "sample_jd.txt"
OUTPUT_DIR = "output"


def save_json(data):

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    output_file = os.path.join(
        OUTPUT_DIR,
        "questions.json"
    )

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )

    return output_file


def main():

    print("\n===================================")
    print(" FINXL Dynamic JD Q&A Generator")
    print(" Rule-Based Version")
    print("===================================\n")

    print("Reading Job Description...")

    jd = read_jd(
        INPUT_FILE
    )

    print("Analyzing JD...")

    analysis = extract_skills(
        jd
    )

    print("\nJob Role:")
    print(
        analysis["job_role"]
    )

    print("\nDetected Skills:")

    for skill in analysis["skills"]:

        print(
            f"  {skill['name']} "
            f"| Score: {skill['score']} "
            f"| Priority: {skill['priority']}"
        )

    print("\nGenerating questions...")

    questions = generate_questions(
        analysis
    )

    result = {
        "job_role": analysis["job_role"],
        "skills": analysis["skills"],
        "total_questions": len(questions),
        "questions": questions
    }

    output_file = save_json(
        result
    )

    print(
        f"\nGenerated {len(questions)} questions."
    )

    print(
        f"Output saved to: {output_file}"
    )

    print("\n===================================")
    print(" Generation Completed")
    print("===================================\n")


if __name__ == "__main__":
    main()