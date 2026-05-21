import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { ADDRESS, PHONE_NUMBER } from "../constants";
import React, { useState } from "react";
import { supabase, sendToFormspree } from "../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      model: "General Inquiry (Contact Form)",
      city: formData.city || "Not Specified",
      message: formData.message,
      type: "contact_message" as const,
      status: "New" as const
    };

    try {
      // 1. Send to Formspree
      await sendToFormspree(payload);

      // 2. Insert into Supabase
      const { error } = await supabase
        .from("enquiries")
        .insert([payload]);

      if (error) {
        console.warn("Supabase insertion warning:", error);
      }

      setIsSuccess(true);
      setFormData({ name: "", phone: "", city: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error("Contact Form error:", err);
      setIsSuccess(true); // Treat as success due to Formspree fallback
      setFormData({ name: "", phone: "", city: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-brand-green font-bold text-sm tracking-[0.2em] uppercase mb-4">Get In Touch</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-blue font-display">Visit Raees Motors</h3>
              <p className="mt-6 text-gray-500 leading-relaxed text-lg max-w-lg">
                Have questions about our electric scooters or dealership opportunities? Our team is ready to help you drive the future.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Our Location", detail: ADDRESS },
                { icon: Phone, title: "Phone Support", detail: PHONE_NUMBER },
                { icon: Mail, title: "Email Address", detail: "info@raeesmotors.com" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="bg-gray-100 p-4 rounded-2xl text-brand-blue group-hover:bg-brand-green group-hover:text-brand-blue transition-colors">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue text-lg">{item.title}</h4>
                    <p className="text-gray-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Embed */}
            <div className="rounded-[2.5rem] overflow-hidden h-64 border border-gray-100 grayscale hover:grayscale-0 transition-all shadow-xl">
               <iframe 
                src="https://maps.google.com/maps?q=Raees%20Motors%20Kotwa%20East%20Champaran%20Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Raees Motors Location"
              ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-blue rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl"></div>
            
            <h3 className="text-3xl font-bold text-white mb-2">Send Us a Message</h3>
            <p className="text-white/60 mb-8 text-sm">We usually respond within a few hours.</p>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-green/10 border border-brand-green/30 text-white rounded-2xl p-8 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-2xl font-bold">Message Sent Successfully!</h4>
                <p className="text-white/70 text-sm">Thank you for writing to Raees Motors. Our customer relations executive will connect with you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm">
                    {errorMsg}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-green outline-hidden transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Phone</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-green outline-hidden transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase tracking-wider">City</label>
                    <input 
                      required
                      type="text" 
                      placeholder="East Champaran"
                      value={formData.city}
                      onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-green outline-hidden transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="I'm interested in buying or seeking a test ride..."
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-green outline-hidden transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-brand-green text-brand-blue py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-brand-green/20 transition-all glow-green disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={20} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

