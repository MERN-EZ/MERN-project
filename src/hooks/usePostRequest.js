import { useState, useEffect } from 'react';
import { useDB } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';

const usePostRequest = (endpoint, requestData) => {
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `http://${localIP}:5000/`;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { DB } = useDB();
  const { Auth } = useAuth();

  useEffect(() => {
    const postRequest = async () => {
      if (!endpoint || !requestData) return;
      setLoading(true);
      try {
        const urlEncodedData = new URLSearchParams(requestData).toString();

        const response = await fetch(`${prefix}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'db-name': DB,
            Authorization: `Bearer ${Auth}`,
          },
          body: urlEncodedData,
        });

        if (response.ok) {
          setResponse(await response.json());
          console.log('response', response);
        }

        if (!response.ok) {
          const data = await response.json();
          console.log('data', data);
          setError(data.error || 'Failed to post');
          console.log('error', error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        console.log('finally, error', error);
        setLoading(false);
      }
    };

    if (endpoint && requestData) {
      postRequest();
    }
  }, [prefix, endpoint, requestData, DB, error, Auth]);

  return { response, error, loading };
};

export default usePostRequest;
