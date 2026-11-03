import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { optimizeImage, products as catalog } from "../../data/products";
import bannerCases from "../../assets/home-banner-1.jpg";
import bannerCharge from "../../assets/home-banner-2.jpg";

const charger =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786989315/65W_Black_k03uul.png";
const bank =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786989280/ChatGPT_Image_Aug_17_2026_11_24_17_PM_rfupmf.png";
const cable =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785073591/1_mujmis.jpg";
const neckMount =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785076232/neckmountImage_f2gpg1.webp";
const phoneGear =
  "https://res.cloudinary.com/deywq723/image/upload/v1790619696/1_yulmfj.png";
const platformBanner =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786553091/Frame_2147226235_vynxrg.png";
const ganLifestyle =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786991506/chargerEngineered_q8esqc.png";
const creatorLifestyle =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785076232/neckmountImage_f2gpg1.webp";

const slides = [
  {
    image: bannerCases,
    cloudinary: false,
    title: "GaN CHARGERS",
    subtitle: "Faster. Smaller. Cooler.",
    cta: "Shop Now",
    to: "/chargers",
  },
  {
    image: bannerCharge,
    cloudinary: false,
    title: "POWER UP EVERYTHING",
    subtitle: "GaN chargers, power banks and more.",
    cta: "Shop Now",
    to: "/power-banks",
  },
];

const categoryTabs = [
  {
    id: "charging",
    label: "Charging",
    viewAll: "/chargers",
    items: [
      ["GaN Chargers", charger, "/chargers"],
      ["Power Banks", bank, "/power-banks"],
      ["Cables", cable, "/cables"],
      ["Neck Mounts", neckMount, "/neck-mounts"],
    ],
  },
  {
    id: "power",
    label: "Power",
    viewAll: "/power-banks",
    items: [
      ["Power Banks", bank, "/power-banks"],
      ["GaN Chargers", charger, "/chargers"],
      ["Cables", cable, "/cables"],
      ["Phone Gear", phoneGear, "/phone-gear"],
    ],
  },
  {
    id: "gear",
    label: "Gear",
    viewAll: "/phone-gear",
    items: [
      ["Phone Gear", phoneGear, "/phone-gear"],
      ["Neck Mounts", neckMount, "/neck-mounts"],
      ["Cables", cable, "/cables"],
      ["GaN Chargers", charger, "/chargers"],
    ],
  },
];

const trending = [
  ["GaN SERIES", "Power that stays cool", ganLifestyle, "/chargers"],
  ["POWER SERIES", "Built for long days", bank, "/power-banks"],
  ["CREATOR SERIES", "Capture every angle", creatorLifestyle, "/phone-gear"],
];

const newInTech = [
  ["fast-charger-65w-white", "Available in 3 colours"],
  ["fast-charging-powerbank-20000mah", "Available in 2 capacities"],
  ["colourfull-c-to-c-cable", "Available in multiple variants"],
  ["fast-charger-45w-black", "Compact dual-port GaN"],
];

const newInStyle = [
  ["2-in-1-magnetic-neck-mount", "Hands-free POV shooting"],
  ["mobile-photography-kit", "Grip, light and carry case"],
  ["4-in-1-portable-data-cable", "Four connections, one cable"],
];

const bestsellers = [
  [
    "fast-charging-powerbank-20000mah",
    "High-Capacity Laptop Power",
    "35W Fast Charge | Dual Output",
  ],
  [
    "fast-charging-powerbank-10000mah",
    "Slim Everyday Power Bank",
    "22.5W Fast Charge | Pocket Size",
  ],
  [
    "fast-charger-65w-white",
    "High-Speed GaN Charging",
    "65W GaN | 3-Port Output",
  ],
  [
    "fast-charger-45w-black",
    "Compact Everyday Charger",
    "45W GaN | Dual Port",
  ],
];

function Icon({ children }) {
  return <span className="material-symbols-outlined">{children}</span>;
}

function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHead({ title, to }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
      <h2 className="text-[22px] font-bold tracking-tight text-[#0b1220] sm:text-2xl lg:text-[28px]">
        {title}
      </h2>
      {to ? (
        <Link
          to={to}
          className="shrink-0 text-[13px] font-medium text-[#0b1220] underline underline-offset-[3px] hover:opacity-70"
        >
          View All
        </Link>
      ) : null}
    </div>
  );
}

function ScrollRail({
  children,
  gridClassName = "xl:grid xl:grid-cols-4",
  contentKey = "",
}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(0.28);
  const [canScroll, setCanScroll] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const scrollable = max > 8;
    setCanScroll(scrollable);
    setProgress(scrollable ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
    setThumbRatio(scrollable ? 0.28 : 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
    const frame = window.requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, contentKey]);

  const scrollByCard = (dir) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-rail-card]");
    const amount = card
      ? card.getBoundingClientRect().width + 12
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const thumbPct = thumbRatio * 100;
  const thumbLeft = progress * (100 - thumbPct);

  return (
    <div>
      <div className="relative">
        <div
          ref={ref}
          className={`flex snap-x snap-proximity gap-3 overflow-x-auto overscroll-x-contain pb-1 hide-scrollbar sm:gap-5 xl:overflow-visible ${gridClassName}`}
        >
          {children}
        </div>
        {canScroll ? (
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="absolute -right-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-slate-50 xl:grid"
          >
            <Icon>chevron_right</Icon>
          </button>
        ) : null}
      </div>

      {canScroll ? (
        <div
          className="mx-auto mt-5 flex h-4 w-[46%] max-w-[220px] items-center xl:hidden"
          aria-hidden="true"
        >
          <div className="relative h-[2px] w-full rounded-full bg-[#d7d7d7]">
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#1a1a1a] transition-[left] duration-150 ease-out"
              style={{ left: `${thumbLeft}%`, width: `${thumbPct}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next) => setIndex((current) => (current + next + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(id);
  }, [go, paused]);

  const slide = slides[index];

  return (
    <section
      className="relative bg-[#f3f1ea] pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[calc(100svh-4rem)] min-h-[420px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((item) => (
            <div
              key={item.title}
              className="relative h-full min-w-full shrink-0"
            >
              <img
                src={item.cloudinary ? optimizeImage(item.image, 1920) : item.image}
                alt={item.title}
                fetchPriority={item === slides[0] ? "high" : "low"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-end px-5 pb-10 sm:items-center sm:px-20 sm:pb-0 lg:px-24">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0b1220] sm:text-4xl lg:text-5xl xl:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-2 text-sm text-[#0b1220]/75 sm:mt-3 sm:text-base lg:text-lg">
              {slide.subtitle}
            </p>
            <Link
              to={slide.to}
              className="mt-5 inline-flex h-11 items-center justify-center bg-[#0b1220] px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-black sm:mt-6 sm:h-12 sm:px-8"
            >
              {slide.cta}
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous banner"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow sm:grid lg:left-5"
        >
          <Icon>chevron_left</Icon>
        </button>
        <button
          type="button"
          aria-label="Next banner"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow sm:grid lg:right-5"
        >
          <Icon>chevron_right</Icon>
        </button>

        <div className="absolute bottom-4 right-5 flex items-center gap-1.5 sm:bottom-6 sm:right-10 lg:right-16">
          {slides.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? true : undefined}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${
                i === index ? "w-7 bg-[#0b1220]" : "w-2 bg-[#0b1220]/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopByCategory() {
  const [tabId, setTabId] = useState(categoryTabs[0].id);
  const tab = categoryTabs.find((item) => item.id === tabId) ?? categoryTabs[0];

  return (
    <section id="categories" className="scroll-mt-20 bg-white py-10 sm:py-14 lg:py-20">
      <Container>
        <SectionHead title="SHOP BY CATEGORY" to={tab.viewAll} />
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 hide-scrollbar sm:mb-6 sm:flex-wrap">
          {categoryTabs.map((item) => {
            const active = item.id === tab.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTabId(item.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#0b1220] text-white"
                    : "border border-slate-300 bg-white text-[#0b1220] hover:border-slate-500"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <ScrollRail contentKey={tab.id}>
          {tab.items.map(([title, image, path]) => (
            <Link
              key={`${tab.id}-${title}`}
              to={path}
              data-rail-card
              className="w-[44vw] max-w-[210px] shrink-0 snap-start sm:w-[200px] xl:w-auto xl:max-w-none"
            >
              <div className="aspect-square overflow-hidden rounded-md bg-[#eef1f6]">
                <img
                  src={optimizeImage(image, 700)}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <h3 className="mt-2.5 text-[13px] font-semibold leading-snug text-[#0b1220] sm:mt-3 sm:text-base">
                {title}
              </h3>
            </Link>
          ))}
        </ScrollRail>
      </Container>
    </section>
  );
}

function ProductRail({ title, to, items }) {
  const cols =
    items.length <= 3 ? "xl:grid xl:grid-cols-3" : "xl:grid xl:grid-cols-4";
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <Container>
        <SectionHead title={title} to={to} />
        <ScrollRail gridClassName={cols} contentKey={title}>
          {items.map(([id, subtitle]) => {
            const item = catalog[id];
            if (!item) return null;
            return (
              <Link
                key={id}
                to={`/product/${id}`}
                data-rail-card
                className="w-[44vw] max-w-[210px] shrink-0 snap-start sm:w-[200px] xl:w-auto xl:max-w-none"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-[#f3f5f9]">
                  <img
                    src={optimizeImage(item.image, 700)}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-5 transition duration-500 hover:scale-[1.04] sm:p-6"
                  />
                </div>
                <h3 className="mt-2.5 line-clamp-2 text-[13px] font-semibold leading-snug text-[#0b1220] sm:mt-3 sm:text-[15px]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[12px] text-slate-500 sm:text-sm">
                  {subtitle}
                </p>
              </Link>
            );
          })}
        </ScrollRail>
      </Container>
    </section>
  );
}

function TrendingCollection() {
  return (
    <section className="bg-white py-8 sm:py-12 lg:py-14">
      <Container>
        <SectionHead title="TRENDING COLLECTION" to="/chargers" />
        <ScrollRail
          gridClassName="md:grid md:grid-cols-3 md:overflow-visible"
          contentKey="trending"
        >
          {trending.map(([title, subtitle, image, path]) => (
            <Link
              key={title}
              to={path}
              data-rail-card
              className="group relative aspect-[3/4] w-[82vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-lg bg-[#eceff3] sm:w-[46vw] md:w-auto md:max-w-none"
            >
              <img
                src={optimizeImage(image, 900)}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">{subtitle}</p>
                  <span className="mt-3 inline-block text-sm font-medium">
                    Shop now!
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="mb-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/80 text-white transition group-hover:bg-white group-hover:text-black"
                >
                  <Icon>arrow_forward</Icon>
                </span>
              </div>
            </Link>
          ))}
        </ScrollRail>
      </Container>
    </section>
  );
}

function PlatformBanner() {
  return (
    <section className="bg-white py-6 sm:py-10 lg:py-12">
      {/* Full-bleed like Daily Objects — image touches screen edges */}
      <Link to="/chargers" className="relative block w-full overflow-hidden">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/8] lg:aspect-[21/8]">
          <img
            src={optimizeImage(platformBanner, 1920)}
            alt="GANBO Platform Collection"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent sm:bg-gradient-to-r sm:from-black/55 sm:via-black/15 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-7 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
            <h2 className="text-[28px] font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
              Platform Collection
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base lg:text-lg">
              Engineered for everyday power
            </p>
            <span className="mt-5 inline-flex h-11 items-center bg-white px-7 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white sm:mt-6 sm:h-12 sm:px-8">
              Shop Now
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

function BestSellers() {
  return (
    <section
      id="products"
      className="bg-white py-8 pb-12 sm:py-10 sm:pb-16 lg:pb-20"
    >
      <Container>
        <SectionHead title="BEST SELLERS" to="/chargers" />
        <ScrollRail
          gridClassName="sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
          contentKey="bestsellers"
        >
          {bestsellers.map(([id, highlight, specs]) => {
            const item = catalog[id];
            if (!item) return null;
            return (
              <article
                key={id}
                data-rail-card
                className="flex w-[64vw] max-w-[260px] shrink-0 snap-start flex-col sm:w-auto sm:max-w-none"
              >
                <Link
                  to={`/product/${id}`}
                  className="block aspect-square overflow-hidden rounded-md bg-[#f3f5f9]"
                >
                  <img
                    src={optimizeImage(item.image, 700)}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-5 transition duration-500 hover:scale-[1.04] sm:p-6"
                  />
                </Link>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">
                  {highlight}
                </p>
                <Link
                  to={`/product/${id}`}
                  className="mt-1 line-clamp-2 text-[13px] font-semibold text-[#0b1220] hover:text-blue-600 sm:text-sm"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-[12px] text-slate-500 sm:text-sm">
                  {specs}
                </p>
                <Link
                  to={`/product/${id}`}
                  className="mt-4 flex h-11 items-center justify-center border border-[#0b1220] text-xs font-bold uppercase tracking-widest text-[#0b1220] transition hover:bg-[#0b1220] hover:text-white"
                >
                  Buy Now
                </Link>
              </article>
            );
          })}
        </ScrollRail>
      </Container>
    </section>
  );
}

export default function HomeShowcase() {
  return (
    <>
      <HeroBanner />
      <ShopByCategory />
      <ProductRail title="NEW IN TECH" to="/chargers" items={newInTech} />
      <TrendingCollection />
      <PlatformBanner />
      <ProductRail title="NEW IN STYLE" to="/phone-gear" items={newInStyle} />
      <BestSellers />
    </>
  );
}
