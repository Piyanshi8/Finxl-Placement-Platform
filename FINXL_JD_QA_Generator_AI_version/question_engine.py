import json


def load_questions():

    with open(
        "knowledge/questions.json",
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def get_question_count(score):

    if score >= 8:
        return 5

    elif score >= 4:
        return 3

    else:
        return 2


def difficulty_order(score):

    if score >= 8:
        return ["Easy", "Medium", "Hard"]

    elif score >= 4:
        return ["Easy", "Medium"]

    else:
        return ["Easy"]


def select_questions(skill, question_bank, used_questions):

    skill_id = skill["id"]

    available = question_bank.get(
        skill_id,
        []
    )

    required_count = get_question_count(
        skill["score"]
    )

    difficulty_levels = difficulty_order(
        skill["score"]
    )

    selected = []

    # First select according to difficulty
    for difficulty in difficulty_levels:

        for item in available:

            question = item["question"]

            if question in used_questions:
                continue

            if item["difficulty"] == difficulty:

                selected.append({
                    "skill": skill["name"],
                    "skill_priority": skill["priority"],
                    "score": skill["score"],
                    "difficulty": item["difficulty"],
                    "type": item["type"],
                    "question": item["question"],
                    "answer": item["answer"]
                })

                used_questions.add(question)

                if len(selected) >= required_count:
                    return selected

    return selected


def generate_questions(analysis):

    question_bank = load_questions()

    all_questions = []

    used_questions = set()

    for skill in analysis["skills"]:

        questions = select_questions(
            skill,
            question_bank,
            used_questions
        )

        all_questions.extend(
            questions
        )

    return all_questions