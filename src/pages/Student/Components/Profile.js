import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './profile.scss';
import useGetRequest from '../../../hooks/useGetRequest';

const ProfileComponent = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate();
    
    // Fetch user data from MongoDB using useGetRequest
    const { data, error, loading } = useGetRequest(`student/users/${id}`);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !user) {
        return <div>{error || 'User not found'}</div>;
    }

    const handleEditProfileClick = () => {
        navigate('/edit-profile', { state: { name: user.username } });
    };

    const handlePaymentsClick = () => {
        navigate('/payments');
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-photo">
                        <img 
                            src="https://via.placeholder.com/150" 
                            alt="Profile" 
                            className="profile-photo-img"
                        />
                    </div>
                    <div className="profile-details">
                        <div className="profile-field">
                            <label>Name:</label>
                            <span>{user.username}</span>
                        </div>
                        <div className="profile-field">
                            <label>Password:</label>
                            <span>********</span>
                            <button className="change-password-btn">Change Password</button>
                        </div>
                        <div className="profile-field">
                            <label>Email address:</label>
                            <span>{user.email}</span>
                        </div>
                        <div className="profile-field">
                            <label>Contact no:</label>
                            <span>{user.contactNo}</span>
                        </div>
                        <div className="profile-field">
                            <label>Year:</label>
                            <span>{user.batch}</span>
                        </div>
                    </div>
                    <button className="edit-profile-btn" onClick={handleEditProfileClick}>
                        Edit profile
                    </button>
                </div>
                <div className="class-details-container">
                    <div className="class-info">
                        <h3>{user.classInfo.title}</h3>
                        <p>{user.classInfo.location}</p>
                    </div>
                    <div className="class-actions">
                        <button className="payment-btn" onClick={handlePaymentsClick}>Payments</button>
                        <button className="unroll-btn">Unroll</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
