import { useOutletContext } from "react-router-dom";
import { motion } from "motion/react";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import ScooterShowcase from "../sections/ScooterShowcase";
import Dealership from "../sections/Dealership";
import Services from "../sections/Services";
import Gallery from "../sections/Gallery";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

export default function Home() {
  const { onEnquire } = useOutletContext<{ onEnquire: () => void }>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero onEnquire={onEnquire} />
      <Features />
      <ScooterShowcase />
      <Dealership onEnquire={onEnquire} />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </motion.div>
  );
}
