import Gallery from "../sections/Gallery";
import { motion } from "motion/react";

export default function GalleryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      <div className="bg-brand-blue text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">Visual <span className="text-brand-green">Showcase</span></h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Take a look at our showroom, our scooters, and our satisfied community.
          </p>
        </div>
      </div>
      <Gallery />
    </motion.div>
  );
}
