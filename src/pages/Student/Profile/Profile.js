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
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
      console.log('Delete Response:', deleteResponse);
      setUserDetails(null);
      console.log('User DEt:', userDetails);
      setShowSuccessAlert(true);
      console.log('Success Alert Triggered');
    }
  }, [deleteResponse, setUserDetails, setUserRole]);

  const handleEditProfileClick = () => {
    navigate('/edit-profile', { state: { name: student.username } });
  };

  const handleUnrollClick = () => {
    setShowAlert(true);
  };

  const handleConfirmUnroll = () => {
    setDeleteEndpoint(`student/delete-profile?studentId=${student.studentId}`);
    setShowAlert(false);
  };

  const handleCancelUnroll = () => {
    setShowAlert(false);
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
    setUserRole('guest');
    console.log('Navigating to home');
    navigate('/');
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
              <label>Year of ALs:</label>
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
              <label>Contact No:</label>
              <span>{student.contactNumber}</span>
            </div>
            <div className="profile-field">
              <label>Registered Date:</label>
              <span>{student.registeredDate}</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <Button
            text="Edit profile"
            variant="secondary"
            onClick={handleEditProfileClick}
          />
          <Button text="Unroll" variant="primary" onClick={handleUnrollClick} />
        </div>
      </div>

      {showAlert && (
        <Alert
          message="Are you sure you want to unroll from this class?"
          variant="action"
          onConfirm={handleConfirmUnroll}
          onCancel={handleCancelUnroll}
        />
      )}

      {showSuccessAlert && (
        <Alert
          message="You have unrolled successfully!"
          variant="success"
          onCancel={handleSuccessAlertClose}
        />
      )}
    </div>
  );
};

export default ProfilePage;
