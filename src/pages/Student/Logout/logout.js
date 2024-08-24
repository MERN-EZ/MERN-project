import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear any stored authentication data (e.g., tokens, user info)
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Redirect to the login page or home page
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h1>Logging Out...</h1>
            <p>You are being logged out. Please wait a moment.</p>
        </div>
    );
};

export default Logout;
