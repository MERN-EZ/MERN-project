import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserRoleProvider } from "./context/UserRoleContext";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import UserRoleToggle from "./components/UserRoleToggle/UserRoleToggle";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <UserRoleProvider>
        <Router>
          <Header />
          <NavBar />
          <UserRoleToggle />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>{" "}
        </Router>
      </UserRoleProvider>
    </ThemeProvider>
  );
}

export default App;
