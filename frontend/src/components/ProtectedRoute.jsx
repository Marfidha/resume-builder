import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from "@clerk/react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  // ⏳ Wait until Clerk loads
  if (!isLoaded) return null;

  // ❌ Not logged in
  if (!isSignedIn) {
    return (
      <Navigate
        to="/login"
        state={{ message: "Please login to continue", from: location.pathname }}
        replace
      />
    );
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;