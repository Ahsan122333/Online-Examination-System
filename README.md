# Online-Examination-System

This project is an Online Exam System that facilitates the creation, management, and taking of exams in an educational setting. It provides features for administrators, teachers, and students to manage and participate in online exams.
Table of Contents

    Introduction
    Features
    Technologies Used
    Setup
    User Roles
    Functionality
    Getting Started
    Contributors
    License

Introduction

The Online Exam System is designed to streamline the exam process for educational institutions. It allows teachers to create exams, students to take exams online, and administrators to manage user roles, approve questionnaires, and review exam outcomes.
Features

    User Authentication and Authorization
    User Roles: Admin, Teacher, Student
    Profile Picture for Students
    Exam Creation with Multiple Choice and Text-Based Questions
    Exam Scheduling and Expiry
    Questionnaire Approval Workflow
    Real-time Exam Scoring
    Question Navigation for Students
    Detailed Exam Result Breakdown

Technologies Used

    Backend: Node.js, Express.js
    Frontend: React.js
    Database: MongoDB
    Authentication: JSON Web Tokens (JWT)
    Styling: CSS

User Roles
Admin

    Can register other roles (Teacher, Student)
    Approve Questionnaires provided by Teachers
    Cancel exams before their starting time
    Review answers and scores of all exam outcomes
    View student exams

Teacher

    Create questionnaires (exams) with Multiple Choice and Text-Based Questions
    Remove questions from questionnaires
    Request approval for questionnaires
    Review  scores of exam outcomes
    Schedule start and expiry dates for exams
    Assign scores to each question

Student

    Take active exams
    View one question at a time
    Cannot skip questions or go back
    View exam breakdown of scores at the end
    Have a basic profile with picture and  name

Functionality

The Online Exam System provides the following functionality:

    User registration and login
    Profile management (for students)
    Exam creation by teachers
    Exam approval by admins
    Real-time exam taking and scoring
    Exam result breakdown for students

dependencies to install
for backend:
"@sendgrid/mail": "^7.7.0",
"bcrypt": "^5.1.0",
"cloudinary": "^1.40.0",
"cors": "^2.8.5",
"crypto-js": "^4.1.1",
"crypto.js": "^3.1.1",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.1",
"mongoose": "^7.4.3",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1",
"nodemailer": "^6.9.4"

    for frontend:
        "@cloudinary/react": "^1.11.2",
    "@cloudinary/url-gen": "^1.11.1",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.4.0",
    "cloudinary": "^1.40.0",
    "crypto-browserify": "^3.12.0",
    "crypto-js": "^4.1.1",
    "formik": "^2.4.3",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.3",
    "web-vitals": "^2.1.4"
