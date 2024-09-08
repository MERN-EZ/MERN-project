import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import { useAuth } from '../../context/AuthContext';
import { useDB } from '../../context/DatabaseContext';
import { useUser } from '../../context/UserContext';
import { useUserRole } from '../../context/UserRoleContext';

const Logout = () => {
  const { setUserDetails } = useUser();
  const { setAuth } = useAuth();
  const { setUserRole } = useUserRole();
  const { setDB } = useDB();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // Perform the delete operation

    // Clear any stored authentication data (e.g., tokens, user info)
    setAuth(null);
    setUserDetails({});
    setUserRole('guest');
    setDB('2024');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('Auth');

    // Redirect to the login page or home page
    navigate('/');
  };
  const handleCancelLogout = () => {
    // Redirect to the previous page or home page
    navigate(-1);
  };
  return (
    <div>
      <Alert
        message={'Are you sure you want to logout?'}
        variant={'action'}
        onConfirm={() => handleConfirmLogout()}
        onCancel={() => handleCancelLogout()}
      />
    </div>
  );
};

export default Logout;
