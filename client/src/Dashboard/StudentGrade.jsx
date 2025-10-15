import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentGrades.css'; // Custom styles

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', subject: '', mark: '' });
  const [editId, setEditId] = useState(null);
  const role = localStorage.getItem('userRole'); // Get role from localStorage

  const fetchGrades = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/grades');
      setGrades(res.data);
    } catch (err) {
      setError('Failed to load grades');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== 'teacher') return; // Restrict students
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/grades/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/grades', formData);
      }
      setFormData({ name: '', subject: '', mark: '' });
      setEditId(null);
      setShowForm(false);
      fetchGrades();
    } catch (err) {
      setError('Failed to submit grade');
    }
  };

  const handleEdit = (grade) => {
    if (role !== 'teacher') return; // Restrict students
    setFormData({ name: grade.name, subject: grade.subject, mark: grade.mark });
    setEditId(grade._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (role !== 'teacher') return; // Restrict students
    try {
      await axios.delete(`http://localhost:5000/api/grades/${id}`);
      fetchGrades();
    } catch (err) {
      setError('Failed to delete entry');
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <div className="container mt-4 position-relative">
      <h3 className="mb-3">Student Grades</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Mark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g._id}>
              <td>{g.name}</td>
              <td>{g.subject}</td>
              <td>{g.mark}</td>
              <td>
                {role === 'teacher' ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => handleEdit(g)}>Edit</button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => handleDelete(g._id)}>Delete</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <span className="text-muted">View Only</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Floating Add Button (only for teachers) */}
      {role === 'teacher' && (
        <button className="btn btn-primary add-button" onClick={() => setShowForm(true)}>＋</button>
      )}

      {/* Modal Form (only for teachers) */}
      {showForm && role === 'teacher' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>{editId ? 'Edit Grade' : 'Add Grade'}</h5>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} required />
              <input type="number" name="mark" placeholder="Mark" value={formData.mark} onChange={handleInputChange} required />
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-success">{editId ? 'Update' : 'Submit'}</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}