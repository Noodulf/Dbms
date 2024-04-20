import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCard from './request-card';
import MeetingCard from './meeting-card';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the current user's email from localStorage when the component mounts
    const userEmail = localStorage.getItem('useremail');
    setCurrentUser(userEmail);
    console.log(userEmail);
  }, []);

  // Method to redirect to the Create Profile page
  const redirectToCreateProfile = () => {
    navigate('/create-profile');
  };

  return (
    <div className="container">
      <div className="col request">
        <h2>Requested Meetings</h2>
        {/* Render the RequestCard component */}
        <RequestCard />
      </div>
      <div className="col meetings">
        <h2>Upcoming Meetings</h2>
        {/* Render the MeetingCard component */}
        <MeetingCard />
      </div>
      <div className="profile-section">
        <h2>Hi {currentUser}</h2>
        <button className="profile-button" onClick={redirectToCreateProfile}>
          <i className="fa-solid fa-pen-to-square edit"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
