import React, { useState } from 'react';
import axios from 'axios';

export default function AssignmentForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/assignments', {
        title,
        description,
        dueDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Assignment created successfully.');
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating assignment.');
    }
  };

  return (
    <div>
      <h4>Create Assignment</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <input className="form-control mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="form-control mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="date" className="form-control mb-2" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
    </div>
  );
}