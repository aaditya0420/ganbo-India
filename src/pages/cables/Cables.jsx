import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import { images, getProductSlug, optimizeImage } from "../../data/products";

const cableBanner =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785952668/cables-banner_cxvtot.png";
const outlastImage =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785079445/3_%E8%AF%A6%E6%83%85%E9%A1%B5_efh7es.jpg";
const cableProductImages = [
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785686269/1_iyswes.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785686476/1_anv8p9.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785686491/1_txu2ff.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785955039/1_re9yx6.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785955370/1_qjtcln.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786391006/1_fyijs2.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786794397/1_gjcjqh.png",
  images.cable,
];
const products = [
  [
    "Fast Charging 100W Cable - Blue",
    "1.2m braided USB-C to USB-C cable",
    cableProductImages[0],
    "New",
  ],
  [
    "Fast Charging 100W Cable - Pink",
    "1.2m braided USB-C to USB-C cable",
    cableProductImages[1],
    "Popular",
  ],
  [
    "Fast Charging 100W Cable - Green",
    "1.2m braided USB-C to USB-C cable",
    cableProductImages[2],
    "Popular",
  ],
  [
    "Fast Charging 100W Cable USB A to C - Blue",
    "1.2m braided USB-A to USB-C cable",
    cableProductImages[3],
    "Popular",
  ],
  [
    "Fast Charging 100W Cable USB A to C - Pink",
    "1.2m braided USB-A to USB-C cable",
    cableProductImages[4],
    "Popular",
  ],
  [
    "Fast Charging 100W Cable USB A to C - Green",
    "1.2m braided USB-A to USB-C cable",
    cableProductImages[5],
    "Popular",
  ],
  [
    "Colourfull C to C Cable",
    "1.2m colourful braided lanyard USB-C cable",
    cableProductImages[6],
    "New",
  ],
];
const faqs = [
  [
    "Why choose a braided charging cable?",
    "Braided nylon protects the inner conductors from bends, pulls, and everyday friction. GANBO cables are built for reliable charging while staying flexible and easy to pack.",
  ],
  [
    "Do GANBO cables support fast charging?",
    "Yes. Our USB-C cables support Power Delivery charging up to their rated wattage and are designed to work with GANBO chargers, laptops, tablets, and phones.",
  ],
  [
    "Which cable length should I choose?",
    "A 1m cable is ideal for travel and bedside use. Choose 2m for desks and sofas, or 3m when you need comfortable reach across a workspace.",
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

export default function Cables() {
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
          state: { catalogProduct: { category: "Cables", title, image } },
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
      <Header active="Charging Cables" />
      <main className="pt-20 sm:pt-24">
        <section className="mb-10 px-4 sm:mb-14 sm:px-8 lg:mb-16 lg:px-16">
          <div className="glass-panel relative overflow-hidden rounded-xl bg-[#e8eef5]">
            <img
              src={optimizeImage(cableBanner, 1600)}
              alt="GANBO premium charging cable"
              decoding="async"
              fetchPriority="high"
              onError={(event) => {
                event.currentTarget.src = images.charger;
              }}
              className="block h-auto w-full"
            />
          </div>
        </section>

        <Container className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Cables</h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {products.length} Precision Built Connections
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
          {products.map(([name, description, image, badge]) => (
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
                  onError={(event) => {
                    event.currentTarget.src = images.cable;
                  }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />
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
                <p className="mt-1.5 text-center text-[11px] leading-snug text-slate-500 sm:mt-2 sm:text-xs">
                  {description}
                </p>
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
                Built to Outlast
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
                Every GANBO cable combines high-purity copper, reinforced
                joints, and a flexible braided exterior for fast, stable
                charging that keeps up with your day.
              </p>
              <ul className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                {[
                  [
                    "bolt",
                    "100W Fast Charging",
                    "Move power to laptops and phones at full speed.",
                  ],
                  [
                    "autorenew",
                    "30,000 Bend Tested",
                    "Flexible reinforcement protects every connection.",
                  ],
                  [
                    "sync",
                    "High-Speed Data",
                    "Transfer photos, video, and files without slowing down.",
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
                src={optimizeImage(outlastImage, 900)}
                alt="Braided GANBO cable detail"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = images.charger;
                }}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="glass-panel absolute -bottom-4 -left-2 rounded-xl p-4 text-black sm:-bottom-6 sm:-left-4 sm:p-5 lg:-bottom-8 lg:-left-8 lg:p-6">
                <div className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                  240W
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 sm:text-[10px]">
                  Peak Power Support
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="reveal-on-scroll mb-12 px-4 text-center sm:mb-16 sm:px-8">
          <h2 className="text-2xl sm:text-3xl">Made for Every Device</h2>
          <p className="mx-auto mb-6 mt-3 max-w-2xl text-sm text-slate-600 sm:mb-8 sm:mt-4 sm:text-lg">
            One dependable connection for your laptop, phone, tablet,
            headphones, and everything in between.
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
            Cable Queries
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
