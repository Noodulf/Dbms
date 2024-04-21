import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestCardComponent = () => {
  const [requests, setRequests] = useState([]);
  const currentUser = localStorage.getItem('useremail');

  useEffect(() => {
    console.log(currentUser);
    getMeetingRequests();

    const intervalId = setInterval(() => {
      getMeetingRequests();
    }, 5000); // Fetch requests every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, [currentUser]);

  const getMeetingRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/requests/${currentUser}`);
      console.log(response.data.data);
      setRequests(response.data.data);
    } catch (error) {
      console.error('Failed to fetch meeting requests:', error);
    }
  };

  const approveMeeting = async (meetingId) => {
    const bodyData = {
      meeting_id: meetingId,
      approve: 1,
    };
    try {
      const response = await axios.put(`http://localhost:3000/api/meetings/update/approve/${meetingId}`, bodyData);
      console.log(response.data);
      alert('Meeting Approved Successfully');
      getMeetingRequests();
    } catch (error) {
      console.error('Failed to approve meeting:', error);
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/meetings/delete/${meetingId}`);
      console.log(response.data);
      alert('Meeting Denied');
      getMeetingRequests();
    } catch (error) {
      console.error('Failed to delete meeting:', error);
    }
  };

  return (
    <div>
      {requests.map((req, index) => (
        <div className="cont-req" key={index}>
          <h2>By: {req.scheduled_by}</h2>
          <h3>Start Time: {new Date(req.starttime).toLocaleString()}</h3>
          <h3>End Time: {new Date(req.endtime).toLocaleString()}</h3>
          <h3>Title: {req.title}</h3>
          <div className="row-req">
            <button className="button-approve" onClick={() => approveMeeting(req.mid)}>
              Approve
            </button>
            <button className="button-delete" onClick={() => deleteMeeting(req.mid)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestCardComponent;
