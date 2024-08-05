import { useState, useEffect } from "react";

const useGetRequest = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const data = await response.json();
          setError(data.error || "Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getRequest();
  }, [endpoint]);

  return { data, error, loading };
};

export default useGetRequest;
