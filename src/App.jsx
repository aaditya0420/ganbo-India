import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import FastChargers from "./pages/chargers/FastChargers";
import Cables from "./pages/cables/Cables";
import PowerBanks from "./pages/power-banks/PowerBanks";
import ProductDetails from "./pages/product/ProductDetails";
import Journal from "./pages/journal/Journal";
import JournalDetails from "./pages/journal/JournalDetails";
import Contact from "./pages/contact/Contact";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import TermsOfService from "./pages/terms/TermsOfService";
import ReturnPolicy from "./pages/return-policy/ReturnPolicy";
import NeckMounts from "./pages/neck-mounts/NeckMounts";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Hash links (e.g. #section) should keep their own scroll target
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/chargers" element={<FastChargers />} />
        <Route path="/cables" element={<Cables />} />
        <Route path="/power-banks" element={<PowerBanks />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalDetails />} />
        <Route path="/blogs" element={<Journal />} />
        <Route path="/blogs/:slug" element={<JournalDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/neck-mounts" element={<NeckMounts />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
