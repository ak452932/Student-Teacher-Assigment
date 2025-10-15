import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    setSuccess('');

    // Basic validation
    if (!email || !password || !role) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
        email,
        password,
        role,
      });

      if (res.status === 201) {
        setSuccess('Signup successful! Please login to continue.');
        setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Sign Up</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group mb-4">
          <label>Role</label>
          <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button className="btn btn-success w-100" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;