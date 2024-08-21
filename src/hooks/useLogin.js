import { useDB } from '../context/DatabaseContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  const { setDB } = useDB();
  const { setUserDetails } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password, year) => {
    setLoading(true);
    setError(null);

    try {
      setDB(year);
      const response = await axios.post(`/login`, { username, password });
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
