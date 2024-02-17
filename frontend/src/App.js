/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import AuthPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import QuestionareCreate from "./pages/Questionare";
import AddQuestionToSubject from "./pages/Questions";
import AllResult from "./pages/Results";
import StartExam from "./pages/StartExam";
import { ToastContainer } from "react-toastify";
import SubjectCreate from "./pages/Subject";
import "react-toastify/dist/ReactToastify.css";
// import AuthHOC from "./components/AuthHOC";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/add" element={<AddQuestionToSubject />} />
        <Route path="/questionare" element={<QuestionareCreate />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/startexam" element={<StartExam />} />
        <Route path="/results" element={<AllResult />} />
        <Route path="/subjectcreate" element={<SubjectCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
