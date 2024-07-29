import React from 'react';
import {Card, CardContent, Box, Typography, CardActionArea} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const NavCard = ({title,icon,navigateTo}) => {
  const navigate = useNavigate(); // Initialize the navigate function
  return (
    <Card sx={{ maxWidth: 1000 }} onClick= {()=>navigate(navigateTo)}>
      <CardActionArea>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140 }}>
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