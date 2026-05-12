import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/src/components/Navbar";
import Home from "@/src/pages/Home";
import Doctors from "@/src/pages/Doctors";
import DoctorProfile from "@/src/pages/DoctorProfile";
import DashboardDoctor from "@/src/pages/DashboardDoctor";
import DashboardPatient from "@/src/pages/DashboardPatient";
import Login from "@/src/pages/Login";
import Register from "@/src/pages/Register";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
            <Route path="/dashboard/patient" element={<DashboardPatient />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <footer className="border-t border-neutral-200 py-8 bg-white mt-auto">
          <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
            © 2026 Smart Doctor Connect AI. Built for MTM AI Hackathon.
          </div>
        </footer>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
