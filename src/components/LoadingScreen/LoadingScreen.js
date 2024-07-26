import React from "react";
import "./LoadingScreen.css";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen = () => (
  <div className="loading-overlay">
    <div className="loading-spinner">
      <CircularProgress size={60} thickness={5} color="inherit" />
    </div>
  </div>
);

export default LoadingScreen;
