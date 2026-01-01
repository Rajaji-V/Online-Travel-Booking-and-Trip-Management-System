import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import './Login.css'; // Reuse styles

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card glass-panel fade-in">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join us and start your journey</p>

        <form className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User className="input-icon" size={18} />
              <input type="text" placeholder="John Doe" />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input type="password" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
