import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProfessorList from './professor-list'; // Import the ProfessorList component

const Department = () => {
  const { id } = useParams(); // Retrieve the id parameter from the URL
  const [deptname, setDeptname] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch department name and users when the component mounts or the id changes
    fetchName();
    fetchUsers();
  }, [id]);

  const fetchName = () => {
    axios.get(`http://localhost:3000/api/departments/getName/${id}`)
      .then(response => {
        console.log(response.data.data);
        setDeptname(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching department name:', error);
      });
  };

  const fetchUsers = () => {
    axios.get(`http://localhost:3000/api/users/getUsers/${id}`)
      .then(response => {
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div>
      <h2>Department of {deptname[0]?.DepartmentName}</h2> {/* Render the department name */}
      <ProfessorList users={users} /> {/* Pass the list of users to the ProfessorList component */}
    </div>
  );
};

export default Department;
