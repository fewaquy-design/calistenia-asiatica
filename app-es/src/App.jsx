import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutDay from "./pages/WorkoutDay";
import Diet from "./pages/Diet";
import CustomDiet from "./pages/CustomDiet";
import Support from "./pages/Support";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router basename="/entregravel-es">
      <div className="min-h-screen bg-[var(--color-bg-light)] w-full relative overflow-hidden flex flex-col font-sans">
        <div className="flex-1 overflow-y-auto pb-32 w-full max-w-md mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/workout/:id" element={<WorkoutDay />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/custom-diet" element={<CustomDiet />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
