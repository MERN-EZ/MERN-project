import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.scss';
import { useUser } from '../../../context/UserContext';
//import useGetRequest from '../../../hooks/useGetRequest';

const ProfilePage = () => {
    //const { id } = useParams(); // Get the user ID from the URL
    const { userDetails } = useUser(); // Get user details from UserContext
    const [student, setStudent] = useState(userDetails);
    const navigate = useNavigate();
    
    // Fetch user data from MongoDB using useGetRequest
    //const { data, error, loading } = useGetRequest(`student/users/${id}`);
    //const [student, setStudent] = useState(null);

    //useEffect(() => {
        //if (data) {
            //setStudent(data);
       //}
    //}, [data]);

    useEffect(() => {
        if (userDetails) {
            console.log('User Details:', userDetails); 
            setStudent(userDetails);
        }
    }, [userDetails]);

    //console.log('Loading:', loading);
    //console.log('Error:', error);
    //console.log('Student Data:', student);

    //if (loading) {
        //return <div>Loading...</div>;
    //}

    //if (error || !student) {
        //return <div>{error || 'User not found'}</div>;
    //}

    if (!student) {
        return <div>User not found</div>; // Adjust to your loading state
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
                            <span>{student.firstName}</span>
                        </div>
                        <div className="profile-field">
                            <label>Username:</label>
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
                            <span>{student.contactNumber}</span>
                        </div>
                        <div className="profile-field">
                            <label>Year:</label>
                            <span>['db-name']</span>
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
