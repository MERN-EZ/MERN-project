import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import School from "@mui/icons-material/School";
import Person from "@mui/icons-material/Person";
import Work from "@mui/icons-material/Work";
import Assistant from "@mui/icons-material/Assistant";
import { useUserRole } from "../../../context/UserRoleContext";
const roles = [
  { role: "admin", icon: AccountCircle },
  { role: "student", icon: School },
  { role: "guest", icon: Person },
  { role: "teacher", icon: Work },
  { role: "assistant", icon: Assistant },
];

export default function UserRoleToggle() {
  const { userRole, setUserRole } = useUserRole();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    handleClose();
  };

  const SelectedIcon = roles.find((r) => r.role === userRole)?.icon || Person;

  return (
    <Box className="nav-item role-toggle">
      <IconButton
        onClick={handleClick}
        size="small"
        className="nav-item-content"
        aria-controls="role-menu"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}>
        <SelectedIcon />
        <Typography className="link-name" variant="body2">
          {userRole}
        </Typography>
      </IconButton>
      <Menu
        id="role-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "role-button",
        }}>
        {roles.map((role) => (
          <MenuItem
            key={role.role}
            onClick={() => handleRoleChange(role.role)}
            selected={userRole === role.role}>
            <ListItemIcon>
              <role.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{role.role}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
