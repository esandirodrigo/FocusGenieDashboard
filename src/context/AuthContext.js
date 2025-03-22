import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Sign up function with all fields
  const signup = async (formData) => {
    try {
      console.log("Signup attempt with formData:", formData);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userDocData = {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email,
        phone: "",
        country: "",
        streetAddress: "",
        city: "",
        createdAt: new Date().toISOString(),
        avatar: null,
      };

      console.log("Creating user document with data:", userDocData);
      await setDoc(doc(db, "users", userCredential.user.uid), userDocData);
      setUserData(userDocData);
      console.log("Signup successful, userData set:", userData);
      return true;
    } catch (error) {
      console.error("Signup error:", error.message, error.code);
      throw error;
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      console.log("Login attempt with formData:", formData);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Login successful");
      return true;
    } catch (error) {
      console.error("Login error:", error.message, error.code);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("Logout attempt");
      await signOut(auth);
      setUserData(null);
      console.log("Logout successful, userData cleared");
      return true;
    } catch (error) {
      console.error("Logout error:", error.message, error.code);
      throw error;
    }
  };

  // Update profile function (includes all fields and avatar)
  const updateProfile = async (profileData, avatarData = null) => {
    try {
      if (!currentUser) {
        console.error("No current user to update profile");
        return false;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const updateData = {
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        country: profileData.country || "",
        streetAddress: profileData.streetAddress || "",
        city: profileData.city || "",
        updatedAt: new Date().toISOString(),
      };
      if (avatarData !== undefined) {
        updateData.avatar = avatarData;
      }

      console.log("Updating profile with data:", updateData);
      await updateDoc(userDocRef, updateData);
      setUserData((prevData) => ({
        ...prevData,
        ...updateData,
      }));
      console.log("Profile updated, userData set:", userData);
      return true;
    } catch (error) {
      console.error("Update profile error:", error.message, error.code);
      throw error;
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async (user) => {
    if (!user) {
      console.log("No user to fetch data for");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log("Fetching user data for UID:", user.uid);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const fullData = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          streetAddress: data.streetAddress || "",
          city: data.city || "",
          createdAt: data.createdAt || "",
          avatar: data.avatar || null,
          updatedAt: data.updatedAt || "",
        };
        setUserData(fullData);
        console.log("User data fetched and set:", fullData);
      } else {
        console.log("No document exists, creating default data");
        const defaultData = {
          firstName: "",
          lastName: "",
          email: user.email || "",
          phone: "",
          country: "",
          streetAddress: "",
          city: "",
          createdAt: new Date().toISOString(),
          avatar: null,
        };
        await setDoc(userDocRef, defaultData);
        setUserData(defaultData);
        console.log("Default data created and set:", defaultData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message, error.code);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, user:", user);
      setCurrentUser(user);
      setIsAuthenticated(!!user);

      if (user) {
        fetchUserData(user);
      } else {
        setUserData(null);
        console.log("User logged out, userData cleared");
      }

      setLoading(false);
      console.log("Loading set to false, isAuthenticated:", isAuthenticated);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};