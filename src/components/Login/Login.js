import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import backgroundVideo from "../../assets/video.mp4";
import logo from "../Head/logo9.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const { login, signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      console.log("Navigating to dashboard due to authentication");
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.warn("Autoplay prevented:", err));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    });
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.warn("Video replay prevented:", err));
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) throw new Error("Please fill in all fields");
        if (!isValidEmail(formData.email)) throw new Error("Please enter a valid email address");
        console.log("Attempting login with:", formData);
        await login(formData);
        navigate("/dashboard");
      } else {
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          throw new Error("Please fill in all fields");
        }
        if (!isValidEmail(formData.email)) throw new Error("Please enter a valid email address");
        if (formData.password !== formData.confirmPassword) throw new Error("Passwords do not match");
        if (formData.password.length < 6) throw new Error("Password must be at least 6 characters long");
        console.log("Attempting signup with:", formData);
        await signup(formData);
        navigate("/dashboard");
      }
    } catch (err) {
      let errorMessage = err.message || "Authentication failed";
      if (errorMessage.includes("auth/email-already-in-use")) {
        errorMessage = "This email is already registered. Please log in instead.";
      } else if (errorMessage.includes("auth/user-not-found") || errorMessage.includes("auth/wrong-password")) {
        errorMessage = "Invalid email or password";
      } else if (errorMessage.includes("auth/weak-password")) {
        errorMessage = "Password is too weak. Please use at least 6 characters.";
      } else if (errorMessage.includes("auth/invalid-email")) {
        errorMessage = "Invalid email format";
      } else if (errorMessage.includes("auth/too-many-requests")) {
        errorMessage = "Too many unsuccessful login attempts. Please try again later.";
      }
      setError(errorMessage);
      console.error("Authentication error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="login-container">Loading...</div>;

  return (
    <div className="login-container">
      <div className="animated-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className={`background-video ${videoLoaded ? "video-loaded" : ""}`}
          onLoadedData={handleVideoLoaded}
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div className={`login-card ${isLogin ? "login-mode" : "signup-mode"}`}>
        <div className="animated-shape"></div>
        <div className="login-header">
          <div className="logo-animation">
            <div className="logo-icon">
              <img src={logo} className="logo-icon" alt="Logo" />
            </div>
          </div>
          <h2 className="animated-text">{isLogin ? "Log In" : "Sign Up"}</h2>
          <p>{isLogin ? "Welcome back! Please login to your account." : "Create a new account to get started."}</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="name-fields">
              <div className="form-group form-fade-in">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="input-animated"
                />
                <div className="input-focus-effect"></div>
              </div>
              <div className="form-group form-fade-in">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="input-animated"
                />
                <div className="input-focus-effect"></div>
              </div>
            </div>
          )}
          <div className="form-group form-fade-in" style={{ animationDelay: "0.1s" }}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-animated"
            />
            <div className="input-focus-effect"></div>
          </div>
          <div className="form-group form-fade-in" style={{ animationDelay: "0.2s" }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-animated"
            />
            <div className="input-focus-effect"></div>
          </div>
          {!isLogin && (
            <div className="form-group form-fade-in" style={{ animationDelay: "0.3s" }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-animated"
              />
              <div className="input-focus-effect"></div>
            </div>
          )}
          {isLogin && (
            <div className="forgot-password form-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          )}
          <button
            type="submit"
            className="btn-submit btn-animated"
            disabled={isLoading}
            style={{ animationDelay: "0.4s" }}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span className="btn-text">{isLogin ? "Log In" : "Sign Up"}</span>
                <span className="btn-shine"></span>
              </>
            )}
          </button>
        </form>
        <div className="toggle-form form-fade-in" style={{ animationDelay: "0.5s" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={toggleForm} className="toggle-btn">
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;