import React from 'react';
import PropTypes from 'prop-types';
import ProfessorCard from './professor-page'; // Import the ProfessorCard component

const ProfessorList = ({ users }) => {
    console.log(users);

    return (
        <div className="professor-list">
            {users.map((user) => (
                <ProfessorCard key={user.id} users={user} />
            ))}
        </div>
    );
};

ProfessorList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            room_no: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProfessorList;
