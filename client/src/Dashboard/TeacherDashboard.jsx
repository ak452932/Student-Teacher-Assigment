import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentForm from './AssignmentForm';
import AssignmentList from './AssignmentList';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Teacher Dashboard</h2>
        {/* <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button> */}
      </div>

      <AssignmentForm />
      <hr />

      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
        <select
          id="statusFilter"
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <AssignmentList status={statusFilter} />
    </div>
  );
}