import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import { getProductSlug, optimizeImage } from "../../data/products";

const products = [
  [
    "Fast Charger 22.5W White",
    "$29.00",
    "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786991911/22.5W_charger_xq2dk8.png",
  ],
  [
    "Fast Charger 45W Black",
    "$45.00",
    "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786991980/45W_Black_aswkf0.png",
  ],
  [
    "Fast Charger 45W White",
    "$45.00",
    "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786992070/45W_White_bucws7.png",
  ],
  [
    "Fast Charger 65W White",
    "$69.00",
    "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786992098/65W_White_pihu6x.png",
  ],
  [
    "Fast Charger 65W Black",
    "$69.00",
    "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786992080/65W_Black_hulav6.png",
  ],
];
const faqs = [
  [
    "Read More about Fast Chargers",
    "Our fast chargers utilize GaN (Gallium Nitride) technology, which allows for higher voltage efficiency and thermal stability compared to traditional silicon chargers. This means more power in a smaller, safer package. All GANBO chargers support Power Delivery (PD) and Quick Charge protocols.",
  ],
  [
    "Is GaN technology safe for my phone?",
    "Absolutely. GANBO chargers feature multi-layer safety systems including over-voltage, over-current, and short-circuit protection. The GaN circuitry also operates much cooler than traditional chargers.",
  ],
  [
    "Which wattage do I need?",
    "22.5W is perfect for iPhones and smaller smartphones. 45W is ideal for tablets and fast-charging Android phones. 65W is recommended for MacBooks and USB-C laptops.",
  ],
];
const blueprint =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHf0kRnxDIfY1MpQp1lO3iRbZv7gpBmAq3CDm9qDZSQml927UN9jLBEYmdQllO6R8fnlWvogtj3vHHBFJjvOlQiS9AUg2cL2dPICedsBClD9U8VcXYE7fnt4rdm374jf5WY_PoJzEOfvbXEWgsXi1t5zA-VaR0Unf-6NZp89tSrmOJEPwxKY-e3fZ--0KGTf24kj00aHycmvfQwuEhjM_fhDKxdC4M3kP2kpVhsCb_65dLc679DV7E0BXJU0ta13BVbJ7zaCVCCHU";

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

export default function FastChargers() {
  const navigate = useNavigate();
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

    const onCardClick = (event) => {
      const card = event.target.closest("article");
      const title = card?.querySelector("h3")?.textContent;
      const image = card?.querySelector("img")?.src;
      if (title)
        navigate(`/product/${getProductSlug(title)}`, {
          state: { catalogProduct: { category: "Chargers", title, image } },
        });
    };
    const cards = document.querySelectorAll("article");
    cards.forEach((card) => card.addEventListener("click", onCardClick));

    return () => {
      observer.disconnect();
      cards.forEach((card) => card.removeEventListener("click", onCardClick));
    };
  }, [navigate]);

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Fast Chargers" />
      <main className="pt-20 sm:pt-24">
        <section className="mb-10 px-4 sm:mb-14 sm:px-8 lg:mb-16 lg:px-16">
          <div className="glass-panel relative overflow-hidden rounded-xl bg-[#d7ebf8]">
            <img
              src={optimizeImage(
                "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785953324/charger-banner_bqhnsk.png",
                1600,
              )}
              alt="GANBO fast charger collection"
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </div>
        </section>

        <Container className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Fast Chargers</h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {products.length} Precise Engineered Units
            </p>
          </div>
          <div className="hidden gap-3 lg:flex">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm"
            >
              <Icon>filter_list</Icon>Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm"
            >
              Sort by: Recommended <Icon>expand_more</Icon>
            </button>
          </div>
        </Container>

        <Container className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map(([name, , image, badge]) => (
            <article
              key={name}
              className="reveal-on-scroll group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={optimizeImage(image, 700)}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                {badge && (
                  <span className="absolute right-2 top-2 rounded-sm bg-blue-600 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white sm:right-4 sm:top-4 sm:px-3 sm:text-[10px]">
                    {badge}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center p-3 sm:p-5 lg:p-6">
                <h3 className="text-center text-xs font-semibold leading-snug sm:text-sm">
                  {name}
                </h3>
              </div>
            </article>
          ))}
        </Container>

        <section className="relative mb-12 overflow-hidden bg-black py-12 text-white sm:mb-16 sm:py-16 lg:py-24">
          <svg
            className="blueprint-line absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q50,0 100,20 T200,20"
              fill="none"
              stroke="white"
              strokeWidth="0.1"
            />
            <path
              d="M0,50 Q50,30 100,50 T200,50"
              fill="none"
              stroke="white"
              strokeWidth="0.1"
            />
            <path
              d="M0,80 Q50,60 100,80 T200,80"
              fill="none"
              stroke="white"
              strokeWidth="0.1"
            />
          </svg>
          <Container className="relative z-10 grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="reveal-on-scroll">
              <h2 className="text-3xl uppercase tracking-[-.04em] sm:text-4xl lg:text-6xl">
                GaN Evolution
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
                Gallium Nitride allows us to pack immense power into
                ultra-compact shells. It runs cooler, charges faster, and stays
                smaller than traditional silicon.
              </p>
              <ul className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                {[
                  [
                    "bolt",
                    "3x Faster Efficiency",
                    "Optimized energy flow reduces heat loss by 40%",
                  ],
                  [
                    "compress",
                    "50% Smaller Footprint",
                    "Pocket-sized power that outperforms bulky bricks.",
                  ],
                  [
                    "shield",
                    "GANBO AI Safety",
                    "Real-time thermal monitoring 80,000 times per hour.",
                  ],
                ].map(([icon, title, text]) => (
                  <li key={title} className="flex items-start gap-3 sm:gap-4">
                    <span className="mt-0.5 shrink-0 text-blue-300">
                      <Icon>{icon}</Icon>
                    </span>
                    <div>
                      <h4 className="font-bold">{title}</h4>
                      <p className="mt-1 text-sm text-slate-400">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-on-scroll relative">
              <img
                src={blueprint}
                alt="Exploded technical view of a GANBO charger"
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="glass-panel absolute -bottom-4 -left-2 rounded-xl p-4 text-black sm:-bottom-6 sm:-left-4 sm:p-5 lg:-bottom-8 lg:-left-8 lg:p-6">
                <div className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                  65W
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 sm:text-[10px]">
                  Peak Output Capability
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="reveal-on-scroll mb-12 px-4 text-center sm:mb-16 sm:px-8">
          <h2 className="text-2xl sm:text-3xl">Universal Compatibility</h2>
          <p className="mx-auto mb-6 mt-3 max-w-2xl text-sm text-slate-600 sm:mb-8 sm:mt-4 sm:text-lg">
            From your smallest earbuds to high-performance laptops, GANBO
            delivers the exact voltage needed.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-700 opacity-50 grayscale transition duration-500 hover:grayscale-0 sm:gap-10">
            <Icon>laptop_mac</Icon>
            <Icon>smartphone</Icon>
            <Icon>tablet_mac</Icon>
            <Icon>headphones</Icon>
            <Icon>watch</Icon>
            <Icon>gamepad</Icon>
          </div>
        </section>

        <section className="reveal-on-scroll mx-auto mb-12 max-w-3xl px-4 sm:mb-16 sm:px-8">
          <h2 className="mb-6 text-center text-2xl sm:mb-8 sm:text-3xl">
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
