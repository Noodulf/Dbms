import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 // Import your error handler utility

// Create a context for managing authentication state
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const httpOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Handle signup
    const signup = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', user, httpOptions);
            return response.data;
        } catch (error) {
            Econsole.log("Error signing up:",error);
        }
    };

    // Handle login
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password }, httpOptions);
            const { token, userId } = response.data;

            setUserId(userId);
            localStorage.setItem('token', token);
            setIsUserLoggedIn(true);
            navigate('/posts');
        } catch (error) {
            console.log("Error signing up:",error);
        }
    };

    // Handle logout
    const logout = () => {
        localStorage.removeItem('token');
        setIsUserLoggedIn(false);
        setUserId(null);
        navigate('/login');
    };

    // Provide authentication data and methods to children components
    return (
        <AuthContext.Provider value={{ isUserLoggedIn, userId, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};
