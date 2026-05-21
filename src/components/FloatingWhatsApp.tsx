import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../constants";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -5 }}
    >
      <MessageCircle size={28} />
      <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
        1
      </span>
    </motion.a>
  );
}
