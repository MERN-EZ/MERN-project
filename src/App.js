import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { lazy, Suspense } from "react";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const LoadingScreen = lazy(() =>
  import("./components/LoadingScreen/LoadingScreen")
);

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
