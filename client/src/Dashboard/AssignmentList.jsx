import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssignmentList({ status }) {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  const fetchAssignments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(
        `http://localhost:5000/api/assignments${status ? `?status=${status}` : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssignments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching assignments.');
    }
  };

  const changeStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:5000/api/assignments/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAssignments();
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const deleteAssignment = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAssignments();
    } catch (err) {
      setError('Failed to delete assignment.');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [status]); // ✅ refetch when filter changes

  return (
    <div>
      <h4>Assignments</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        assignments.map((a) => (
          <div key={a._id} className="card mb-3 p-3">
            <h5>{a.title}</h5>
            <p>{a.description}</p>
            <p>Due: {new Date(a.dueDate).toLocaleDateString()}</p>
            <p>Status: {a.status}</p>

            {a.status === 'Draft' && (
              <>
                <button
                  className="btn btn-success me-2"
                  onClick={() => changeStatus(a._id, 'Published')}
                >
                  Publish
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAssignment(a._id)}
                >
                  Delete
                </button>
              </>
            )}

            {a.status === 'Published' && (
              <button
                className="btn btn-warning"
                onClick={() => changeStatus(a._id, 'Completed')}
              >
                Mark Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}