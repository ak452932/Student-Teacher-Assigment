import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AppNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole'); // consistent key

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/">GradeApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {role === 'teacher' && (
              <>
                <Nav.Link as={NavLink} to="/teacher-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/grades">Add Grades</Nav.Link>
                <Nav.Link as={NavLink} to="/add-assignment">Add Assignment</Nav.Link>
                <Nav.Link as={NavLink} to="/submissions">View Submissions</Nav.Link>
              </>
            )}
            {role === 'student' && (
              <>
                <Nav.Link as={NavLink} to="/student-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/my-grades">View Grades</Nav.Link>
                <Nav.Link as={NavLink} to="/my-assignments">Submit Assignment</Nav.Link>
              </>
            )}
            {!role && (
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            )}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}