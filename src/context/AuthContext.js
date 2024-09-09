import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(localStorage.getItem('Auth') || null);
  useEffect(() => {
    localStorage.setItem('Auth', Auth);
  }, [Auth]);

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
