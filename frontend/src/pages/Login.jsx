import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (isAdminLogin && user.role !== 'admin') {
        setError('You do not have admin privileges');
        return;
      }
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel fade-in">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${!isAdminLogin ? 'active' : ''}`}
            onClick={() => setIsAdminLogin(false)}
          >
            User Login
          </button>
          <button
            className={`auth-tab ${isAdminLogin ? 'active' : ''}`}
            onClick={() => setIsAdminLogin(true)}
          >
            Admin Login
          </button>
        </div>

        <h2 className="auth-title">{isAdminLogin ? 'Admin Portal' : 'Welcome Back'}</h2>
        <p className="auth-subtitle">
          {isAdminLogin ? 'Login to manage the platform' : 'Sign in to access your bookings'}
        </p>

        {error && <p className="error-message">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder={isAdminLogin ? "admin@travel.com" : "you@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={`btn btn-full ${isAdminLogin ? 'btn-secondary' : 'btn-primary'}`}>
            {isAdminLogin ? 'Access Admin Panel' : 'Sign In'}
          </button>
        </form>

        {!isAdminLogin && (
          <p className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
