import Contact from "../sections/Contact";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <div className="bg-brand-blue text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">Let's <span className="text-brand-green">Connect</span></h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            We're here to answer your questions and help you start your journey with NOORI EV.
          </p>
        </div>
      </div>
      <Contact />
    </motion.div>
  );
}
