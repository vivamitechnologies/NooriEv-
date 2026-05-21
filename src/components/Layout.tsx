import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import EnquiryModal from "./EnquiryModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalScooterName, setModalScooterName] = useState<string | undefined>(undefined);
  const [isDealershipMode, setIsDealershipMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleOpenEnquiry = (scooterName?: string, isDealership?: boolean) => {
    setModalScooterName(scooterName);
    setIsDealershipMode(!!isDealership);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onEnquire={() => handleOpenEnquiry()} />
      <main className="flex-grow">
        <Outlet context={{ onEnquire: handleOpenEnquiry }} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
        scooterName={modalScooterName}
        isDealership={isDealershipMode}
      />
    </div>
  );
}
