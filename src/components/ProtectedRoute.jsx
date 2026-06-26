import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../database/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
