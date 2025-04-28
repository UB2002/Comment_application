import { useState, useEffect, useCallback } from 'react';
import { login, register } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  id: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If parsing fails, clear the invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await login({ email, password });
      
      if (res.data.token) {
        const userData: User = { 
          email, 
          id: res.data.userId || 'unknown' 
        };
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        navigate('/'); // Add this line to navigate to home page
        return userData;
      } else {
        throw new Error('No token returned from login');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRegister = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await register({ email, password });
      
      if (res.data.token) {
        const userData: User = { 
          email, 
          id: res.data.userId || 'unknown' 
        };
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        return userData;
      } else {
        throw new Error('No token returned from registration');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
