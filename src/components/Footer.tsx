import { Smartphone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { ADDRESS, BRAND_NAME, NAV_LINKS, PHONE_NUMBER } from "../constants";
// @ts-ignore
import logoImg from "../assets/images/noori_ev_logo_1779001469404.png";

export default function Footer() {
  return (
    <footer className="bg-footer-dark text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Noori EV Logo" 
              className="h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-widest font-medium">
            Revolutionizing urban mobility with eco-friendly, high-performance electric scooters. Join the green revolution today with NOORI EV.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-green hover:text-brand-blue transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-brand-green">Quick Links</h4>
          <ul className="space-y-4">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-white/60 hover:text-brand-green transition-colors text-[10px] uppercase font-bold tracking-widest">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-brand-green">Support</h4>
          <ul className="space-y-4">
            {NAV_LINKS.slice(5).map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-white/60 hover:text-brand-green transition-colors text-[10px] uppercase font-bold tracking-widest">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-brand-green">Visit showroom</h4>
          <ul className="space-y-5">
            <li className="flex gap-4 text-white/50 group">
              <MapPin size={18} className="text-brand-green shrink-0" />
              <span className="text-[10px] uppercase font-bold leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex gap-4 text-white/50">
              <Smartphone size={18} className="text-brand-green shrink-0" />
              <span className="text-[10px] uppercase font-bold">{PHONE_NUMBER}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.2em] font-black opacity-40">
        <p>© 2026 {BRAND_NAME}. All rights reserved.</p>
        <div className="flex gap-4">
          <p className="text-brand-green">Authorized EV Dealership</p>
          <span>|</span>
          <Link to="/admin" className="hover:text-brand-green hover:underline hover:opacity-100 transition-all">Dealer Console</Link>
        </div>
      </div>
    </footer>
  );
}
