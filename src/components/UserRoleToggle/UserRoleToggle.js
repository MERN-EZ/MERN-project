import React from "react";
import { useUserRole } from "../../context/UserRoleContext";

const UserRoleToggle = () => {
  const { userRole, setUserRole } = useUserRole();

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  return (
    <div className="role-toggle">
      <label htmlFor="userRole">Select User Role: </label>
      <select id="userRole" value={userRole} onChange={handleRoleChange}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
        <option value="assistant">Assistant</option>
      </select>
    </div>
  );
};

export default UserRoleToggle;
