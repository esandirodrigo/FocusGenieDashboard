import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data.js";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "Check Your Child's Progress",
    "Game Mode Unlocked!",
    "Reminder: Focus session at 6 PM",
  ]);
  
  // User info state - synced with AuthContext
  const { userData, logout } = useAuth(); // Destructure logout along with userData
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const handleLogout = () => {
    logout(); // Now defined from useAuth
    navigate("/login");
  };

  // Handle clicking outside notifications popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        !event.target.closest('.user-avatar-container')
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const sidebarVariants = {
    true: { left: "0" },
    false: { left: "-60%" },
  };

  const handleUserInfoClick = () => {
    navigate("/Settings");
  };

  const handleNotificationClick = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      {/* Backdrop for blur effect */}
      {showNotifications && <div className="backdrop" onClick={() => setShowNotifications(false)} />}
      
      {/* Sidebar Toggle Button */}
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>

      {/* Sidebar */}
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* User Info with Avatar and Badge */}
        <div className="user-info" onClick={handleUserInfoClick}>
          <div className="user-avatar-container" onClick={handleNotificationClick}>
            {userData?.avatar ? (
              <img src={userData.avatar} alt="User avatar" className="user-avatar" />
            ) : (
              <div className="user-avatar-placeholder">
                {userData?.firstName ? userData.firstName.charAt(0).toUpperCase() : 'J'} {/* Fallback to 'J' for Jennifer */}
              </div>
            )}
            {notifications.length > 0 && (
              <span className="badge">{notifications.length}</span>
            )}
          </div>
          {/* <div className="user-details">
            <p className="user-name">{userInfo.name}</p>
            <p className="user-email">{userInfo.email}</p>
          </div> */}
        </div>

        {/* Notifications Popup */}
        {showNotifications && (
          <motion.div 
            className="notifications-popup" 
            ref={popupRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h4>🔔 Notifications</h4>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p>No new notifications</p>
            )}
            <button className="clear-btn" onClick={() => setNotifications([])}>
              Clear All
            </button>
          </motion.div>
        )}

        {/* Buttons */}
<div className="buttons">
  <button className="switch-btn" onClick={() => {
      fetch("http://localhost:4000/launch-game")
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
  }}>
    Switch to Game
  </button>
  <button className="settings-btn" onClick={() => navigate("/Settings")}>
    Account Settings
  </button>
</div>


        {/* Menu Items */}
        <div className="menu">
          {SidebarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => (isActive ? "menuItem active" : "menuItem")}
            >
              <item.icon />
              <span>{item.heading}</span>
            </NavLink>
          ))}

          {/* Logout Button */}
          <div>
            <button className="menuItem logout" onClick={handleLogout}>
              <UilSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;