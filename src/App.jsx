import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";

function AppContent() {
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking";

  return (
    <div className="min-h-screen bg-gray-100">
      {!isBookingPage && <Navbar />}
      <div className="full-width mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
