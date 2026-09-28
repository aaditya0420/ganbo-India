import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import { images, getProductSlug, optimizeImage } from "../../data/products";

const heroImage =
  "https://res.cloudinary.com/deywq723/image/upload/v1790619748/PhotographyKItBanner_axsiv0.png";

const technicalImage =
  "https://res.cloudinary.com/deywq723/image/upload/v1790619678/4_lfhjdx.png";

const mobilePhotographyKitImage =
  "https://res.cloudinary.com/deywq723/image/upload/v1790619696/1_yulmfj.png";

const products = [
  ["Mobile Photography Kit", mobilePhotographyKitImage, "New"],
];

const highlights = [
  [
    "photo_camera",
    "Real Camera Feel",
    "An ergonomic grip with two-stage shutter, zoom lever, and mode switch turns your touchscreen into a true camera.",
  ],
  [
    "settings_remote",
    "33 ft Detachable Remote",
    "Pop off the magnetic controller and shoot from up to 33 feet away — perfect for group shots and tripod setups.",
  ],
  [
    "light_mode",
    "3-Mode Fill Light",
    "Warm, neutral, and cold lighting (2700K–7500K) with a 500mAh battery for flattering light anywhere.",
  ],
];

const compatibility = [
  ["phone_iphone", "MagSafe iPhone"],
  ["smartphone", "Android + Ring"],
  ["photo_camera", "Selfies"],
  ["videocam", "Vlogging"],
  ["architecture", "1/4 Tripod"],
];

const faqs = [
  [
    "Which phones are compatible with the GANBO Mobile Photography Kit?",
    "The kit works directly with MagSafe iPhones. For Android and other phones, use a magnetic case or the included magnetic ring to get a secure 3.5 kg magnetic hold.",
  ],
  [
    "How far does the remote shutter work?",
    "The detachable magnetic remote works up to 33 feet (about 10 m) away, so you can mount your phone on a tripod and capture group shots or full-body photos with ease.",
  ],
  [
    "How long does the fill light last on a single charge?",
    "The 500mAh battery gives about 55 minutes at maximum brightness and up to 520 minutes at the lowest brightness, across warm, neutral, and cold modes.",
  ],
];

function Icon({ children }) {
  return <span className="material-symbols-outlined">{children}</span>;
}

function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

export default function PhoneGear() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    const targets = document.querySelectorAll(".reveal-on-scroll");
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Phone Gear" />
      <main className="pt-20 sm:pt-24">
        <section className="mb-10 px-4 sm:mb-14 sm:px-8 lg:mb-16 lg:px-16">
          <div className="glass-panel relative overflow-hidden rounded-xl bg-[#e8eef5]">
            <img
              src={optimizeImage(heroImage, 1600)}
              alt="GANBO Mobile Photography Kit with camera grip, fill light, and carry case"
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full"
              onError={(event) => {
                event.currentTarget.src = images.charger;
              }}
            />
          </div>
        </section>

        <Container className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              The Creator Collection
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {products.length} Precisely Engineered{" "}
              {products.length === 1 ? "Unit" : "Units"}
            </p>
          </div>
        </Container>

        <Container className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map(([name, image, badge]) => (
            <Link
              key={name}
              to={`/product/${getProductSlug(name)}`}
              state={{
                catalogProduct: {
                  category: "Phone Gear",
                  title: name,
                  image,
                },
              }}
              className="reveal-on-scroll group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={optimizeImage(image, 700)}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = images.charger;
                  }}
                />
                {badge && (
                  <span className="absolute left-2 top-2 rounded-sm bg-blue-600 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
                    {badge}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center p-3 sm:p-5 lg:p-6">
                <h3 className="text-center text-xs font-semibold leading-snug sm:text-sm">
                  {name}
                </h3>
              </div>
            </Link>
          ))}
        </Container>

        <section className="mb-12 bg-slate-100 py-12 sm:mb-16 sm:py-16 lg:py-24">
          <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="reveal-on-scroll order-2 md:order-1">
              <img
                className="w-full rounded-xl shadow-lg"
                src={optimizeImage(technicalImage, 1200)}
                alt="GANBO magnetic camera grip with 3.5 kg magnetic hold"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = images.charger;
                }}
              />
            </div>
            <div className="reveal-on-scroll order-1 md:order-2">
              <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
                Pro Tools for Stunning Shots
              </h2>
              <p className="mb-6 text-sm text-slate-600 sm:mb-8 sm:text-base">
                Turn your smartphone into a professional camera with one
                all-in-one kit.
              </p>
              <ul className="space-y-6 sm:space-y-8">
                {highlights.map(([icon, title, text]) => (
                  <li key={title} className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
                      <Icon>{icon}</Icon>
                    </div>
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="mb-12 px-4 text-center sm:mb-16 sm:px-8 lg:px-16">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
            Made for Every Creator
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-7 text-slate-600 sm:mb-8 sm:text-base">
            Works with MagSafe iPhones and magnetic-ready Android phones, from
            everyday selfies to travel vlogs.
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 sm:gap-10 lg:gap-12">
            {compatibility.map(([icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon>{icon}</Icon>
                <span className="text-[9px] font-bold uppercase tracking-widest sm:text-[10px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-12 max-w-3xl px-4 sm:mb-16 sm:px-8">
          <h2 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
            Power Queries
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map(([question, answer], index) => (
              <AccordionItem
                key={question}
                title={question}
                isOpen={openFaq === index}
                onToggle={() =>
                  setOpenFaq((current) => (current === index ? null : index))
                }
              >
                {answer}
              </AccordionItem>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
