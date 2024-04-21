import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppliedCard = () => {
  const [applications, setApplications] = useState([]);
  const currentUser = localStorage.getItem('useremail');

  useEffect(() => {
    fetchApplied();
    const interval = setInterval(fetchApplied, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchApplied = () => {
    axios.get(`http://localhost:3000/api/apply/fetch/${currentUser}`)
      .then(response => {
        setApplications(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching applied applications:', error);
      });
  };

  return (
    <div>
      {applications.map((app) => (
        <div className="cont-appli" key={app.post_id}>
          <h2 className="title">{app.title}</h2>
          <h3>Supervisor: {app.supervisor}</h3>
          <h3>Type: {app.job_type}</h3>
          <h3 className="status">{app.status}</h3>
        </div>
      ))}
    </div>
  );
};

export default AppliedCard;
