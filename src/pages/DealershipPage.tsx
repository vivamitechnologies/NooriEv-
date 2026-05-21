import Dealership from "../sections/Dealership";
import Features from "../sections/Features";
import { motion } from "motion/react";
import { useOutletContext } from "react-router-dom";

export default function DealershipPage() {
  const { onEnquire } = useOutletContext<{ onEnquire: (scooterName?: string, isDealership?: boolean) => void }>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
       <div className="bg-brand-blue text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">Start Your <span className="text-brand-green">Business</span> Journey</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Authorized NOORI EV Dealership Opportunity. Low Investment, High Profit.
          </p>
        </div>
      </div>
      <Features />
      <Dealership onEnquire={onEnquire} />
    </motion.div>
  );
}
