import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

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
