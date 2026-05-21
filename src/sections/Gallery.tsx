import { motion } from "motion/react";
import { ZoomIn } from "lucide-react";
import SafeImage from "../components/SafeImage";

export default function Gallery() {
  const images = [
    "/src/assets/images/regenerated_image_1779001295972.jpg",
    "/src/assets/images/regenerated_image_1778999507755.jpg",
    "/src/assets/images/regenerated_image_1778999718740.jpg",
    "/src/assets/images/scooter_model_2_1778998344644.png",
    "/src/assets/images/regenerated_image_1779001295972.jpg",
    "/src/assets/images/showroom_interior_1778998358772.png"
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Space</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-blue font-display">Experience the Vibe</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer ${
                i === 1 ? "row-span-2 col-span-1" : ""
              } ${i === 4 ? "col-span-2" : ""}`}
            >
              <SafeImage 
                src={src} 
                alt={`Gallery ${i}`} 
                fallbackType="gallery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-brand-green" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
