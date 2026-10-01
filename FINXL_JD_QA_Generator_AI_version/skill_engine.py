import json
import re
from collections import Counter
from jd_parser import clean_text, extract_role, extract_sections


def load_skills():
    with open(
        "knowledge/skills.json",
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def count_keyword(text, keyword):
    pattern = r"\b" + re.escape(keyword.lower()) + r"\b"

    return len(
        re.findall(
            pattern,
            text.lower()
        )
    )


def calculate_section_bonus(skill, sections):
    bonus = 0

    required_sections = [
        "required skills",
        "requirements",
        "qualifications"
    ]

    responsibility_sections = [
        "responsibilities"
    ]

    for section in required_sections:
        if section in sections:
            for keyword in skill["keywords"]:
                if keyword.lower() in sections[section].lower():
                    bonus += 3
                    break

    for section in responsibility_sections:
        if section in sections:
            for keyword in skill["keywords"]:
                if keyword.lower() in sections[section].lower():
                    bonus += 2
                    break

    return bonus


def extract_skills(jd_text):

    skills_data = load_skills()

    cleaned_text = clean_text(jd_text)

    sections = extract_sections(jd_text)

    detected_skills = []

    for skill_id, skill in skills_data.items():

        total_matches = 0
        matched_keywords = []

        for keyword in skill["keywords"]:

            count = count_keyword(
                cleaned_text,
                keyword
            )

            if count > 0:
                total_matches += count
                matched_keywords.append(keyword)

        if total_matches == 0:
            continue

        frequency_score = (
            total_matches * skill.get("weight", 1)
        )

        section_bonus = calculate_section_bonus(
            skill,
            sections
        )

        total_score = (
            frequency_score +
            section_bonus
        )

        if total_score >= 8:
            priority = "High"

        elif total_score >= 4:
            priority = "Medium"

        else:
            priority = "Low"

        detected_skills.append({
            "id": skill_id,
            "name": skill["name"],
            "matches": total_matches,
            "matched_keywords": matched_keywords,
            "score": total_score,
            "priority": priority
        })

    detected_skills.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return {
        "job_role": extract_role(jd_text),
        "skills": detected_skills
    }