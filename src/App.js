import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { lazy, Suspense } from "react";
import Home from "./pages/Home/Home";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
