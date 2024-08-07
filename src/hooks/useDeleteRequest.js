import { useState, useEffect } from 'react';

const useDeleteRequest = (endpoint) => {
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `http://${localIP}:5000/`;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const deleteRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${prefix}${endpoint}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to delete');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      deleteRequest();
    }
  }, [prefix, endpoint]);

  return { data, error, loading };
};

export default useDeleteRequest;
