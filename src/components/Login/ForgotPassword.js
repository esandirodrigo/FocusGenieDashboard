// src/components/Login/ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.css";
import logo from "../Head/logo9.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    // Validate email
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset link sent! Check your email inbox.");
      setEmail("");
    } catch (err) {
      console.error("Password reset error:", err);
      
      // Format Firebase error messages
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      {/* Background Animation */}
      <div className="animated-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
      
      <div className="login-card">
        <div className="animated-shape"></div>
        
        <div className="login-header">
          <div className="logo-animation">
            <div className="logo-icon">
              <img src={logo} className="logo-icon" alt="Logo" />
            </div>
          </div>
          <h2 className="animated-text">Reset Password</h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group form-fade-in">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-animated"
            />
            <div className="input-focus-effect"></div>
          </div>
          
          <button
            type="submit"
            className="btn-submit btn-animated"
            disabled={isLoading}
            style={{ animationDelay: '0.2s' }}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span className="btn-text">Send Reset Link</span>
                <span className="btn-shine"></span>
              </>
            )}
          </button>
        </form>
        
        <div className="toggle-form form-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link to="/login" className="back-to-login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;