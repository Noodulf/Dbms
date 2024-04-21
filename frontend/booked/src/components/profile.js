import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileComponent = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [formValues, setFormValues] = useState({
    subject: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    // Fetch current user's email from local storage
    const storedUserEmail = localStorage.getItem('useremail');
    setCurrentUser(storedUserEmail);

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/getUserProfile/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValues.subject && formValues.startTime && formValues.endTime) {
      // Create event object
      const eventData = {
        title: formValues.subject,
        starttime: new Date(formValues.startTime),
        endtime: new Date(formValues.endTime),
        scheduled_by: currentUser,
        scheduled_with: user[0].email,
        venue: user[0].room_no,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/meetings/add', eventData);
        console.log(response.data);
        alert('Meeting Registered Successfully');
        setFormValues({
          subject: '',
          startTime: '',
          endTime: '',
        });
      } catch (error) {
        console.error('Failed to register meeting:', error);
      }
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="prof-page-container">
      <div className="left-side">
        {user.length > 0 && (
          <>
            <h2 className="capitalize">{user[0].name}</h2>
            <p>Cabin: {user[0].room_no}</p>
            <p>Email: {user[0].email}</p>
            {user[0].email !== currentUser && (
              <div>
                <h1>Schedule meeting</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="subject">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleFormChange}
                    required
                  />
                  <label htmlFor="startTime">Start Time:</label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    value={formValues.startTime}
                    onChange={handleFormChange}
                    required
                  />
                  <label htmlFor="endTime">End Time:</label>
                  <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    value={formValues.endTime}
                    onChange={handleFormChange}
                    required
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <div className="right-side">
        {user.length > 0 && (
          <>
            <div className="dropdown">
              <label>Research Interest:</label>
              {user[0].research === null ? 'not updated' : <p>{user[0].research}</p>}
            </div>

            <div className="dropdown">
              <label>Education:</label>
              {user[0].education === null ? 'not updated' : <p>{user[0].education}</p>}
            </div>

            <div className="dropdown">
              <label>Work Experience:</label>
              {user[0].work === null ? 'not updated' : <p>{user[0].work}</p>}
            </div>

            <div className="dropdown">
              <label>Awards:</label>
              {user[0].awards === null ? 'not updated' : <p>{user[0].awards}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
