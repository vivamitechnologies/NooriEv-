import { motion } from "motion/react";
import { TrendingUp, ShieldCheck, Wrench, Package } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Low Investment",
      description: "Start your business with affordable initial setup costs.",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: ShieldCheck,
      title: "High Profit Margin",
      description: "Enjoy lucrative returns on every scooter sale and service.",
      color: "bg-brand-green/10 text-brand-green"
    },
    {
      icon: Wrench,
      title: "Better Service Support",
      description: "24/7 technical assistance and training for your staff.",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      icon: Package,
      title: "Spare Parts Availability",
      description: "Ready stock of all genuine NOORI EV components.",
      color: "bg-orange-500/10 text-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4">Why Partner With Us?</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-blue font-display">Unbeatable Business Advantages</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-gray-100 hover:border-brand-green/50 transition-all hover:shadow-2xl hover:shadow-brand-green/5 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-brand-blue mb-4">{feature.title}</h4>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
