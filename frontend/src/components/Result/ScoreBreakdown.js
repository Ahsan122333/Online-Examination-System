/* eslint-disable react/prop-types */
import React from "react";

const ScoreBreakdown = ({ breakdown }) => {
  console.log(breakdown, "bk");
  return (
    <div className="score-breakdown">
      <h3>Breakdown:</h3>
      <ul className="breakdown-list">
        {breakdown?.map((item, index) => (
          <li key={index} className="breakdown-item">
            <span className="question-number">{index}</span>
            <span className="question-score">{item.question.marksCarry}</span>
            <span className="question-score">
              {item.isCorrect ? "Correct" : "Incorrect"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBreakdown;
