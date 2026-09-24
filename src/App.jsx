import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

/** Home stays eager — most common entry; faster first paint. */
import Home from "./pages/home/Home";

const About = lazy(() => import("./pages/about/About"));
const FastChargers = lazy(() => import("./pages/chargers/FastChargers"));
const Cables = lazy(() => import("./pages/cables/Cables"));
const PowerBanks = lazy(() => import("./pages/power-banks/PowerBanks"));
const ProductDetails = lazy(() => import("./pages/product/ProductDetails"));
const Journal = lazy(() => import("./pages/journal/Journal"));
const JournalDetails = lazy(() => import("./pages/journal/JournalDetails"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/privacy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/terms/TermsOfService"));
const ReturnPolicy = lazy(() => import("./pages/return-policy/ReturnPolicy"));
const NeckMounts = lazy(() => import("./pages/neck-mounts/NeckMounts"));
const WarrantyClaim = lazy(() => import("./pages/warranty/WarrantyClaim"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Hash links (e.g. #section) should keep their own scroll target
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function PageFallback() {
  return (
    <div
      className="grid min-h-[50vh] place-items-center bg-[#faf9ff] text-slate-500"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm tracking-wide">Loading…</span>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
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
          <Route path="/warranty-claim" element={<WarrantyClaim />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/neck-mounts" element={<NeckMounts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
