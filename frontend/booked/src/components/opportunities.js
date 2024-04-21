import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OpportunitiesCard = () => {
    const [opportunities, setOpportunities] = useState([]);
    const currentUser = localStorage.getItem('useremail');

    // Fetch opportunities on component mount
    useEffect(() => {
        fetchOpportunities();
    }, []);

    // Function to fetch opportunities from the backend API
    const fetchOpportunities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/opportunities/fetch');
            console.log('Opportunities fetched successfully:', response.data);
            setOpportunities(response.data);
        } catch (error) {
            console.error('Failed to fetch opportunities:', error);
        }
    };

    // Function to handle saving a post
    const savePost = async (opportunityID) => {
        const event = {
            post_id: opportunityID,
            user: currentUser
        };

        try {
            const response = await axios.post('http://localhost:3000/api/saves/add', event);
            console.log(response.data);
            alert('Meeting Registered Successfully');
        } catch (error) {
            console.error('Failed to save post:', error);
        }
    };

    // Function to handle applying for a post
    const applyPost = async (opportunityID) => {
        const event = {
            post_id: opportunityID,
            user: currentUser
        };

        try {
            const response = await axios.post('http://localhost:3000/api/apply/add', event);
            console.log(response.data);
            alert('Meeting Registered Successfully');
        } catch (error) {
            console.error('Failed to apply for post:', error);
        }
    };

    return (
        <div>
            {opportunities.map((oppo) => (
                <div key={oppo.post_id} className="cont-opp">
                    <div className="row-opp">
                        <h2>{oppo.title}</h2>
                        {oppo.user !== currentUser && (
                            <button onClick={() => savePost(oppo.post_id)}>
                                <i className="fa fa-bookmark"></i> {/* FontAwesome icon for bookmark */}
                            </button>
                        )}
                    </div>

                    <br />
                    <h3>Supervisor: {oppo.supervisor}</h3>
                    <h3>Job Type: {oppo.job_type}</h3>
                    <h3>Department: {oppo.department}</h3>
                    <h3>No: of Hours: {oppo.hrs} hrs per week</h3>
                    <h3>Stipend: {oppo.stipend} Rs</h3>
                    <h3>Published on: {oppo.created_at}</h3>

                    {oppo.user !== currentUser && (
                        <div className="row-button">
                            <button className="button-apply" onClick={() => applyPost(oppo.post_id)}>
                                Apply
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OpportunitiesCard;
