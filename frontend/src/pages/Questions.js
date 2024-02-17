import React, { useState } from "react";
import { useEffect } from "react";
import "../stylings/TeacherDashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import QuestionFormReuse from "../components/Teacher/QuestionFormReuse";
import { createQuestion } from "../services/questionare.services";
import { getSubject } from "../services/question.services";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../services/user.services";
const AddQuestionToSubject = () => {
  const [subject, setSubject] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [numberCarry, setNumberCarry] = useState("");
  const [ans, setAns] = useState("");
  const navigate = useNavigate();
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleAnsChange = (event) => {
    setAns(event.target.value);
  };
  const handleNewQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };
  const handleNewNumberCarry = (event) => {
    setNumberCarry(event.target.value);
  };
  const handleOptionChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = event.target.value;
    setOptions(updatedOptions);
  };
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const handleCheckboxChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].isCorrect = event.target.checked;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = (currentType) => {
    let newQuestionData;
    if (currentType === "MCQ") {
      if (options === "" || newQuestion === "" || numberCarry === "") {
        toast.error("Please fill in all the required fields.");
        return;
      }
      if (isNaN(Number(numberCarry))) {
        toast.error("Number of each question must be a valid number.");
        return;
      }
      const newOptions = options.map((option) => ({
        text: option.text.trim(),
        isCorrect: option.isCorrect,
      }));

      newQuestionData = {
        questionType: "MCQ",
        text: newQuestion.trim(),
        subjectId: subject,
        numberCarry: Number(numberCarry),
        options: newOptions.filter((option) => option.text !== ""),
      };
    } else {
      if (ans === "" || newQuestion === "" || numberCarry === "") {
        toast.error("Please fill in all the required fields.");
        return;
      }
      if (isNaN(Number(numberCarry))) {
        toast.error("Number of each question must be a valid number.");
        return;
      }
      newQuestionData = {
        questionType: "Text",
        text: newQuestion.trim(),
        subjectId: subject,
        numberCarry: Number(numberCarry),
        answer: ans,
      };
    }
    setQuestions([...questions, newQuestionData]);
    setNumberCarry(1);
    setNewQuestion("");
    setAns("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };
  const handleSubmitQuestions = async () => {
    try {
      const response = await createQuestion(questions, subject);
      if (response) {
        console.log("successfully submitted the questions");
        toast("successfully submitted the questions");
        navigate("/teacherdashboard");
      }
    } catch (error) {
      console.error("error while submitting the questions", error);
    }
  };
  const fetchSubjects = async () => {
    try {
      const user = await getUserData();
      // console.log(userId);
      const teacherId = user._id;
      const response = await getSubject(teacherId);
      console.log("the response of all subject is: ", response.subjects);
      setAllSubjects(response.data.subjects);
      //   console.log("here is the subjects", response.data.name);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, []);
  return (
    <div className="teacher-dashboard">
      <div className="questionnaire">
        <h2>Add Questions to Existing Questionare</h2>

        {allSubjects.length > 0 ? (
          <div className="subject-select">
            <label className="question-label">Select Subject:</label>
            <select className="select-dropdown" onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {allSubjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Loading subjects...</p>
        )}

        <QuestionFormReuse
          newQuestion={newQuestion}
          handleNewQuestionChange={handleNewQuestionChange}
          numberCarry={numberCarry}
          handleNewNumberCarry={handleNewNumberCarry}
          options={options}
          handleOptionChange={handleOptionChange}
          handleCheckboxChange={handleCheckboxChange}
          handleAddQuestion={handleAddQuestion}
          questions={questions}
          handleDeleteQuestion={handleDeleteQuestion}
          answer={ans}
          handleAnswer={handleAnsChange}
        />

        <button onClick={handleSubmitQuestions} className="submit-button">
          Submit these questions
        </button>
      </div>
    </div>
  );
};

export default AddQuestionToSubject;
