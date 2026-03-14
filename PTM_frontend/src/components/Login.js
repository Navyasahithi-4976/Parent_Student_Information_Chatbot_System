import React, { useState } from 'react';
import './Login.css';

const Login = ({ goToChat }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login attempt:', formData);
      goToChat();   // move to chatbot page
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background Orbs */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="left-column">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">🎓</div>
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Sign in to access your child's academic journey</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "error" : ""}
                  placeholder="Enter your username"
                />
                <span className="input-icon">👤</span>
              </div>
              {errors.username && (
                <span className="error-message">
                  ⚠️ {errors.username}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter your password"
                />
                <span className="input-icon">🔒</span>
              </div>
              {errors.password && (
                <span className="error-message">
                  ⚠️ {errors.password}
                </span>
              )}
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>

            <div className="signup-link">
              Don't have an account? <a href="#">Sign up</a>
            </div>
          </form>
        </div>
      </div>

      <div className="right-column">
        <div className="welcome-section">
          <h1 className="welcome-title">Empowering Education Through Connection</h1>
          <p className="welcome-subtitle">
            Stay connected with your child's academic journey, track progress, and collaborate with educators seamlessly.
          </p>

          <div className="animation-container">
            <div className="animation-card">
              <div className="animation-icon">📊</div>
              <div className="animation-text">Real-time Academic Insights</div>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">📈</div>
                  <div className="feature-text">
                    <div className="feature-title">Performance Tracking</div>
                    <div className="feature-description">Monitor grades and progress</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📅</div>
                  <div className="feature-text">
                    <div className="feature-title">Attendance Reports</div>
                    <div className="feature-description">Stay updated on attendance</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💬</div>
                  <div className="feature-text">
                    <div className="feature-title">Direct Communication</div>
                    <div className="feature-description">Connect with teachers instantly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
