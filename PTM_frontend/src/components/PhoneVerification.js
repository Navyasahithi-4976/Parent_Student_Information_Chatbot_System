import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import './PhoneVerification.css';
import { API_BASE_URL } from "../apiConfig";
import OTPInput from './OTPInput';

const PhoneVerification = ({ goToDashboard }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const otpTimerRef = useRef(null);

  // Check if user was previously verified
  useEffect(() => {
    // Clear old verification data to start fresh
    localStorage.removeItem('phoneVerified');
    localStorage.removeItem('otpVerified');
    localStorage.removeItem('studentVerified');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('registrationNumber');
    
    // Always start from step 1
    setStep(1);
    setIsVerified(false);
  }, []);

  // OTP Timer
  useEffect(() => {
    if (otpTimer > 0 && !canResendOtp) {
      otpTimerRef.current = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
    }
    return () => clearTimeout(otpTimerRef.current);
  }, [otpTimer, canResendOtp]);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const validateRegistrationNumber = (regNumber) => {
    return /^\d{10}$/.test(regNumber);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Send OTP directly after phone number validation
      await sendOTP();
      setStep(2); // Go to OTP step
    } catch (err) {
      // For development, proceed to OTP step
      await sendOTP();
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateRegistrationNumber(registrationNumber)) {
      setError('Student registration number must be exactly 10 digits');
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      const response = await fetch(`${API_BASE_URL}/verify-student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          registrationNumber
        }),
      });

      if (response.ok || true) { // Mock success
        localStorage.setItem('registrationNumber', registrationNumber);
        localStorage.setItem('studentVerified', 'true');
        setIsVerified(true);
        setStep(4); // Success step
        setTimeout(() => {
          setStep(5); // Show login button
        }, 2000);
      } else {
        setError('Student registration number not found');
      }
    } catch (err) {
      // For development, proceed to success
      localStorage.setItem('registrationNumber', registrationNumber);
      localStorage.setItem('studentVerified', 'true');
      setIsVerified(true);
      setStep(4);
      setTimeout(() => {
        setStep(5);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber
        }),
      });
      
      // Mock OTP for development
      console.log('OTP sent to:', phoneNumber);
    } catch (err) {
      console.log('Mock OTP sent');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          otp
        }),
      });

      if (response.ok || otp === '123456') { // Mock success with 123456
        localStorage.setItem('phoneVerified', 'true');
        localStorage.setItem('userPhone', phoneNumber);
        localStorage.setItem('otpVerified', 'true');
        setStep(3); // Go to student registration number step
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      if (otp === '123456') { // Mock success
        localStorage.setItem('phoneVerified', 'true');
        localStorage.setItem('userPhone', phoneNumber);
        localStorage.setItem('otpVerified', 'true');
        setStep(3); // Go to student registration number step
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResendOtp(false);
    setOtpTimer(60);
    setOtp('');
    await sendOTP();
  };

  const handleLogin = () => {
    console.log('Login button clicked, navigating to dashboard...');
    goToDashboard();
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="verification-container">
      <div className="verification-box">
        <div className="illustration">
          <DotLottieReact
            src="/Live chatbot.lottie"
            loop
            autoplay
            style={{ width: "90%", height: "90%" }}
          />
        </div>

        <div className="verification-form">
          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
            <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>✓</div>
          </div>

          <h2>PTM Portal Verification</h2>
          <p className="subtitle">Verify your identity to access the portal</p>

          {/* Step 1: Phone Number Input */}
          {step === 1 && (
            <form onSubmit={handlePhoneSubmit}>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
              {error && <p className="error">{error}</p>}
            </form>
          )}

          {/* Step 2: OTP Input */}
          {step === 2 && (
            <form onSubmit={handleOTPSubmit}>
              <div className="form-group">
                <label>Enter OTP</label>
                <p className="otp-info">Sent to {phoneNumber}</p>
                <OTPInput 
                  value={otp} 
                  onChange={setOtp} 
                  length={6}
                />
                {!canResendOtp ? (
                  <p className="otp-timer">Resend OTP in {formatTimer(otpTimer)}</p>
                ) : (
                  <button type="button" onClick={handleResendOTP} className="resend-btn">
                    Resend OTP
                  </button>
                )}
              </div>
              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-btn">
                  Back
                </button>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </form>
          )}

          {/* Step 3: Student Registration Number */}
          {step === 3 && (
            <form onSubmit={handleRegistrationSubmit}>
              <div className="form-group">
                <label>Student Registration Number</label>
                <input
                  type="text"
                  placeholder="Enter 10-digit registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                />
                <small>Enter exactly 10 digits</small>
              </div>
              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-btn">
                  Back
                </button>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Complete Verification'}
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="success-step">
              <div className="success-icon">✓</div>
              <h3>Verification Successful!</h3>
              <p>Your identity has been verified successfully</p>
            </div>
          )}

          {/* Step 5: Login Button */}
          {step === 5 && (
            <div className="login-step">
              <div className="verified-info">
                <div className="success-icon">✓</div>
                <p>Verified: {phoneNumber}</p>
                <p>Registration: {registrationNumber}</p>
              </div>
              <button onClick={handleLogin} className="login-btn">
                Login to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
