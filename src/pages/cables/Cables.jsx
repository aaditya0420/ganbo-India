import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import { images, getProductSlug, optimizeImage } from "../../data/products";
import { getCatalogProducts } from "../../utils/catalogFilters";

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
  {
    order: 0,
    name: "Fast Charging 100W Cable - Blue",
    subtitle: "1.2m braided USB-C to USB-C cable",
    image: cableProductImages[0],
    cableType: "c-to-c",
    color: "blue",
    badge: "New",
  },
  {
    order: 1,
    name: "Fast Charging 100W Cable - Pink",
    subtitle: "1.2m braided USB-C to USB-C cable",
    image: cableProductImages[1],
    cableType: "c-to-c",
    color: "pink",
    badge: "Popular",
  },
  {
    order: 2,
    name: "Fast Charging 100W Cable - Green",
    subtitle: "1.2m braided USB-C to USB-C cable",
    image: cableProductImages[2],
    cableType: "c-to-c",
    color: "green",
    badge: "Popular",
  },
  {
    order: 3,
    name: "Fast Charging 100W Cable USB A to C - Blue",
    subtitle: "1.2m braided USB-A to USB-C cable",
    image: cableProductImages[3],
    cableType: "a-to-c",
    color: "blue",
    badge: "Popular",
  },
  {
    order: 4,
    name: "Fast Charging 100W Cable USB A to C - Pink",
    subtitle: "1.2m braided USB-A to USB-C cable",
    image: cableProductImages[4],
    cableType: "a-to-c",
    color: "pink",
    badge: "Popular",
  },
  {
    order: 5,
    name: "Fast Charging 100W Cable USB A to C - Green",
    subtitle: "1.2m braided USB-A to USB-C cable",
    image: cableProductImages[5],
    cableType: "a-to-c",
    color: "green",
    badge: "Popular",
  },
  {
    order: 6,
    name: "Colourfull C to C Cable",
    subtitle: "1.2m colourful braided lanyard USB-C cable",
    image: cableProductImages[6],
    cableType: "c-to-c",
    color: "colourfull",
    badge: "New",
  },
];

const filterOptions = [
  { id: "all", label: "All Cables" },
  { id: "c-to-c", label: "USB-C to USB-C" },
  { id: "a-to-c", label: "USB-A to USB-C" },
  { id: "pink", label: "Pink" },
  { id: "green", label: "Green" },
  { id: "blue", label: "Blue" },
  { id: "new", label: "New" },
  { id: "popular", label: "Popular" },
];

const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "name-asc", label: "Name (A–Z)" },
  { id: "name-desc", label: "Name (Z–A)" },
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

        <Container className="mb-4 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Cables</h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              {visibleProducts.length} of {products.length} Precision Built
              Connections
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
                        category: "Cables",
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
                          category: "Cables",
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
                    {subtitle}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
              No cables match this filter. Try a different option.
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
