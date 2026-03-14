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
      {/* Left Column - Login Form */}
      <div className="login-left">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Enter your username"
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-options">
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button">Login</button>
          </form>
          
          <div className="signup-link">
            <span>Don't have an account? </span>
            <a href="#" className="signup-text">Sign up</a>
          </div>
        </div>
      </div>
      
      {/* Right Column - Welcome Content */}
      <div className="login-right">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to student portal</h1>
          <p className="welcome-subtitle">Login to access your account</p>
          
          {/* Lottie Animation Placeholder */}
          <div className="animation-container" id="lottie-animation">
            {/* This is where the Lottie animation will be loaded */}
            <div className="animation-placeholder">
              <div className="placeholder-content">
                <div className="person person-left"></div>
                <div className="document"></div>
                <div className="laptop"></div>
                <div className="person person-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
