import React, { useState, useRef, useEffect } from "react";
import "./Settings.css";
import { UilCamera } from "@iconscout/react-unicons";
import { useAuth } from "../src/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { currentUser, userData, updateProfile, logout } = useAuth(); // Added userData
  const navigate = useNavigate();
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    streetAddress: "",
    city: ""
  });

  const [tempFormData, setTempFormData] = useState({ ...formData });

  // Load user data and avatar from context (using userData, not currentUser or localStorage)
  useEffect(() => {
    if (userData) { // Use userData instead of currentUser
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        streetAddress: userData.streetAddress || "",
        city: userData.city || ""
      });
      setAvatar(userData.avatar || null); // Load avatar from Firestore via userData
    }
  }, [userData]); // Depend on userData instead of currentUser

  const toggleFormVisible = () => {
    setIsFormVisible(!isFormVisible);

    // Reset tempFormData when opening the form
    if (!isFormVisible) {
      setTempFormData({ ...formData });
    }
  };

  const handleChange = (e) => {
    setTempFormData({
      ...tempFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Update user profile in context (saves to Firestore, including all fields and avatar)
    updateProfile(tempFormData, avatar); // Pass avatar explicitly to save it
    
    // Update local state
    setFormData({ ...tempFormData });
    toggleFormVisible(); // Close the form after saving
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarData = reader.result;
        setAvatar(avatarData);
        // Save to Firestore via updateProfile instead of localStorage
        updateProfile(formData, avatarData); // Pass avatarData to save it in Firestore
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeAvatar = () => {
    setAvatar(null);
    // Remove avatar from Firestore via updateProfile
    updateProfile(formData, null); // Pass null to remove avatar
  };
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="board1">
      <div className={`Settings ${isFormVisible ? "blur-background" : ""}`}>
        {/* Header */}
        
        <div className="Profile">
          <h1>Profile</h1>

          {/* User Info with Avatar */}
          <div className="user-info">
            {/* Avatar with change/remove options */}
            <div className="avatar-section">
              <div className="avatar-preview" onClick={handleAvatarClick}>
                {avatar ? (
                  <img src={avatar} alt="User avatar" className="settings-avatar" />
                ) : (
                  <div className="user-avatar-placeholder">
                    {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
                <div className="avatar-overlay">
                  <UilCamera />
                  <span>Change</span>
                </div>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleFileUpload}
              />
              
              <div className="avatar-actions">
                <button className="avatar-btn" onClick={handleAvatarClick}>
                  Change Avatar
                </button>
                {avatar && (
                  <button className="avatar-btn remove" onClick={removeAvatar}>
                    Remove Avatar
                  </button>
                )}
              </div>
            </div>
            <div className="user-details">
              <p className="user-name">{formData.firstName} {formData.lastName}</p>
              <p className="user-email">{formData.email}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="Profile">
          <h3>Personal Information</h3>
          <form>
            <div className="InfoForm">
              <label htmlFor="FirstName" className="form-label">First Name</label>
              <input type="text" value={formData.firstName} className="form-control" id="FirstName" readOnly />

              <label htmlFor="LastName" className="form-label">Last Name</label>
              <input type="text" value={formData.lastName} className="form-control" id="LastName" readOnly />

              <label htmlFor="EmailAddress" className="form-label">Email Address</label>
              <input type="email" value={formData.email} className="form-control" id="EmailAddress" readOnly />

              <label htmlFor="Phone" className="form-label">Phone</label>
              <input type="text" value={formData.phone} className="form-control" id="Phone" readOnly />
            </div>
          </form>
        </div>

        {/* Address */}
        <div className="Profile">
          <h3>Address</h3>
          <form>
            <div className="InfoForm">
              <label htmlFor="Country" className="form-label">Country</label>
              <input type="text" value={formData.country} className="form-control" id="Country" readOnly />

              <label htmlFor="StreetAddress" className="form-label">Street Address</label>
              <input type="text" value={formData.streetAddress} className="form-control" id="StreetAddress" readOnly />

              <label htmlFor="City" className="form-label">City</label>
              <input type="text" value={formData.city} className="form-control" id="City" readOnly />
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-primary" onClick={toggleFormVisible}>
                {isFormVisible ? "Exit" : "Edit"}
              </button>
            </div>
          </form>
        </div>

        {/* Overlay and Centered Pop-up Form */}
        {isFormVisible && (
          <>
            {/* Background Overlay */}
            <div className="overlay" onClick={toggleFormVisible}></div>

            {/* Centered Pop-up Form */}
            <div className="popup-form">
              <button className="close-btn" onClick={toggleFormVisible}>✖</button>
              <form className="inputform" onSubmit={handleSave}>
                <div className="inputForm">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={tempFormData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    id="firstName"
                  />

                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={tempFormData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    id="lastName"
                  />

                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={tempFormData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                  />

                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={tempFormData.phone}
                    onChange={handleChange}
                    className="form-control"
                    id="phone"
                  />

                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={tempFormData.country}
                    onChange={handleChange}
                    className="form-control"
                    id="country"
                  />

                  <label htmlFor="streetAddress" className="form-label">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={tempFormData.streetAddress}
                    onChange={handleChange}
                    className="form-control"
                    id="streetAddress"
                  />

                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={tempFormData.city}
                    onChange={handleChange}
                    className="form-control"
                    id="city"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;