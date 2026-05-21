import { motion } from "motion/react";
import { ShoppingBag, Wrench, Package, Headset } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: ShoppingBag,
      title: "Sales",
      description: "Wide range of premium electric scooters with flexible financing options.",
      color: "bg-blue-500"
    },
    {
      icon: Wrench,
      title: "Service",
      description: "Authorized service center with trained technicians and modern equipment.",
      color: "bg-brand-green"
    },
    {
      icon: Package,
      title: "Spare Parts",
      description: "100% genuine NOORI EV spare parts and accessories available in stock.",
      color: "bg-purple-500"
    },
    {
      icon: Headset,
      title: "Support",
      description: "Dedicated customer support for all your queries and technical needs.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-blue font-display">Premium Services for You</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-8 rounded-[2rem] hover:bg-brand-blue group transition-all duration-300 transform"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h4 className="text-2xl font-bold text-brand-blue mb-4 group-hover:text-white transition-colors">{service.title}</h4>
              <p className="text-gray-500 leading-relaxed group-hover:text-white/60 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
