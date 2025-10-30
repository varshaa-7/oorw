import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Import Pages
import Home from './pages/Home.jsx';
import Yatras from './pages/Yatras.jsx';
import YatraDetails from './pages/YatraDetails.jsx';
import Guidelines from './pages/Guidelines.jsx';
import Contact from './pages/Contact.jsx';
import Registration from './pages/Registration.jsx';

// --- NEW ADMIN IMPORTS ---
import AdminLogin from './pages/AdminLogin.jsx'; // NEW
import AdminDashboard from './pages/AdminDashboard.jsx'; // NEW
import AdminRegister from './pages/AdminRegister.jsx';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-orange-50">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className={`flex-grow pt-16 pb-16 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/yatras" element={<Yatras />} />
            <Route path="/yatras/:id" element={<YatraDetails />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/registration" element={<Registration />} />
            
            {/* --- NEW ADMIN ROUTES --- */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;