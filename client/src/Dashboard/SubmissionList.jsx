import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SubmissionList({ assignmentId }) {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  // Fetch submissions for the given assignment
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/assignments/${assignmentId}/submissions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSubmissions(res.data); // or res.data.submissions if backend wraps it
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError('Failed to load submissions');
    }
  };

  // Mark a submission as reviewed
  const markReviewed = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/assignments/${id}/review`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchSubmissions(); // Refresh the list
    } catch (err) {
      console.error('Error marking reviewed:', err);
      setError('Failed to update submission');
    }
  };

  useEffect(() => {
    if (assignmentId) {
      fetchSubmissions();
    }
  }, [assignmentId]);

  return (
    <div className="mt-3">
      <h6>Submissions</h6>
      {error && <p className="text-danger">{error}</p>}
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map((s) => (
          <div key={s._id} className="border p-2 mb-2">
            <p><strong>Student:</strong> {s.student.name}</p>
            <p><strong>Answer:</strong> {s.answer}</p>
            <p><strong>Date:</strong> {new Date(s.submittedAt).toLocaleString()}</p>
            <p><strong>Reviewed:</strong> {s.reviewed ? 'Yes' : 'No'}</p>
            {!s.reviewed && (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => markReviewed(s._id)}
              >
                Mark Reviewed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}