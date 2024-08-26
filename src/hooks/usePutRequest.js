import { useState, useEffect } from 'react';
import { useDB } from '../context/DatabaseContext';

const usePutRequest = (endpoint, requestData) => {
  //const localIP = 'localhost';
  const localIP = process.env.REACT_APP_LOCAL_IP || 'localhost';
  const prefix = `https://mern-project-backend-production.up.railway.app/`;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { DB } = useDB();

  useEffect(() => {
    const putRequest = async () => {
      if (!endpoint || !requestData) return;
      setLoading(true);
      try {
        const urlEncodedData = new URLSearchParams(requestData).toString();

        const response = await fetch(`${prefix}${endpoint}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'db-name': DB,
          },
          body: urlEncodedData,
        });
        setResponse(await response.json());

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || 'Failed to put');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint && requestData) {
      putRequest();
    }
  }, [prefix, endpoint, requestData, DB]);

  return { response, error, loading };
};

export default usePutRequest;
