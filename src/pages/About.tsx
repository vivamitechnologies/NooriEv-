import { motion } from "motion/react";
import { BRAND_NAME, ADDRESS, PHONE_NUMBER } from "../constants";
import SafeImage from "../components/SafeImage";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Journey</h2>
            <h1 className="text-5xl font-bold text-brand-blue mb-8 font-display">Leading the Electric Revolution at Raees Motors</h1>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                {BRAND_NAME} is more than just a dealership; it's a commitment to a cleaner, greener future. Located in the heart of East Champaran, we bring the latest in EV technology to your doorstep.
              </p>
              <p>
                Our mission is to provide high-quality, efficient, and affordable electric mobility solutions that don't compromise on performance or style. With NOORI EV, we're bringing world-class engineering to the common man.
              </p>
              <div className="bg-brand-blue/5 p-8 rounded-[2rem] border-l-4 border-brand-green">
                <p className="italic text-brand-blue font-medium">
                  "We believe that every ride should be a step towards a better environment. Raees Motors is dedicated to serving the community with transparency and excellence."
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10 w-full h-full min-h-[300px]">
              <SafeImage 
                src="/src/assets/images/showroom_interior_1778998358772.png" 
                alt="Showroom" 
                fallbackType="showroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-green rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
