import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole'); // corrected key
    if (token && role === 'teacher') navigate('/teacher-dashboard');
    if (token && role === 'student') navigate('/student-dashboard');
  }, [navigate]);

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { token, role } = res.data;

      // Store token and role using consistent key
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role); // corrected key

      // Redirect based on role
      if (role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        setError('Unknown role received.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;