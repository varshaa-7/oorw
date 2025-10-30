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

    function App() {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      return (
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-orange-50"> {/* Light orange background */}
            <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

            {/* Adjust padding based on Navbar height (h-16 -> pt-16) */}
            <main className={`flex-grow pt-16 pb-16 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/yatras" element={<Yatras />} />
                <Route path="/yatras/:id" element={<YatraDetails />} />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/registration" element={<Registration />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      );
    }

    export default App;
    

