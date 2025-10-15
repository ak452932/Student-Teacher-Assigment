import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './LoginDetail/Login';
import Signup from './LoginDetail/Signup';
import TeacherDashboard from './Dashboard/TeacherDashboard';
import StudentDashboard from './Dashboard/StudentDashboard';
import StudentGrade from './Dashboard/StudentGrade';
import AssignmentForm from './Dashboard/AssignmentForm';
import AssignmentList from './Dashboard/AssignmentList';
import SubmissionList from './Dashboard/SubmissionList';
import Navbar from './Dashboard/Navbar';

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/grades" element={<StudentGrade />} />
        <Route path="/add-assignment" element={<AssignmentForm />} />
        <Route path="/my-assignments" element={<AssignmentList />} />
        <Route path="/my-grades" element={<StudentGrade />} />
        <Route path="/submissions" element={<SubmissionList />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}