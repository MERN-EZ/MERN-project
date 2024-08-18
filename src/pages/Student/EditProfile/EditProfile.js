import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './editProfile.scss';  // Ensure you're importing the SCSS file

const EditProfileComponent = () => {
    const location = useLocation();
    const { name, email, contactNo, year } = location.state || {};

    const [profileData, setProfileData] = useState({
        name: name || '',
        password: '',
        email: email || '',
        contactNo: contactNo || '',
        year: year || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send data to API)
        console.log('Updated Profile Data:', profileData);
    };

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email address:</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contact no:</label>
                    <input
                        type="text"
                        name="contactNo"
                        value={profileData.contactNo}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Year:</label>
                    <input
                        type="text"
                        name="year"
                        value={profileData.year}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfileComponent;
