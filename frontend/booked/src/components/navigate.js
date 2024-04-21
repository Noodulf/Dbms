import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkAuthStatus, authService } from '../services/auth-services'; // Import your auth service or utility

const NavigationComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const currentUserEmail = localStorage.getItem('useremail');

    useEffect(() => {
        // Fetch department data
        fetchDepartmentData();

        // Check and set authentication status
        checkAuthenticationStatus();

    }, []);

    const fetchDepartmentData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/departments/');
            setData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching department data:', error);
        }
    };

    const checkAuthenticationStatus = () => {
        // Assuming you have a function `checkAuthStatus` that returns true if the user is authenticated
        const isLoggedIn = checkAuthStatus(); // Call your authentication check function

        setIsAuthenticated(isLoggedIn);
        if (!isLoggedIn) {
            navigate('/login');
        }
    };

    const logout = () => {
        // Perform the logout process
        localStorage.removeItem('token');
        localStorage.removeItem('useremail');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const itemClick = (item) => {
        console.log('Item clicked:', item);
        // Navigate to the department's page
        navigate(`/dept/${item.DeptID}`);
    };

    return (
        <div className="mat-toolbar" style={{ backgroundColor: 'blue' }}>
            <span>
                <i className="fa-brands fa-squarespace"></i>
            </span>

            <span>
                {isAuthenticated && <h3></h3>}
                {isAuthenticated && <h3></h3>}
            </span>

            {/* Department Dropdown */}
            {isAuthenticated && (
                <div className="dropdown">
                    <button className="dropbtn">Department</button>
                    <div className="dropdown-content">
                        {data.map((item) => (
                            <Link key={item.DeptID} to={`/dept/${item.DeptID}`} onClick={() => itemClick(item)}>
                                {item.DepartmentName}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Other buttons */}
            <span>
                {isAuthenticated && (
                    <>
                        <button>
                            <Link to="/home">
                                <i className="fa-solid fa-house"></i>
                            </Link>
                        </button>

                        <button>
                            <Link to="/posting">
                                <i className="fa-solid fa-bullseye"></i>
                            </Link>
                        </button>

                        <button onClick={logout}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </button>
                    </>
                )}
            </span>

            {!isAuthenticated && (
                <>
                    {/* Add logic for handling when the user is not authenticated */}
                </>
            )}
        </div>
    );
};

export default NavigationComponent;
