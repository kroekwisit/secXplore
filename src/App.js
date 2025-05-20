import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import SimulationPage from "./Challenge1";
import DashboardPage from "./DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/Challenge1" element={<SimulationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
