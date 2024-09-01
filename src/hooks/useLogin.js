import { useDB } from '../context/DatabaseContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import axios from 'axios';
import { useUserRole } from '../context/UserRoleContext';

const useLogin = () => {
  const { setDB } = useDB();
  const { setUserDetails } = useUser();
  const { setUserRole } = useUserRole();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // List of valid years (databases)

  const login = async (username, password, year) => {
    setLoading(true);

    try {
      setDB(year);
      const response = await axios.post(
        `http://localhost:5000/guest/auth/login`,
        { username, password, year },
        { headers: { 'db-name': year } }
      );

      const actualYear = response.data.batch;
      setDB(actualYear);

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
