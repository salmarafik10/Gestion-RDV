import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import RdvBooking from "./components/RdvBooking";
import ProfilePage from "./components/ProfilePage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminServices from "./components/admin/AdminServices";
import AdminClients from "./components/admin/AdminClients";
import AdminAppointments from "./components/admin/AdminAppointments";
import AdminFeedback from "./components/admin/AdminFeedback";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/RdvBooking" element={<RdvBooking />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;