import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layouts from './pages/Layouts';
import CvEditor from './pages/CvEditor';
import ProtectedRoute from './pages/ProtectedRoute';
import { useEffect } from 'react';
import { setUser } from './store/slices/authSlice';
import { authService } from './api/authService';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import Toast from './components/Toast';


const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(()=>{
    const checkUser = async () => {
      try{
        const userData = await authService.getUser();
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error checking user:', error);
      }
    }
    checkUser();
  },[]);

  return (
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Header />
          <Toast />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/layouts" 
                element={
                  <ProtectedRoute>
                    <Layouts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/createcv" 
                element={
                  <ProtectedRoute>
                    <CvEditor />
                  </ProtectedRoute>
                } 
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
  );
};

export default App;
