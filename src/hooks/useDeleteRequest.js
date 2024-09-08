import { useState, useEffect } from 'react';
import { useDB } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';

const useDeleteRequest = (endpoint) => {
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `http://${localIP}:5000/`;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { DB } = useDB();
  const { Auth } = useAuth();

  useEffect(() => {
    if (!endpoint) return;
    const deleteRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${prefix}${endpoint}`, {
          method: 'DELETE',
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
  }, [prefix, endpoint, DB, Auth]);

  return { data, error, loading };
};

export default useDeleteRequest;
