import os
import json
import time
from dotenv import load_dotenv
from google import genai


# =========================================================
# LOAD ENVIRONMENT
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

ENV_FILE = os.path.join(
    BASE_DIR,
    ".env"
)

load_dotenv(
    ENV_FILE
)


API_KEY = os.getenv(
    "AI_API_KEY"
)

MODEL = os.getenv(
    "AI_MODEL",
    "gemini-3.8-flash"
)


if not API_KEY:

    raise ValueError(
        "AI_API_KEY not found in .env file."
    )


client = genai.Client(
    api_key=API_KEY
)


# =========================================================
# GEMINI GENERATOR
# =========================================================

def generate_ai_questions(jd_text):

    prompt = f"""
You are an expert interview preparation system for FINXL Finance Corporate Institute.

Analyze the following Job Description and create a comprehensive interview
question and answer bank.

JOB DESCRIPTION:
----------------
{jd_text}
----------------

STRICT REQUIREMENTS:

1. Generate AT LEAST 60 interview questions.

2. The final "questions" array MUST contain 60 OR MORE complete questions.

3. If the Job Description contains enough topics, generate between 60 and 80
   questions.

4. Cover EVERY important skill, responsibility, qualification and domain
   mentioned in the Job Description.

5. Do NOT generate generic questions unrelated to the JD.

6. Avoid duplicate and nearly identical questions.

7. Generate questions across different categories:

   - Basic / Fundamental
   - Technical
   - Conceptual
   - Practical
   - Scenario-based
   - Problem-solving
   - Application-based
   - Role-specific
   - Situational
   - Behavioral where relevant

8. Use different difficulty levels:

   - Easy
   - Medium
   - Hard

9. Every question MUST contain a complete and useful suggested answer.

10. Answers should be interview-friendly and understandable to a fresher.

11. For finance-related JDs, cover relevant topics such as:

   - Financial Modeling
   - Advanced Excel
   - Accounting
   - Financial Statements
   - Income Statement
   - Balance Sheet
   - Cash Flow Statement
   - Financial Ratios
   - Financial Analysis
   - Budgeting
   - Forecasting
   - Variance Analysis
   - MIS Reporting
   - Financial Planning and Analysis
   - Business Valuation
   - SQL
   - Power BI
   - Tableau
   - Data Analysis
   - Financial Data Interpretation
   - Communication

   Only include topics that are relevant to the supplied JD.

12. Distribute questions across the detected skills instead of generating
    most questions from only one skill.

13. Generate approximately 4-7 questions for each major skill.

14. Include questions based on the actual responsibilities in the JD.

15. Include practical interview scenarios such as:
    "What would you do if..."
    "How would you analyze..."
    "How would you identify..."
    "How would you solve..."

16. Include questions suitable for a Finance Intern / Financial Analyst
    interview where applicable.

17. Do not summarize the JD.

18. Do not explain the generation process.

19. Return ONLY valid JSON.

EXPECTED JSON FORMAT:

{{
    "job_role": "Detected job role",

    "skills": [
        {{
            "name": "Financial Modeling",
            "priority": "High"
        }},
        {{
            "name": "Advanced Excel",
            "priority": "High"
        }}
    ],

    "total_questions": 60,

    "questions": [
        {{
            "skill": "Financial Modeling",
            "skill_priority": "High",
            "difficulty": "Easy",
            "type": "Technical",
            "question": "What is financial modeling?",
            "answer": "A clear and interview-ready answer."
        }}
    ]
}}

FINAL CONDITION:

The "questions" array MUST contain AT LEAST 60 complete question-answer
objects.

Do not stop at 10, 20, 30, 40 or 50 questions.

Generate 60+ questions before returning the response.
"""


    # =====================================================
    # RETRY LOGIC
    # =====================================================

    max_retries = 3

    for attempt in range(
        max_retries
    ):

        try:

            print(
                f"Gemini attempt {attempt + 1}/{max_retries}"
            )

            response = client.models.generate_content(

                model=MODEL,

                contents=prompt

            )


            # -------------------------------------------------
            # GET RESPONSE TEXT
            # -------------------------------------------------

            text = response.text.strip()


            # Remove markdown JSON fences if Gemini adds them

            if text.startswith(
                "```json"
            ):

                text = text[
                    len("```json"):
                ]


            if text.startswith(
                "```"
            ):

                text = text[
                    len("```"):
                ]


            if text.endswith(
                "```"
            ):

                text = text[
                    :-3
                ]


            text = text.strip()


            # -------------------------------------------------
            # PARSE JSON
            # -------------------------------------------------

            result = json.loads(
                text
            )


            # -------------------------------------------------
            # VALIDATE QUESTIONS
            # -------------------------------------------------

            questions = result.get(
                "questions",
                []
            )


            valid_questions = []

            for question in questions:

                if not isinstance(
                    question,
                    dict
                ):
                    continue

                q = question.get(
                    "question",
                    ""
                ).strip()

                answer = question.get(
                    "answer",
                    ""
                ).strip()


                if q and answer:

                    valid_questions.append(
                        question
                    )


            result["questions"] = (
                valid_questions
            )


            result["total_questions"] = len(
                valid_questions
            )


            # -------------------------------------------------
            # CHECK MINIMUM
            # -------------------------------------------------

            if len(
                valid_questions
            ) < 20:

                print(
                    f"Gemini returned only "
                    f"{len(valid_questions)} questions."
                )

                # Do not immediately fail.
                # Retry so Gemini can produce more.

                if attempt < max_retries - 1:

                    print(
                        "Retrying for more questions..."
                    )

                    time.sleep(
                        2
                    )

                    continue


            print(
                f"Gemini generated "
                f"{len(valid_questions)} questions."
            )


            return result


        except json.JSONDecodeError as e:

            print(
                "Gemini returned invalid JSON:"
            )

            print(
                str(e)
            )


        except Exception as e:

            error_text = str(e)

            print(
                "Gemini error:",
                error_text
            )


            if attempt < max_retries - 1:

                time.sleep(
                    2 ** attempt
                )

            else:

                raise


    raise RuntimeError(
        "Gemini could not generate a valid interview question set."
    )