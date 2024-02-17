import { useEffect } from "react";
import ScoreBreakdown from "./ScoreBreakdown";
const EachResult = ({ result }) => {
  useEffect(() => {
    console.log(result);
  }, []);
  return (
    <div className="result-container">
      <h2>Exam Result</h2>
      <div className="score-section">
        <p>Your Score:</p>
        <p className="score">{result.score}</p>
      </div>
      <ScoreBreakdown breakdown={result.answers} />
    </div>
  );
};

export default EachResult;
