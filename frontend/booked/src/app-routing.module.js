import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import HomeComponent from './booked/src/components/Home';
import LoginComponent from './src/components/Login';
import SignupComponent from './dd/components/Signup';
import DepartmentComponent from './components/Department';
import CreateProfileComponent from './components/CreateProfile';
import ProfileComponent from './components/Profile';
import PostingPageComponent from './components/PostingPage';

// Import the AuthGuard (you might need to implement this as a wrapper around your routes in React)
import AuthGuard from './services/AuthGuard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route
          path="/"
          element={<AuthGuard><HomeComponent /></AuthGuard>}
        />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/dept/:id" element={<DepartmentComponent />} />
        <Route path="/create-profile" element={<CreateProfileComponent />} />
        <Route path="/profile/:id" element={<ProfileComponent />} />
        <Route path="/posting" element={<PostingPageComponent />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
