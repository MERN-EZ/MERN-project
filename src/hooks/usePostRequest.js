import { useState, useEffect } from 'react';
import { useDB } from '../context/DatabaseContext';

const usePostRequest = (endpoint, requestData) => {
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `http://${localIP}:5000/`;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { DB } = useDB();

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
          },
          body: urlEncodedData,
        });
        setResponse(await response.json());

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || 'Failed to post');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint && requestData) {
      postRequest();
    }
  }, [prefix, endpoint, requestData, DB]);

  return { response, error, loading };
};

export default usePostRequest;
