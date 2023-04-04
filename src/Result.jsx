import React from "react";

const Result = ({ questions, result }) => {
  const refresh = () => window.location.reload();

  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Question: <span>{questions.length}</span>
      </p>
      <p>
        Total Score:<span style={{ fontSize: "30px" }}> {result.score}%</span>
      </p>
      <p>
        Correct Answers:<span> {result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers:<span> {result.wrongAnswers}</span>
      </p>
      <div>
        <button onClick={refresh}>Restart Quiz</button>
      </div>
    </div>
  );
};

export default Result;
