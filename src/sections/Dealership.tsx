import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, Handshake, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import SafeImage from "../components/SafeImage";

interface DealershipProps {
  onEnquire?: (scooterName?: string, isDealership?: boolean) => void;
}

export default function Dealership({ onEnquire }: DealershipProps) {
  const points = [
    { text: "Low Investment, High Profit" },
    { text: "Authorized Dealer Support" },
    { text: "Marketing Assistance" },
    { text: "Spare Parts Support" },
    { text: "Service Training" }
  ];

  return (
    <section className="py-24 bg-brand-green relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-brand-blue rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-brand-green font-bold text-lg mb-4 tracking-wider uppercase">Become a Partner</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-[1.2]">
                Join <span className="text-brand-green italic">NOORI EV</span> & <br />
                Lead Your Local Market
              </h3>
              <p className="text-white/70 text-lg uppercase tracking-widest text-xs font-black font-sans bg-white/5 py-2 px-4 rounded-lg inline-block border border-white/10">
                Authorized EV Dealership Available
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {points.map((point, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 transition-colors hover:bg-white/10">
                  <CheckCircle2 className="text-brand-green shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-black leading-tight uppercase text-xs tracking-widest">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => onEnquire?.(undefined, true)}
              className="inline-block bg-brand-green text-brand-blue px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform glow-green cursor-pointer"
            >
              Book Your Dealership Today
            </button>
          </div>

          <div className="flex-1 relative w-full lg:w-auto">
            <div className="aspect-square bg-linear-to-tr from-brand-green/20 to-transparent rounded-[2rem] p-8 flex items-center justify-center relative overflow-hidden border border-white/5">
              <motion.div
                className="w-full h-full z-10"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 12 }}
              >
                <SafeImage 
                  src="/src/assets/images/regenerated_image_1778999311685.jpg" 
                  alt="Scooter" 
                  fallbackType="scooter"
                  className="w-full h-full object-contain drop-shadow-2xl bg-transparent"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-green)_0%,_transparent_70%)] opacity-20 blur-2xl"></div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-brand-green/10 p-3 rounded-2xl text-brand-green">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-brand-blue font-bold text-xl">40%+</p>
                  <p className="text-gray-400 text-xs font-medium">Annual Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
