// ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store/index';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {isAuthenticated} = useSelector((store: RootState) => store.auth);
  
return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;