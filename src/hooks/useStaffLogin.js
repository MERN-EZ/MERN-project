import { useDB } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import axios from 'axios';
import { useUserRole } from '../context/UserRoleContext';

const useStaffLogin = () => {
  const { setDB } = useDB();
  const { setAuth } = useAuth();
  const { setUserDetails } = useUser();
  const { setUserRole } = useUserRole();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password, userRole) => {
    setLoading(true);
    setError(null);

    try {
      setDB('2024');
      const response = await axios.post(
        `http://localhost:5000/guest/auth/login/staff`,
        { username, password, role: userRole },
        { headers: { 'db-name': '2024' } }
      );
      const { token, role } = response.data;

      setUserRole(role);
      setUserDetails({});
      setAuth(token);

      localStorage.setItem('userDetails', JSON.stringify({}));
      localStorage.setItem('Auth', token);

      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useStaffLogin;
