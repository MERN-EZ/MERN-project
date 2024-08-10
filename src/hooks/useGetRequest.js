import { useState, useEffect } from 'react';
import { useDB } from '../context/DatabaseContext';

const useGetRequest = (endpoint) => {
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `http://${localIP}:5000/`;
  // console.log('Local IP:', localIP);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { DB } = useDB();
  // console.log('DB:', DB);

  useEffect(() => {
    const getRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(prefix + endpoint, {
          headers: {
            'db-name': DB,
          },
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    getRequest();
  }, [prefix, endpoint, DB]);

  return { data, error, loading };
};

export default useGetRequest;
