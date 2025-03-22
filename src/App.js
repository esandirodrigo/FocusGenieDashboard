import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Dashboard";
import SwitchToGame from "./SwitchToGame";
import Settings from "./Settings";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import ParenDashboard from "./ParenDashboard";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
//import Profile from "./components/Profile/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <div className="AppGlass">
                  <Sidebar />
                  <Dashboard />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <div className="AppGlass">
                  <Sidebar />
                  <MainDash />
                  <RightSide />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/SwitchToGame" element={
              <ProtectedRoute>
                <div className="AppGlass">
                  <Sidebar />
                  <SwitchToGame />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/ParenDashboard" element={
              <ProtectedRoute>
                <div className="AppGlass">
                  <Sidebar />
                  <ParenDashboard />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <div className="AppGlass">
                  <Sidebar />
                  <Settings />
                </div>
              </ProtectedRoute>
            } />
            {/* <Route path="/profile" element={
              <ProtectedRoute>
                <div className="AppGlass">
                  <Sidebar />
                  <Profile />
                </div>
              </ProtectedRoute>
            } /> */}
            
            {/* Redirect any unmatched routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;