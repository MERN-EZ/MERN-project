import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { useUserRole } from "./context/UserRoleContext";
import NavBar from "./components/common/NavBar/NavBar";
import Header from "./components/common/Header/Header";
import TeacherRoutes from "./routes/TeacherRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import AssistantRoutes from "./routes/AssistantRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import "./App.css";

function App() {
  const { userRole } = useUserRole();
  return (
    <div
      className="App"
      style={{
        marginTop: userRole !== "guest" ? "4rem" : "2.5rem",
      }}>
      <ThemeProvider>
        <UserProvider>
          <Router>
            <Header />
            <NavBar />
            <AppRoutes />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

function AppRoutes() {
  const { userRole } = useUserRole();

  return (
    <Routes>
      {userRole === "teacher" && (
        <Route path="/*" element={<TeacherRoutes />} />
      )}
      {userRole === "student" && (
        <Route path="/*" element={<StudentRoutes />} />
      )}
      {userRole === "admin" && <Route path="/*" element={<AdminRoutes />} />}
      {userRole === "assistant" && (
        <Route path="/*" element={<AssistantRoutes />} />
      )}
      {userRole === "guest" && <Route path="/*" element={<GuestRoutes />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
