import axios from 'axios';
import { useState } from 'react';
import { useDB } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useUserRole } from '../context/UserRoleContext';

const useLogin = () => {
  const { setDB } = useDB();
  const { setAuth } = useAuth();
  const { setUserDetails } = useUser();
  const { setUserRole } = useUserRole();
  const [loading, setLoading] = useState(false);

  const login = async (username, password, year) => {
    setLoading(true);

    try {
      setDB(year);
      const response = await axios.post(
        `http://localhost:5000/guest/auth/login`,
        { username, password, year },
        { headers: { 'db-name': year } }
      );
      const { userDetails, token } = response.data;

      setUserRole('student');
      setUserDetails(userDetails);
      setAuth(token);

      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      localStorage.setItem('Auth', token);

      setLoading(false);
      return { success: true, error: null };
    } catch (err) {
      console.log('Error caught in login:', err);

      const errorMessage = err.response?.data?.message || 'Login failed';
      console.log('Error message:', errorMessage);

      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { login, loading };
};

export default useLogin;
