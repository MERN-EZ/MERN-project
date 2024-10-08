import { useState, useEffect } from 'react';
import { useDB } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';

const useGetRequest = (endpoint) => {
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `http://${localIP}:5000/`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { DB } = useDB();
  const { Auth } = useAuth();

  useEffect(() => {
    const getRequest = async () => {
      if (!endpoint) return;
      setLoading(true);
      try {
        const response = await fetch(prefix + endpoint, {
          headers: {
            'db-name': DB,
            Authorization: `Bearer ${Auth}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const data = await response.json();
          console.error('Get Request Error:', data);
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        console.error(err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    getRequest();
  }, [prefix, endpoint, DB, Auth]);

  return { data, error, loading };
};

export default useGetRequest;
