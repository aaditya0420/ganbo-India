import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import { images, getProductSlug, optimizeImage } from "../../data/products";
import { getCatalogProducts } from "../../utils/catalogFilters";

const powerBankBanner =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785953943/powerbank-banner_iwgeon.png";
const powerBankProductImages = [
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786993219/10000mAh_Powerbank_jdds2w.png",
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786993295/20000_mAh_powerbank_ubua77.png",
];

const products = [
  {
    order: 0,
    name: "Fast Charging Powerbank 20000mAh",
    subtitle: "20,000mAh",
    image: powerBankProductImages[1],
    capacity: 20000,
    badge: "New",
  },
  {
    order: 1,
    name: "Fast Charging Powerbank 10000mAh",
    subtitle: "10,000mAh",
    image: powerBankProductImages[0],
    capacity: 10000,
  },
];

const filterOptions = [
  { id: "all", label: "All Power Banks" },
  { id: "10000mah", label: "10,000mAh" },
  { id: "20000mah", label: "20,000mAh" },
];

const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "name-asc", label: "Name (A–Z)" },
  { id: "name-desc", label: "Name (Z–A)" },
  { id: "capacity-asc", label: "Capacity (Low–High)" },
  { id: "capacity-desc", label: "Capacity (High–Low)" },
];
const faqs = [
  [
    "Are GANBO power banks flight safe?",
    "Yes, all GANBO power banks up to 27,000mAh (99.9Wh) are within international airline limits for carry-on luggage and are designed with layered safety protocols.",
  ],
  [
    "How long does it take to recharge the 20K model?",
    "Using a GANBO 65W wall charger, the Fast Charging Powerbank 20000mAh can be fully recharged in approximately 2.5 hours through its high-speed PD input.",
  ],
  [
    "Which capacity should I choose?",
    "5K is ideal for an emergency top-up, 10K is perfect for daily carry, 20K is best for travel and laptops, while 27K is designed for extended professional use.",
  ],
];
const blueprint =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785078192/20000%E8%AF%A6%E6%83%85%E9%A1%B55_4IN1_e7jxsg.jpg";

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

export default function PowerBanks() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recommended");

  const visibleProducts = useMemo(
    () => getCatalogProducts(products, { filter, sort }),
    [filter, sort],
  );

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
  }, [visibleProducts]);

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Power Banks" />
      <main className="pt-20 sm:pt-24">
        <section className="mb-10 px-4 sm:mb-14 sm:px-8 lg:mb-16 lg:px-16">
          <div className="glass-panel relative overflow-hidden rounded-xl bg-[#d7ebf8]">
            <img
              src={optimizeImage(powerBankBanner, 1600)}
              alt="GANBO portable power bank"
              onError={(event) => {
                event.currentTarget.src = images.charger;
              }}
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </div>
        </section>

        <Container className="mb-4 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Portable Power Banks
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {visibleProducts.length} of {products.length} High-Capacity Energy
              Cores
            </p>
          </div>
          <CatalogToolbar
            filter={filter}
            sort={sort}
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />
        </Container>

        <Container className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {visibleProducts.length > 0 ? (
            visibleProducts.map(({ name, subtitle, image, badge }) => (
              <article
                key={name}
                role="link"
                tabIndex={0}
                onClick={() =>
                  navigate(`/product/${getProductSlug(name)}`, {
                    state: {
                      catalogProduct: {
                        category: "Power Banks",
                        title: name,
                        image,
                      },
                    },
                  })
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/product/${getProductSlug(name)}`, {
                      state: {
                        catalogProduct: {
                          category: "Power Banks",
                          title: name,
                          image,
                        },
                      },
                    });
                  }
                }}
                className="reveal-on-scroll group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-500 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={optimizeImage(image, 700)}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.src = images.bank;
                    }}
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
                  <p className="mt-1.5 text-sm font-bold text-blue-600 sm:mt-2">
                    {subtitle}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
              No power banks match this filter. Try a different option.
            </p>
          )}
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
                The Architecture of Power
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
                Our V3 chipset is optimized for portable cells, managing
                high-density energy discharge with surgical precision.
              </p>
              <ul className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                {[
                  [
                    "bolt",
                    "Stacked Battery Tech",
                    "Multi-layer cell stacking increases energy density by 30%.",
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
                src={optimizeImage(blueprint, 900)}
                alt="GANBO power bank technical design"
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="glass-panel absolute -bottom-4 -left-2 rounded-xl p-4 text-black sm:-bottom-6 sm:-left-4 sm:p-5 lg:-bottom-8 lg:-left-8 lg:p-6">
                <div className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                  27K
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 sm:text-[10px]">
                  Max Capacity mAh
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="reveal-on-scroll mb-12 px-4 text-center sm:mb-16 sm:px-8">
          <h2 className="text-2xl sm:text-3xl">Universal Compatibility</h2>
          <p className="mx-auto mb-6 mt-3 max-w-2xl text-sm text-slate-600 sm:mb-8 sm:mt-4 sm:text-lg">
            From your smallest earbuds to high-performance laptops, GANBO
            delivers the exact energy needed.
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
