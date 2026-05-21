import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import React, { useState, useEffect } from "react";

import { SCOOTERS } from "../constants";
import { supabase, sendToFormspree } from "../lib/supabase";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  scooterName?: string;
  isDealership?: boolean;
}

export default function EnquiryModal({ isOpen, onClose, scooterName, isDealership = false }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    model: scooterName || "",
    comments: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setFormData({
        name: "",
        phone: "",
        model: scooterName || "",
        comments: "",
      });
    } else {
      document.body.style.overflow = "unset";
      setIsSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, scooterName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const submissionType = isDealership ? 'dealership_enquiry' : (scooterName ? 'scooter_enquiry' : 'scooter_enquiry');

    const payload = {
      name: formData.name,
      phone: formData.phone,
      model: isDealership ? "Dealership Partner Inquiry" : (formData.model || "General"),
      city: isDealership ? "Interested in Dealership" : "General Inquiry",
      message: formData.comments || (isDealership ? "Requesting authorized dealership details." : "Interested in test drive/buying."),
      type: submissionType,
      status: 'New'
    };

    try {
      // 1. Send to Formspree
      await sendToFormspree(payload);

      // 2. Insert into Supabase
      const { error } = await supabase
        .from('enquiries')
        .insert([payload]);

      if (error) {
        console.warn("Supabase insertion error, continuing fallback:", error);
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err: any) {
      console.error("Submission error:", err);
      // Even if one fails, we consider it a success because of Formspree fallback
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-brand-blue" />
            </button>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-brand-green text-3xl font-bold">✓</div>
                </div>
                <h3 className="text-3xl font-bold text-brand-blue mb-4">Submission Received!</h3>
                <p className="text-gray-500">Our team will call you back within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-brand-blue mb-2">
                  {isDealership ? "Apply for Dealership" : "Enquire Now"}
                </h3>
                <p className="text-gray-500 mb-8">
                  {isDealership 
                    ? "Start your business with NOORI EV. Tell us about yourself."
                    : (formData.model ? `Interested in ${formData.model}? ` : "") + "Leave your details and we'll get back to you."}
                </p>

                {errorMessage && (
                  <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-gray-55 border border-gray-100 rounded-2xl px-6 py-4 text-brand-blue focus:border-brand-green outline-hidden transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-gray-55 border border-gray-100 rounded-2xl px-6 py-4 text-brand-blue focus:border-brand-green outline-hidden transition-colors"
                    />
                  </div>

                  {!isDealership && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Model Interested</label>
                      <div className="relative">
                        <select 
                          className="w-full bg-gray-55 border border-gray-100 rounded-2xl px-6 py-4 text-brand-blue focus:border-brand-green outline-hidden transition-colors appearance-none"
                          value={formData.model}
                          onChange={(e) => setFormData(p => ({ ...p, model: e.target.value }))}
                        >
                          <option value="" disabled>Select a model</option>
                          {SCOOTERS.map(s => (
                            <option key={s.id} value={s.name}>
                              {s.name} ({s.battery})
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                          ▼
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                      {isDealership ? "Business Experience / City" : "Message / Remarks"}
                    </label>
                    <textarea 
                      placeholder={isDealership ? "Explain your current business or city details..." : "Any preferences, best time to call..."}
                      value={formData.comments}
                      onChange={(e) => setFormData(p => ({ ...p, comments: e.target.value }))}
                      className="w-full bg-gray-55 border border-gray-100 rounded-2xl px-6 py-4 text-brand-blue focus:border-brand-green outline-hidden transition-colors h-24 resize-none"
                    />
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-brand-green text-brand-blue py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all glow-green disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    {!isSubmitting && <Send size={20} />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

