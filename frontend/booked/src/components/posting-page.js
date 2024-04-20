import React, { useState } from 'react';
import axios from 'axios';
import SavedCard from './saved-card';
import OpportunitiesCard from './opportunities';
import ApplicationCard from './application-card';
import AppliedCard from './applied-card';

const PostingPage = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [apply, setApply] = useState(0);
    const [title, setTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [department, setDepartment] = useState('');
    const [hours, setHours] = useState('');
    const [stipend, setStipend] = useState('');
    const currentUser = localStorage.getItem('useremail');

    const handleFormVisibility = () => {
        setFormVisible(!formVisible);
    };

    const handleSubmit = async () => {
        const bodyData = {
            user: currentUser,
            title: title,
            supervisor: currentUser,
            job_type: jobType,
            department: department,
            hrs: hours,
            stipend: stipend
        };

        try {
            const response = await axios.put('http://localhost:3000/api/posts/form', bodyData);
            console.log('Post created successfully:', response);
            alert('Opportunity has been posted');
            // Handle successful post creation response here
        } catch (error) {
            console.error('Failed to create a post:', error);
            // Handle error response here
        }
        setFormVisible(false);
    };

    const handleApplications = () => {
        setApply(0);
        console.log(apply);
    };

    const handleApplied = () => {
        setApply(1);
        console.log(apply);
    };

    return (
        <div>
            {formVisible ? (
                <form className="profile-form">
                    <h2 style={{ textAlign: 'center' }}>Add Post details</h2>
                    <div className="form-field">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="form-field">
                        <label>Job Type:</label>
                        <input
                            type="text"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            placeholder="Enter Job type"
                        />
                    </div>
                    <div className="form-field">
                        <label>Department:</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="Enter department"
                        />
                    </div>
                    <div className="form-field">
                        <label>Hours/week:</label>
                        <input
                            type="text"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="Enter hours/week"
                        />
                    </div>
                    <div className="form-field">
                        <label>Stipend:</label>
                        <input
                            type="text"
                            value={stipend}
                            onChange={(e) => setStipend(e.target.value)}
                            placeholder="Enter stipend"
                        />
                    </div>
                    <button
                        className="submit-button"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <>
                    <button className="add-post" onClick={handleFormVisibility}>
                        Add New Post
                    </button>

                    <div className="cont">
                        <div className="col saved">
                            <h2>Saved</h2>
                            <SavedCard />
                        </div>

                        <div className="col opportunities">
                            <h2>Opportunities</h2>
                            <OpportunitiesCard />
                        </div>

                        <div className="col applications">
                            <div className="row-main">
                                <button className="app" onClick={handleApplications}>
                                    Applications
                                </button>
                                <button className="app" onClick={handleApplied}>
                                    Applied
                                </button>
                            </div>

                            {apply === 0 ? (
                                <ApplicationCard />
                            ) : (
                                <AppliedCard />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostingPage;
