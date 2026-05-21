import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ScootersPage from "./pages/Scooters";
import DealershipPage from "./pages/DealershipPage";
import ServicesPage from "./pages/ServicesPage";
import SpareParts from "./pages/SpareParts";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="scooters" element={<ScootersPage />} />
          <Route path="dealership" element={<DealershipPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="spare-parts" element={<SpareParts />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
