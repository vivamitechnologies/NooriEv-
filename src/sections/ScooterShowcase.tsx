import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Battery, Zap, Gauge, ArrowRight, CheckCircle2, Download } from "lucide-react";
import { SCOOTERS } from "../constants";
import { useState } from "react";
import EnquiryModal from "../components/EnquiryModal";
import SafeImage from "../components/SafeImage";

export default function ScooterShowcase() {
  const [selectedScooter, setSelectedScooter] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquire = (name: string) => {
    setSelectedScooter(name);
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4 font-sans">Our Fleet</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-blue font-display">Engineered for Performance</h3>
          </div>
          <Link to="/scooters" className="text-brand-blue font-bold flex items-center gap-2 hover:text-brand-green transition-colors">
            View All Models <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCOOTERS.map((scooter, i) => (
            <motion.div
              key={scooter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 flex flex-col overflow-hidden hover:shadow-2xl transition-all h-full"
            >
              <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <h5 className="font-black text-xl md:text-2xl uppercase text-brand-blue tracking-tight leading-tight mb-1">{scooter.name}</h5>
                    <p className="text-brand-green font-bold text-xs uppercase tracking-wider">{scooter.battery}</p>
                  </div>
                  <div className="bg-brand-blue text-brand-green px-3 py-1.5 rounded-xl font-black text-sm md:text-base shrink-0">
                    {scooter.price.replace('*', '')}
                  </div>
                </div>

                <div className="relative aspect-[4/3] bg-gray-50 rounded-[2rem] overflow-hidden group flex items-center justify-center">
                  <Link to="/scooters" className="w-full h-full flex items-center justify-center">
                    <SafeImage 
                      src={scooter.image} 
                      alt={scooter.name}
                      fallbackType="scooter"
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="grid grid-cols-3 gap-2 mb-8 bg-gray-50 p-4 rounded-2xl">
                  <div className="text-center">
                    <Battery size={18} className="text-brand-green mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Range</p>
                    <p className="text-xs font-black text-brand-blue leading-none">{scooter.range}</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <Zap size={18} className="text-brand-green mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Charge</p>
                    <p className="text-xs font-black text-brand-blue leading-none">{scooter.chargingTime}</p>
                  </div>
                  <div className="text-center">
                    <Gauge size={18} className="text-brand-green mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Speed</p>
                    <p className="text-xs font-black text-brand-blue leading-none">{scooter.topSpeed}</p>
                  </div>
                </div>

                {scooter.features && (
                  <div className="mb-8 flex-grow">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Key Features</p>
                    <div className="grid grid-cols-1 gap-y-2">
                      {scooter.features.slice(0, 5).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-brand-blue/80">
                          <CheckCircle2 size={12} className="text-brand-green shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                      {scooter.features.length > 5 && (
                        <p className="text-[10px] font-bold text-brand-green mt-1 px-1">+{scooter.features.length - 5} More Features</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEnquire(scooter.name)}
                    className="flex-1 bg-brand-blue text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-blue/90 transition-colors shadow-lg shadow-brand-blue/20"
                  >
                    Order Now
                  </button>
                  <button 
                    className="aspect-square bg-gray-100 text-brand-blue flex items-center justify-center rounded-2xl hover:bg-brand-green transition-colors"
                    title="Download Brochure"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        scooterName={selectedScooter} 
      />
    </section>
  );
}
