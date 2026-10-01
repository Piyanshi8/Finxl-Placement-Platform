import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:5000";

function App() {
  const [jdText, setJdText] = useState("");
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("rule");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!jdText.trim() && !file) {
      setError("Please paste a Job Description or upload a file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();

    formData.append("jd_text", jdText);
    formData.append("mode", mode);

    if (file) {
      formData.append("jd_file", file);
    }

    try {
      const response = await fetch(API_URL + "/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Generation failed.");
        return;
      }

      setResult(data.data);

      setTimeout(() => {
        const resultSection = document.getElementById("results");

        if (resultSection) {
          resultSection.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    } catch (err) {
      setError(
        "Unable to connect to Flask. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setJdText("");
    setFile(null);
    setResult(null);
    setError("");

    const input = document.getElementById("fileInput");

    if (input) {
      input.value = "";
    }
  };

  const getSkillName = (skill) => {
    if (typeof skill === "string") {
      return skill;
    }

    return skill && skill.name ? skill.name : "Unknown";
  };

  const skills =
    result && Array.isArray(result.skills)
      ? result.skills
      : [];

  const questions =
    result && Array.isArray(result.questions)
      ? result.questions
      : [];

  return (
    <div className="app">

      {/* HEADER */}
      <header className="navbar">
        <div className="logo">
          FIN<span>XL</span>
        </div>

        <div className="headerBadge">
          AI Interview Preparation
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="hero">

          <div className="heroMain">

            <div className="eyebrow">
              FINANCIAL CAREER INTELLIGENCE
            </div>

            <h1>
              Turn Financial JDs into
              <span> Interview Preparation</span>
            </h1>

            <p>
              Analyze a financial job description and generate
              role-specific skills, interview questions and
              suggested answers.
            </p>

          </div>

          <div className="workflowCard">

            <h3>How it works</h3>

            <div className="workflowItem">
              <b>01</b>
              Analyze Job Description
            </div>

            <div className="workflowItem">
              <b>02</b>
              Detect Financial Skills
            </div>

            <div className="workflowItem">
              <b>03</b>
              Generate Questions
            </div>

            <div className="workflowItem">
              <b>04</b>
              Prepare Answers
            </div>

          </div>

        </section>

        {/* INPUT */}
        <section className="panel">

          <div className="panelHeader">

            <div>
              <h2>Job Description</h2>

              <p>
                Paste a financial JD or upload a document.
              </p>
            </div>

            <div className="modeSwitch">

              <button
                type="button"
                className={mode === "rule" ? "active" : ""}
                onClick={() => setMode("rule")}
              >
                Rule Engine
              </button>

              <button
                type="button"
                className={mode === "gemini" ? "active" : ""}
                onClick={() => setMode("gemini")}
              >
                ✦ Gemini AI
              </button>

            </div>

          </div>

          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder={
              "Paste the financial job description here...\n\n" +
              "Example:\n" +
              "Financial Analyst required to support budgeting, " +
              "forecasting, financial reporting and financial modelling."
            }
          />

          {/* FILE UPLOAD */}
          <div className="uploadArea">

            <label className="uploadButton">

              📎 Upload JD

              <input
                id="fileInput"
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setFile(selectedFile || null);
                }}
              />

            </label>

            <span>
              {file
                ? file.name
                : "Supported formats: TXT, PDF, DOCX"}
            </span>

          </div>

          {/* ERROR */}
          {error && (
            <div className="error">
              ⚠ {error}
            </div>
          )}

          {/* ACTIONS */}
          <div className="actions">

            <button
              type="button"
              className="clearButton"
              onClick={clearAll}
            >
              Clear
            </button>

            <button
              type="button"
              className="generateButton"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading
                ? "Analyzing..."
                : "Generate Interview Q&A →"}
            </button>

          </div>

        </section>

        {/* LOADING */}
        {loading && (
          <div className="loading">

            <div className="spinner"></div>

            <p>
              Analyzing your Job Description...
            </p>

          </div>
        )}

        {/* RESULTS */}
        {result && (
          <section id="results">

            {/* STATS */}
            <div className="stats">

              <div className="statCard">

                <small>
                  JOB ROLE
                </small>

                <strong>
                  {result.job_role || "Unknown"}
                </strong>

              </div>

              <div className="statCard">

                <small>
                  SKILLS DETECTED
                </small>

                <strong>
                  {skills.length}
                </strong>

              </div>

              <div className="statCard">

                <small>
                  QUESTIONS
                </small>

                <strong>
                  {result.total_questions || questions.length}
                </strong>

              </div>

            </div>

            {/* SKILLS */}
            <div className="panel">

              <h2>
                Detected Financial Skills
              </h2>

              <div className="skills">

                {skills.length > 0 ? (

                  skills.map((skill, index) => (
                    <span key={index}>
                      {getSkillName(skill)}
                    </span>
                  ))

                ) : (

                  <span>
                    No specific skills detected
                  </span>

                )}

              </div>

            </div>

            {/* QUESTIONS */}
            <div className="panel">

              <div className="panelHeader">

                <div>

                  <h2>
                    Interview Questions & Answers
                  </h2>

                  <p>
                    Questions generated according to
                    the selected JD.
                  </p>

                </div>

              </div>

              <div className="questions">

                {questions.length > 0 ? (

                  questions.map((item, index) => (

                    <div
                      className="questionCard"
                      key={index}
                    >

                      <div className="questionHeader">

                        <div className="questionNumber">
                          Q{String(index + 1).padStart(2, "0")}
                        </div>

                        <h3>
                          {item.question || "Question unavailable"}
                        </h3>

                      </div>

                      <div className="metadata">

                        <span>
                          Skill: {item.skill || "General"}
                        </span>

                        <span>
                          Difficulty: {item.difficulty || "Easy"}
                        </span>

                        <span>
                          Type: {item.type || "Interview"}
                        </span>

                      </div>

                      <div className="answer">

                        <strong>
                          SUGGESTED ANSWER
                        </strong>

                        <p>
                          {item.answer ||
                            "No answer available."}
                        </p>

                      </div>

                    </div>

                  ))

                ) : (

                  <p>
                    No questions were generated.
                  </p>

                )}

              </div>

              {/* DOWNLOAD */}
              <div className="downloadSection">

                <h2>
                  Download Preparation Material
                </h2>

                <p>
                  Export your interview preparation.
                </p>

                <div className="downloads">

                  <a href={API_URL + "/download/pdf"}>
                    📄 PDF
                  </a>

                  <a href={API_URL + "/download/docx"}>
                    📝 DOCX
                  </a>

                  <a href={API_URL + "/download/txt"}>
                    📃 TXT
                  </a>

                </div>

              </div>

            </div>

          </section>
        )}

      </main>

      <footer>
        FINXL JD Interview Preparation Generator
      </footer>

    </div>
  );
}

export default App;

