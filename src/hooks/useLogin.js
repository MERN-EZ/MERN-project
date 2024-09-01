import { useDB } from '../context/DatabaseContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import axios from 'axios';
import { useUserRole } from '../context/UserRoleContext';

const useLogin = () => {
  const { DB, setDB } = useDB();
  const { setUserDetails } = useUser();
  const { userRole, setUserRole } = useUserRole();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password, year) => {
    setLoading(true);
    //setError(null);

    try {
      setDB(year);
      const response = await axios.post(
        `https://mern-project-backend-production.up.railway.app/guest/auth/login`,
        { username, password, year },
        { headers: { 'db-name': DB } }
      );
      setUserRole('student');
      setUserDetails(response.data);

      localStorage.setItem('userDetails', JSON.stringify(response.data));
      return true;
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
