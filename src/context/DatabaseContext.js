import React, { createContext, useContext, useState, useEffect } from 'react';

const DBContext = createContext();

export const DBProvider = ({ children }) => {
  const [DB, setDB] = useState(localStorage.getItem('DB') || 'NULL');
  useEffect(() => {
    localStorage.setItem('DB', DB);
    console.log('DB set to', DB);
  }, [DB]);

  return (
    <DBContext.Provider value={{ DB, setDB }}>{children}</DBContext.Provider>
  );
};

export const useDB = () => useContext(DBContext);
