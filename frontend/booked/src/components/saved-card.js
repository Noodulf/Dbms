import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedCardComponent = () => {
  const [saver, setSaver] = useState([]);
  const currentUser = localStorage.getItem('useremail');

  useEffect(() => {
    fetchSaved();
    const intervalId = setInterval(() => {
      fetchSaved();
    }, 5000); // Fetch saved items every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, [currentUser]);

  const fetchSaved = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/saves/fetch/${currentUser}`);
      console.log(response.data.data);
      setSaver(response.data.data);
    } catch (error) {
      console.error('Failed to fetch saved items:', error);
    }
  };

  const applySave = async (opportunityID) => {
    const event = {
      post_id: opportunityID,
      user: currentUser,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/apply/add', event);
      console.log(response.data);
      alert('Applied Successfully');
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  const deleteSave = async (opportunityID) => {
    const event = {
      post_id: opportunityID,
      user: currentUser,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/saves/delete', event);
      console.log(response.data);
      alert('Deleted Successfully');
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div>
      {saver.map((save, index) => (
        <div className="cont-save" key={index}>
          <h2>{save.title}</h2>
          <h3>Supervisor: {save.supervisor}</h3>
          <h3>Deadline: {new Date(save.deadline).toLocaleString()}</h3>
          <div className="row-save">
            <button className="button-apply" onClick={() => applySave(save.post_id)}>
              Apply
            </button>
            <button className="button-delete" onClick={() => deleteSave(save.post_id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedCardComponent;
