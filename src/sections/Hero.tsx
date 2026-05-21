import { motion } from "motion/react";
import { ArrowRight, Battery, Zap, Shield, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { SCOOTERS } from "../constants";
import SafeImage from "../components/SafeImage";

interface HeroProps {
  onEnquire?: () => void;
}

export default function Hero({ onEnquire }: HeroProps) {
  const dealershipPoints = [
    { hi: "कम निवेश, ज्यादा मुनाफा", en: "Authorized Dealer Support" },
    { hi: "Marketing Assistance", en: "Marketing Assistance" },
    { hi: "Spare Parts Support", en: "Spare Parts Support" },
    { hi: "Service Training", en: "Service Training" }
  ];

  return (
    <section className="relative min-h-[85vh] flex flex-col lg:flex-row overflow-hidden bg-brand-blue pt-16">
      {/* Left: Hero Banner */}
      <div className="lg:w-2/3 p-8 md:p-16 flex flex-col justify-center relative min-h-[60vh] lg:min-h-0">
        <div className="absolute inset-0 z-0 w-full h-full">
          <SafeImage 
            src="/src/assets/images/regenerated_image_1779182447179.jpg" 
            alt="Hero Banner" 
            fallbackType="banner"
            className="w-full h-full object-cover opacity-80 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-r from-brand-blue/60 via-brand-blue/40 to-transparent"></div>
        </div>

        {/* Glow Element */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="inline-block text-brand-green font-black text-sm tracking-[0.2em] uppercase mb-4">
            Future of Mobility
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] font-display italic tracking-tight uppercase">
            Join <span className="text-brand-green text-glow-green">Noori EV</span> &<br />
            Grow Your Business
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-lg">
            Authorized EV Scooter Dealership Opportunity Available. Step into the green revolution with Raees Motors.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onEnquire}
              className="bg-brand-green text-brand-blue px-10 py-5 rounded-lg font-black uppercase text-sm shadow-[0_0_20px_rgba(166,255,0,0.3)] hover:scale-105 transition-transform cursor-pointer"
            >
              Become Dealer
            </button>
            <button 
              onClick={onEnquire}
              className="border-2 border-white/20 text-white hover:border-brand-green px-10 py-5 rounded-lg font-black uppercase text-sm transition-all cursor-pointer"
            >
              View Scooters
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right: Dealership Opportunity Panel */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:w-1/3 bg-brand-green text-brand-blue p-8 md:p-12 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-black uppercase mb-2 tracking-tighter">Dealership Offer</h3>
          <h4 className="text-3xl font-display italic mb-8 leading-tight underline decoration-2 underline-offset-4">
            Low Investment, High Profit
          </h4>
          
          <ul className="space-y-5 font-bold">
            {dealershipPoints.map((point, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <div className="w-7 h-7 rounded-full border-2 border-brand-blue flex items-center justify-center text-xs shrink-0 group-hover:bg-brand-blue group-hover:text-brand-green transition-colors">
                  ✓
                </div>
                <span className="text-sm md:text-base">{point.en}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={onEnquire}
            className="mt-12 block bg-brand-blue text-white w-full py-5 rounded-full font-black uppercase tracking-tighter text-center hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
          >
            Book Your Dealership Today
          </button>
        </div>

        {/* Abstract background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-tr from-brand-blue/5 to-transparent flex items-center justify-center -z-0 opacity-10">
          <Zap size={300} className="text-brand-blue rotate-12" />
        </div>
      </motion.div>
    </section>
  );
}
