import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingCardComponent = () => {
  const [meetings, setMeetings] = useState([]);
  const currentUser = localStorage.getItem('useremail');

  useEffect(() => {
    // Fetch meeting data when the component mounts
    fetchMeetings();

    // Set an interval to refresh meeting data every 5 seconds
    const interval = setInterval(() => {
      fetchMeetings();
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/meetings/${currentUser}`);
      console.log(response.data.data);
      setMeetings(response.data.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  return (
    <div className="cont-meet">
      {meetings.map((meet) => (
        <div key={meet.id} className="row-meet">
          <h2>{meet.title}</h2>
          <div className="row-meet">
            <h3>Scheduled By: {meet.scheduled_by}</h3>
          </div>
          <div className="row-meet">
            <h3>Scheduled With: {meet.scheduled_with}</h3>
          </div>
          <div className="row-meet">
            <h3>Start time: {new Date(meet.starttime).toLocaleString()}</h3>
          </div>
          <div className="row-meet">
            <h3>End time: {new Date(meet.endtime).toLocaleString()}</h3>
          </div>
          {meet.approved === 0 ? (
            <div className="row-meet">
              <h3 className="pending">Status: Pending</h3>
              <h3>{meet.venue}</h3>
            </div>
          ) : (
            <div className="row-meet">
              <h3 className="approved">Status: Approved</h3>
              <h3>Venue: {meet.venue}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MeetingCardComponent;
