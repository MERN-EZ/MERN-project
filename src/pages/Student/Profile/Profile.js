import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.scss';
import profile from '../../../images/profile.png';
import Button from '../../../components/common/Button/Button';
import { useUser } from '../../../context/UserContext';
import { useDB } from '../../../context/DatabaseContext';
import { useUserRole } from '../../../context/UserRoleContext';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import Alert from '../../../components/common/Alert/Alert';

const ProfilePage = () => {
  const { userDetails, setUserDetails } = useUser();
  const [student, setStudent] = useState(userDetails);
  const { DB } = useDB();
  const navigate = useNavigate();
  const { setUserRole } = useUserRole();

  const [deleteEndpoint, setDeleteEndpoint] = useState(null);
  const {
    data: deleteResponse,
    error: deleteError,
    loading: deleteLoading,
  } = useDeleteRequest(deleteEndpoint);

  useEffect(() => {
    if (userDetails) {
      setStudent(userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (deleteResponse) {
      setUserDetails(null);
      setUserRole('guest'); // Clear user details from context
      navigate('/'); // Redirect to home or login page
    }
  }, [deleteResponse, navigate, setUserDetails, setUserRole]);

  useEffect(() => {
    if (deleteEndpoint) {
      // This effect runs whenever deleteEndpoint changes, triggering the delete request
      setDeleteEndpoint(deleteEndpoint);
    }
  }, [deleteEndpoint]);

  const handleEditProfileClick = () => {
    navigate('/edit-profile', { state: { name: student.username } });
  };

  const handlePaymentsClick = () => {
    navigate('/payments');
  };

  const handleUnrollClick = () => {
    // Set the endpoint for deletion and trigger the delete request
    if (student.studentId) {
      setDeleteEndpoint(`/student/delete-profile`);
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
  };
  const handleCancelAlert = () => {
    setShowAlert(false);
  };

  if (deleteLoading) return <Alert message="Deleting..." variant="message" />;
  if (deleteError)
    return <Alert message={`Error: ${deleteError}`} variant="message" />;

  if (!student) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-title">Profile</div>
          <img src={profile} alt="profile" className="profile-photo-img" />
          <div className="profile-details">
            <div className="profile-field">
              <label>Name:</label>
              <span>
                {student.firstName} {student.lastName}
              </span>
            </div>
            <div className="profile-field">
              <label>Student ID:</label>
              <span>{student.studentId}</span>
            </div>
            <div className="profile-field">
              <label>Year:</label>
              <span>{DB}</span>
            </div>
            <div className="profile-field">
              <label>Username:</label>
              <span>{student.username}</span>
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <span>{student.email}</span>
            </div>
            <div className="profile-field">
              <label>Contact no:</label>
              <span>{student.contactNumber}</span>
            </div>
            <div className="profile-field">
              <label>Registered Date:</label>
              <span>{student.registeredDate}</span>
            </div>
          </div>
          <Button
            text="Edit profile"
            variant="secondary"
            onClick={handleEditProfileClick}
          />
        </div>
        <div className="profile-actions">
          <Button
            text="Payments"
            variant="primary"
            onClick={handlePaymentsClick}
          />
          <Button text="Unroll" variant="primary" onClick={handleUnrollClick} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
