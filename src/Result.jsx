import React from "react";

const Result = ({ questions, result }) => {
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Question: <span>{questions.length}</span>
      </p>
      <p>
        Total Score:<span> {result.score}</span>
      </p>
      <p>
        Correct Answers:<span> {result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers:<span> {result.wrongAnswers}</span>
      </p>
    </div>
  );
};

export default Result;
