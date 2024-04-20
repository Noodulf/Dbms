import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth-services'; // Import your auth service or hook

const withAuthGuard = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const isAuthenticated = useAuth(); // Replace this with your own function to check if the user is authenticated

        // Check authentication status
        if (!isAuthenticated) {
            console.log('User is not logged in. Redirecting to login.');
            // Redirect to login page if not authenticated
            return <Navigate to="/login" replace />;
        } else {
            console.log('User is logged in. Allowing access.');
            // If authenticated, render the wrapped component
            return <Component {...props} />;
        }
    };
};

export default withAuthGuard;
