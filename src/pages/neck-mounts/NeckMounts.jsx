import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import { images, getProductSlug, optimizeImage } from "../../data/products";

const heroImage =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785952668/cables-banner_cxvtot.png";

const technicalImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBryHIPKAtcSGXpbchdPerlNMd_max-UbAIWxzafKp14U1s3ih-qF9-rHbRRLhqbWapOPXTsZWuKOJXy__XgwOZsBVlbIKuJlwSuMOgij5gu9gnRQnpb6wzvnTRB1C6X2SBKcJkSBg-7wZkN_LvZ7qljZyU9kHo5S97WlRnGx7d2lDX4D8rfJpi0hJF59LayrTZighDr3bpRq_b-erKPXCIJBKPo1imHQapU6gyTmpvo13SHxw3bCrg_A29IAcZqnYFw06kbUZujqU";

const magneticNeckMountImage =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786393639/1_drve19.png";

const products = [["2 in 1 Magnetic Neck Mount", magneticNeckMountImage, "New"]];

const faqs = [
  [
    "Which devices are compatible with the GANBO neck mounts?",
    "Our mounts are designed with a universal interface compatible with GoPro, Insta360, DJI Action series, and any camera with a standard 1/4 inch tripod mount adapter.",
  ],
  [
    "Is it comfortable for long-duration use?",
    "Yes. The GANBO series features soft-touch medical-grade silicone and an ergonomic design to distribute weight evenly across the clavicle.",
  ],
  [
    "How stable is the footage during high-intensity movement?",
    "The reinforced flex-core allows you to lock the mount against your chest, providing stability and reducing vibration for smooth POV footage.",
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

export default function NeckMounts() {
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
      <Header active="" />
      <main className="pt-20 sm:pt-24">
        <section className="mb-10 px-4 sm:mb-14 sm:px-8 lg:mb-16 lg:px-16">
          <div className="glass-panel relative overflow-hidden rounded-xl bg-[#e8eef5]">
            <img
              src={optimizeImage(heroImage, 1600)}
              alt="GANBO neck mount in an outdoor studio scene"
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
            <h2 className="text-2xl font-bold sm:text-3xl">The POV Collection</h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {products.length} Precisely Engineered{" "}
              {products.length === 1 ? "Unit" : "Units"}
            </p>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100"
            >
              <Icon>filter_list</Icon>Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100"
            >
              Sort by: Recommended <Icon>expand_more</Icon>
            </button>
          </div>
        </Container>

        <Container className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map(([name, image, badge]) => (
            <Link
              key={name}
              to={`/product/${getProductSlug(name)}`}
              state={{
                catalogProduct: {
                  category: "Neck Mounts",
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
                src={technicalImage}
                alt="Engineering for stability technical view"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = images.charger;
                }}
              />
            </div>
            <div className="reveal-on-scroll order-1 md:order-2">
              <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
                Engineering for Stability
              </h2>
              <p className="mb-6 text-sm text-slate-600 sm:mb-8 sm:text-base">
                We don’t just build mounts; we solve the physics of motion.
              </p>
              <ul className="space-y-6 sm:space-y-8">
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Icon>balance</Icon>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Ergonomic Weight Distribution
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Contoured to rest naturally on the clavicle, reducing neck
                      strain during 8+ hours of use.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Icon>architecture</Icon>
                  </div>
                  <div>
                    <h4 className="font-semibold">Reinforced Flex-Core</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      A multi-strand internal wire allows 360-degree shaping
                      while maintaining rigid structural integrity.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Icon>videocam</Icon>
                  </div>
                  <div>
                    <h4 className="font-semibold">Universal Compatibility</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Integrated 1/4 inch mount and GoPro-style interface works
                      with major action camera systems.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Container>
        </section>

        <section className="mb-12 px-4 text-center sm:mb-16 sm:px-8 lg:px-16">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
            Universal Compatibility
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-7 text-slate-600 sm:mb-8 sm:text-base">
            Our mounts work seamlessly with every major action camera and mobile
            device.
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 sm:gap-10 lg:gap-12">
            {[
              ["videocam", "GoPro Hero"],
              ["camera_outdoor", "Insta360"],
              ["smartphone", "Mobile"],
              ["photo_camera", "DJI Action"],
              ["architecture", "1/4 Mount"],
            ].map(([icon, label]) => (
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
