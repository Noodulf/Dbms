import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfessorCard = ({ users }) => {
    console.log(users);

    return (
        <div className="professor-card">
            <img
                src="../../../assets/my-image.png"
                alt="Professor Image"
                className="prof-image"
            />
            <h3></h3>
            <Link to={`/profile/${users.id}`} className="prof-name">
                {users.name}
            </Link>
            <p className="capitalize">{users.role}</p>
            <p className="capitalize">Cabin: {users.room_no}</p>
            {/* Additional functionality can be added here */}
        </div>
    );
};

ProfessorCard.propTypes = {
    users: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        room_no: PropTypes.string.isRequired
    }).isRequired
};

export default ProfessorCard;
