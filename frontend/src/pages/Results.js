import React, { useEffect, useState } from "react";
import "./../stylings/AllResult.css";
import { getResult } from "../services/result.services";

const AllResult = () => {
  const [result, setResult] = useState(null);
  const AllResult = async () => {
    console.log("in all result");
    try {
      const response = await getResult();
      console.log(response);
      setResult(response.data.results);
    } catch (error) {
      console.error("error while fetching results of all students", error);
    }
  };
  useEffect(() => {
    AllResult();
  }, []);

  if (result === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="result-container">
      <h2>Exam Result</h2>
      <div className="score-section">
        <p className="score">{result.score}</p>
      </div>
      <div className="breakdown-section">
        <ul className="breakdown-list">
          {result.map((item, index) => (
            <li key={index} className="breakdown-item">
              <span className="question-number">{item.student.email}</span>
              {item?.questionare !== null && (
                <span className="question-number1">
                  {item.questionare.subject.name}
                </span>
              )}
              <span className="question-score">{item.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllResult;
