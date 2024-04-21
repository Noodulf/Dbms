import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route} from 'react-router-dom';
import {Routes } from 'react-router-dom';

// Import your components
import HomeComponent from './components/home';
import LoginComponent from './components/login';
import SignupComponent from './components/signup';
import DepartmentComponent from './components/department';
import CreateProfileComponent from './components/create-profile';
import ProfileComponent from './components/profile';
import PostingPageComponent from './components/posting-page';

// Import the AuthGuard (you might need to implement this as a wrapper around your routes in React)
import AuthGuard from './services/auth-guard-services';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        {/* <Route
          path="/"
          element={<AuthGuard><HomeComponent /></AuthGuard>}
        /> */}
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
