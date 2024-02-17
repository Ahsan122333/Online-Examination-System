import React, { useState } from "react";

const QuestionFormReuse = ({
  newQuestion,
  handleNewQuestionChange,
  numberCarry,
  handleNewNumberCarry,
  options,
  handleOptionChange,
  handleCheckboxChange,
  handleAddQuestion,
  questions,
  handleDeleteQuestion,
  answer,
  handleAnswer,
}) => {
  const [currentType, setCurrentType] = useState("MCQ");
  const types = [
    {
      id: 1,
      name: "MCQ",
    },
    {
      id: 2,
      name: "Text",
    },
  ];

  return (
    <div>
      <div className="subject-select">
        <label className="question-label">Select Type:</label>
        <select
          value={currentType}
          className="select-dropdown"
          onChange={(e) => setCurrentType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type._id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="question-label">Question:</label>
        <input
          type="text"
          value={newQuestion}
          onChange={handleNewQuestionChange}
          className="input-field"
        />
      </div>
      {currentType === "Text" && (
        <>
          <div>
            <label className="question-label">Ans:</label>
            <input
              type="text"
              value={answer}
              onChange={handleAnswer}
              className="input-field"
            />
          </div>
        </>
      )}
      <div>
        <label className="marks-label">Marks of this question:</label>
        <input
          type="text"
          value={numberCarry}
          onChange={handleNewNumberCarry}
          className="input-field"
        />
      </div>
      {currentType !== "Text" && (
        <div className="options-section">
          <label className="options-label">Options:</label>
          {options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="text"
                value={option.text}
                onChange={(event) => handleOptionChange(event, index)}
                className="input-field"
              />
              <label className="correct-label">
                Correct:
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(event) => handleCheckboxChange(event, index)}
                  className="checkbox-field"
                />
              </label>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => handleAddQuestion(currentType)} className="button">
        Add Question
      </button>

      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            <strong>Question:</strong> {question.text}
            <br />
            <strong>Number of this Question:</strong> {question.numberCarry}
            <br />
            <strong>
              {question.questionType === "MCQ" ? "Options:" : "Answer:"}
            </strong>{" "}
            {question.questionType === "MCQ"
              ? question.options.map((option, i) => (
                  <span key={i}>
                    {option.text} {option.isCorrect ? "(Correct)" : ""}
                    {i < question.options.length - 1 && ", "}
                  </span>
                ))
              : question.answer}{" "}
            <br />
            <button
              onClick={() => handleDeleteQuestion(index)}
              className="delete-button"
            >
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionFormReuse;
