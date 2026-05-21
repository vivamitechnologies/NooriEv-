import { motion } from "motion/react";
import { Package, Wrench, Settings, Shield } from "lucide-react";

export default function SpareParts() {
  const parts = [
    { title: "Lithium Batteries", icon: Settings },
    { title: "Electric Motors", icon: Zap },
    { title: "Controller Units", icon: Package },
    { title: "Braking Systems", icon: Shield },
    { title: "Tires & Rims", icon: Settings },
    { title: "Body Panels", icon: Package }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 pb-24"
    >
      <div className="bg-brand-blue text-white py-24 text-center mb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">Genuine <span className="text-brand-green">Spare Parts</span></h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Ensure long life and peak performance with authentic NOORI EV components.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green mb-6">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-4">Quality Component {i}</h3>
              <p className="text-gray-500 mb-6">High-performance part designed specifically for NOORI EV models.</p>
              <button className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Enquire for Part <div className="w-6 h-px bg-brand-green"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Fixed import
import { Zap } from "lucide-react";
