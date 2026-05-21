import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV_LINKS, PHONE_NUMBER } from "../constants";
// @ts-ignore
import logoImg from "../assets/images/noori_ev_logo_1779001469404.png";

interface HeaderProps {
  onEnquire?: () => void;
}

export default function Header({ onEnquire }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const shouldBeSolid = isScrolled || isMobileMenuOpen || !isHome;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeSolid ? "bg-brand-blue/95 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logoImg} 
            alt="Noori EV Logo" 
            className="h-14 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`transition-colors hover:text-brand-green ${
                location.pathname === link.href ? "text-brand-green" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onEnquire}
            className="flex items-center gap-2 bg-brand-green text-brand-blue px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-tighter hover:scale-105 transition-transform glow-green-hover shadow-[0_0_20px_rgba(166,255,0,0.4)] cursor-pointer"
          >
            Enquire Now
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-blue border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
                    location.pathname === link.href ? "bg-brand-green text-brand-blue" : "text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
