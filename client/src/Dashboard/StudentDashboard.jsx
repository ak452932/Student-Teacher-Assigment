import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Read token and role once on mount
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole'); // use consistent key

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token || role !== 'student') {
      navigate('/');
    }
  }, [navigate]); // ✅ removed token from dependency array

  // Fetch published assignments and student submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignmentsRes, submissionsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/assignments/published', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/submissions/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAssignments(assignmentsRes.data);

        const submissionMap = {};
        submissionsRes.data.forEach((sub) => {
          if (sub.assignment && sub.assignment.status === 'Published') {
            submissionMap[sub.assignment._id] = sub.answer;
          }
        });
        setSubmissions(submissionMap);
      } catch (err) {
        console.error('Error loading dashboard:', err);
        setError('Failed to load data');
      }
    };

    if (token && role === 'student') {
      fetchData();
    }
  }, [role, token]); // ✅ safe to include here

  const handleSubmit = async (assignmentId) => {
    const answer = answers[assignmentId];
    if (!answer) return;

    try {
      await axios.post(
        'http://localhost:5000/api/submissions',
        { assignment: assignmentId, answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmissions((prev) => ({ ...prev, [assignmentId]: answer }));
      setAnswers((prev) => ({ ...prev, [assignmentId]: '' }));
    } catch (err) {
      console.error('Submission error:', err);
      setError('Submission failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {assignments.length === 0 ? (
        <p>No published assignments available.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment._id} className="card mb-3 p-3 shadow-sm">
            <h5>{assignment.title}</h5>
            <p>{assignment.description}</p>
            {assignment.dueDate && (
              <p>
                <strong>Due:</strong>{' '}
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            )}

            {submissions[assignment._id] ? (
              <div>
                <strong>Your Submitted Answer:</strong>
                <p className="border p-2 bg-light">{submissions[assignment._id]}</p>
              </div>
            ) : (
              <div>
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  placeholder="Write your answer here..."
                  value={answers[assignment._id] || ''}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [assignment._id]: e.target.value,
                    }))
                  }
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(assignment._id)}
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}