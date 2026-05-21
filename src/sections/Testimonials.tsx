import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sanjay Kumar",
      role: "Business Owner, Patna",
      text: "Joining NOORI EV as a dealer was the best business decision. The profit margins are great and the support from Raees Motors is unmatched.",
      rating: 5
    },
    {
      name: "Amit Singh",
      role: "Customer, Kotwa",
      text: "The NOORI Bolt is amazing! I've been driving it for 6 months and have saved so much on fuel. Highly recommended for daily commute.",
      rating: 5
    },
    {
      name: "Rajesh Mishra",
      role: "Dealer Partner, Muzaffarpur",
      text: "Top-notch training and spare parts support. NOORI EV makes it easy for us to maintain customer satisfaction.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4">Happy Partners</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-blue font-display">Success Stories</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-10 rounded-[2.5rem] relative group"
            >
              <Quote className="absolute top-8 right-8 text-brand-green/20" size={48} />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-green text-brand-green" />
                ))}
              </div>
              <p className="text-gray-600 italic text-lg leading-relaxed mb-8 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue">{t.name}</h4>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
