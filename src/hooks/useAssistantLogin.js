import { useDB } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import axios from 'axios';
import { useUserRole } from '../context/UserRoleContext';

const useAssistantLogin = () => {
  const { setDB } = useDB();
  const { setAuth } = useAuth();
  const { setUserDetails } = useUser();
  const { setUserRole } = useUserRole();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password, year) => {
    setLoading(true);

    try {
      setDB(year);
      const response = await axios.post(
        `http://localhost:5000/guest/auth/login/assistant`,
        { username, password, year },
        { headers: { 'db-name': year } }
      );
      const { userDetails, token } = response.data;

      setUserRole('assistant');
      setUserDetails(userDetails);
      setAuth(token);

      localStorage.setItem('userDetails', JSON.stringify(userDetails));
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

export default useAssistantLogin;
