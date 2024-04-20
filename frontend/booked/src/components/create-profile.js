import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProfile = () => {
    // State variables
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        roomno: '',
        research: '',
        education: '',
        workexperience: '',
        awards: ''
    });
    const currentUser = localStorage.getItem('useremail');

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = () => {
        axios.get(`http://localhost:3000/api/users/getDetails/${currentUser}`)
            .then(response => {
                console.log(response.data);
                const data = response.data.data[0]; // Assuming user data is an array with one element
                setUserData({
                    username: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    roomno: data.room_no,
                    research: data.research,
                    education: data.education,
                    workexperience: data.work,
                    awards: data.awards
                });
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateRecords();
    };

    const updateRecords = () => {
        axios.put(`http://localhost:3000/api/users/update/${currentUser}`, userData)
            .then(response => {
                console.log('User updated:', response.data);
                alert('User details updated successfully');
                fetchDetails(); // Refresh data after update
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div className="container">
            {/* Left Section */}
            <div className="left-section">
                <img src="assets/my-image.png" alt="User Image" className="user-image" />
                <br /><br />
                <div className="links">
                    <a href="/create-profile" className="profile-link">Dashboard</a>
                    {/* Other links can be added here */}
                </div>
            </div>
            {/* Right Section */}
            <div className="right-section">
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={userData.role}
                            onChange={handleInputChange}
                            placeholder="Enter role"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="roomNo">Room No:</label>
                        <input
                            type="text"
                            id="roomNo"
                            name="roomno"
                            value={userData.roomno}
                            onChange={handleInputChange}
                            placeholder="Enter room number"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="research">Research:</label>
                        <textarea
                            id="research"
                            name="research"
                            value={userData.research}
                            onChange={handleInputChange}
                            placeholder="Enter research details"
                        ></textarea>
                    </div>
                    <div className="form-field">
                        <label htmlFor="education">Education:</label>
                        <textarea
                            id="education"
                            name="education"
                            value={userData.education}
                            onChange={handleInputChange}
                            placeholder="Enter education details"
                        ></textarea>
                    </div>
                    <div className="form-field">
                        <label htmlFor="workExperience">Work Experience:</label>
                        <textarea
                            id="workExperience"
                            name="workexperience"
                            value={userData.workexperience}
                            onChange={handleInputChange}
                            placeholder="Enter work experience details"
                        ></textarea>
                    </div>
                    <div className="form-field">
                        <label htmlFor="awards">Awards:</label>
                        <textarea
                            id="awards"
                            name="awards"
                            value={userData.awards}
                            onChange={handleInputChange}
                            placeholder="Enter awards details"
                        ></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
