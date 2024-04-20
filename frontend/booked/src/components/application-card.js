import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationCard = () => {
  const [applications, setApplications] = useState([]);
  const currentUser = localStorage.getItem('useremail');

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, []); // Run once on component mount

  const fetchApplications = () => {
    axios.get(`http://localhost:3000/api/application/fetch/${currentUser}`)
      .then(response => {
        setApplications(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
      });
  };

  const approveApplication = (opportunityID) => {
    const eventData = {
      post_id: opportunityID,
      user: currentUser
    };
    axios.post("http://localhost:3000/api/application/approve", eventData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error approving application:', error);
      });
    alert("Applied Successfully");
  };

  const rejectApplication = (opportunityID) => {
    const eventData = {
      post_id: opportunityID,
      user: currentUser
    };
    axios.post("http://localhost:3000/api/application/delete", eventData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error rejecting application:', error);
      });
    alert("Deleted Successfully");
  };

  return (
    <div>
      {applications.map(app => (
        <div className="cont-appli" key={app.post_id}>
          <h2 className="title">{app.title}</h2>
          <h3>Email: {app.user}</h3>
          <h3>Department: {app.department} {app.job_type}</h3>
          <div className="row-apply">
            <button className="button-approve" onClick={() => approveApplication(app.post_id)}>
              Approve
            </button>
            <button className="button-reject" onClick={() => rejectApplication(app.post_id)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationCard;
