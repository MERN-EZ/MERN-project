import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './profile.scss';
import useGetRequest from '../../../hooks/useGetRequest';

const ProfilePage = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate();
    
    // Fetch user data from MongoDB using useGetRequest
    const { data, error, loading } = useGetRequest(`student/users/${id}`);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (data) {
            setStudent(data);
        }
    }, [data]);

    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Student Data:', student);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !student) {
        return <div>{error || 'User not found'}</div>;
    }

    const handleEditProfileClick = () => {
        navigate('/edit-profile', { state: { name: student.username } });
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
                            <span>{student.username}</span>
                        </div>
                        <div className="profile-field">
                            <label>Password:</label>
                            <span>********</span>
                            <button className="change-password-btn">Change Password</button>
                        </div>
                        <div className="profile-field">
                            <label>Email address:</label>
                            <span>{student.email}</span>
                        </div>
                        <div className="profile-field">
                            <label>Contact no:</label>
                            <span>{student.contactNo}</span>
                        </div>
                        <div className="profile-field">
                            <label>Year:</label>
                            <span>{student.batch}</span>
                        </div>
                    </div>
                    <button className="edit-profile-btn" onClick={handleEditProfileClick}>
                        Edit profile
                    </button>
                </div>
                <div className="class-details-container">
                    <div className="class-info">
                        
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

export default ProfilePage;
