import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.scss';

const ProfileComponent = () => {
    const navigate = useNavigate();

    const handleEditProfileClick = () => {
        navigate('/edit-profile', { state: { name: 'Jane Silva' } });
    };

    const handlePaymentsClick = () => {
        navigate('/payments');
    }

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
                            <span>Jane Silva</span>
                        </div>
                        <div className="profile-field">
                            <label>Password:</label>
                            <span>********</span>
                            <button className="change-password-btn">Change Password</button>
                        </div>
                        <div className="profile-field">
                            <label>Email address:</label>
                            <span>janesilva@gmail.com</span>
                        </div>
                        <div className="profile-field">
                            <label>Contact no:</label>
                            <span>0708561564</span>
                        </div>
                        <div className="profile-field">
                            <label>Year:</label>
                            <span>2022/2023</span>
                        </div>
                    </div>
                    <button className="edit-profile-btn" onClick={handleEditProfileClick}>
                        Edit profile
                    </button>
                </div>
                <div className="class-details-container">
                    <div className="class-info">
                        <h3>Ordinary Level ICT 22/223</h3>
                        <p>Nugegoda - ISM</p>
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
