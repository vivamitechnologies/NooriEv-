import Services from "../sections/Services";
import { motion } from "motion/react";

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <div className="bg-brand-blue text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">Comprehensive <span className="text-brand-green">Care</span></h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            From Sales to Service and Spare Parts, we provide end-to-end support for our riders and partners.
          </p>
        </div>
      </div>
      <Services />
    </motion.div>
  );
}
