import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import usePutRequest from '../../../hooks/usePutRequest'; // Ensure correct custom hook import
import Button from '../../../components/common/Button/Button';
import './editProfile.scss';

const EditProfilePage = () => {
  const { userDetails, setUserDetails } = useUser(); // Get and set user details from UserContext
  const [profileData, setProfileData] = useState(userDetails);
  const [submitData, setSubmitData] = useState(null); // State to trigger the PUT request
  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate();

  // Custom hook to make PUT requests, triggered by the `submitData` state
  const { response, error, loading } = usePutRequest(
    'student/edit-profile',
    submitData
  );

  useEffect(() => {
    if (userDetails) {
      setProfileData(userDetails); // Prefill the form with user details
    }
  }, [userDetails]);

  useEffect(() => {
    if (response && !error) {
      setUserDetails(response); // Update UserContext with the new data
      navigate('/student/users'); // Navigate to the profile page
    }
  }, [response, error, navigate, setUserDetails]);

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.firstName) newErrors.firstName = 'First Name is required';
    if (!profileData.lastName) newErrors.lastName = 'Last Name is required';
    if (!profileData.username) newErrors.username = 'Username is required';
    if (!profileData.email) newErrors.email = 'Email is required';
    if (!profileData.contactNumber)
      newErrors.contactNumber = 'Contact Number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitData({ studentId: profileData.studentId, ...profileData }); // Include studentId in the request
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; // Handle loading state

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="profile-title">Edit Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName || ''}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName || ''}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username || ''}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email || ''}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label>Contact No.</label>
            <input
              type="text"
              name="contactNumber"
              value={profileData.contactNumber || ''}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <div className="error-message">{errors.contactNumber}</div>
            )}
          </div>
          <div className="profile-actions">
            <Button text="Save Changes" variant="secondary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
