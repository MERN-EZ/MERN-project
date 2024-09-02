import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const NavCard = ({ title, icon, navigateTo }) => {
  const navigate = useNavigate(); 
  return (
    <Card sx={{ maxWidth: 1000 }} onClick={() => navigate(navigateTo)} style={{ cursor: "pointer" }}>
      <CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 140,
          }}>
          {icon}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default NavCard;
