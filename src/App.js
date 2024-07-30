import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { UserRoleProvider } from "./context/UserRoleContext";
import NavBar from "./components/common/NavBar/NavBar";
import Header from "./components/common/Header/Header";
import Home from "./pages/Home/Home";
import AdminRequestsMain from "./pages/Admin/Requests/AdminRequestsMain";
import StudentRequests from "./pages/Admin/StudentRequests";
import CreateAssistant from "./pages/Admin/CreateAssistant";
import CreateClassroom from "./pages/Admin/CreateClassroom";
import UserRoleToggle from "./components/common/UserRoleToggle/UserRoleToggle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <UserProvider>
          <UserRoleProvider>
            <Router>
              <Header />
              <NavBar />
              <UserRoleToggle />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Admin Requests Page*/}
                <Route path="/requests" element={<AdminRequestsMain />} />
                <Route path="/student-requests" element={<StudentRequests />} />
                <Route path="/create-assistant" element={<CreateAssistant />} />
                <Route path="/create-classroom" element={<CreateClassroom />} />
              </Routes>
            </Router>
          </UserRoleProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
