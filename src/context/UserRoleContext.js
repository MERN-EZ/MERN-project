import React, { createContext, useContext, useState, useEffect } from "react";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "guest"
  );
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
    console.log("userRole set to", userRole);
  }, [userRole]);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
