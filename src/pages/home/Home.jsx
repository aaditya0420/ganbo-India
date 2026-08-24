import { useEffect } from "react";
import { Link } from "react-router-dom";
import SharedHeader from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { optimizeImage, products as catalog } from "../../data/products";

const hero =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786553091/Frame_2147226235_vynxrg.png";
const bottomBanner =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785074244/3_%E8%AF%A6%E6%83%85%E9%A1%B5_wmx6rw.jpg";

const engineeredImg =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786991506/chargerEngineered_q8esqc.png";

const charger =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786989315/65W_Black_k03uul.png";
// "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786298281/10_uowess.png";

const bank =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786989280/ChatGPT_Image_Aug_17_2026_11_24_17_PM_rfupmf.png";
const cable =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785073591/1_mujmis.jpg";

const neckMount =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1785076232/neckmountImage_f2gpg1.webp";

const categories = [
  ["Fast Charging", "GaN Chargers", charger, "/chargers"],
  ["Portable", "Power Banks", bank, "/power-banks"],
  ["High-Speed", "Cables", cable, "/cables"],
  ["Essentials", "Neck Mounts", neckMount, "/neck-mounts"],
];
const bestsellers = [
  ["fast-charging-powerbank-20000mah", "High-Capacity Laptop Power"],
  ["fast-charging-powerbank-10000mah", "Slim Everyday Power Bank"],
  ["fast-charger-65w-white", "High-Speed GaN Charging"],
  ["fast-charger-45w-black", "Compact Everyday Charger"],
];
const articles = [
  [
    "BENCHMARK",
    "How Fast Is 22.5W Charging? Real-Life Speed Test",
    "We subject our latest 22.5W architecture to rigorous real-world testing across different devices.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_cCKSxFC-pRCAwboT0m0sigyH6UKeaQlyzYwvJEsFhv3_dc9I7AUu1pklZVVwJbbC8VPtbJlzkcQNdFVYSkKoYIK094ismpqsYsirxCTa0uyufqz5XkiXrLCbPsdMWnHIdXofWQsgybFXGN8n-EcVg2KuO-DsvXBUyOlyM7kd0O3s1xisLkMWX1-UDmqKcflXHnvrtKRRr2AtlE6EcXz6ooGA0MVgW1OxuUIPQcQBSJUd6xEED8juaL55damgW_Baxm5XTO3jEbw",
    "how-fast-is-22-5w-charging-real-life-speed-test",
  ],
  [
    "DEEP DIVE",
    "Why Your Power Bank Drains Fast (Even When Not in Use)",
    "Understanding quiescent current and parasitic draw, and how low-leakage circuitry preserves power.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA0IamLTl4N34bYJRMXNdmlnNsY_cA_rSkEznyZZ2ZavG8eCI19wwA4oMVQlMG05HirxsaukYGurtU0-xeuHamOTZ-38n2pd9Fbga3smEftnTU8gq58jrUjRQJFjJfirawGgFnxejZWDTvum-vR1bDmfF3Oq8YzvGE5-GpqIkCQVf3QoSEaDAi2ziDTGuoVlO5I_53X4pZzQmSIOwekhw5tSK6aj2TAGJKgkNWrOaFGqZ8xxHOIFW8DAvfXHxCO3ICfKrO5xpsC0BU",
    "why-your-power-bank-drains-fast-even-when-not-in-use",
  ],
  [
    "ENGINEERING",
    "How GANBO Chargers Are Designed for Safe Fast Charging",
    "Behind the scenes with our engineering team on multi-layer protection protocols.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaQOaukpT2DBJul-yqVa7p4HpLJP9bv5Yo53qKamvBk0cz478Tt9p97Efm_Q2itF1sCtNn176QxQN0v7bEC_AY9cxBw97saQK9uRuxiN5hKAUvLzlki1DmijcUOlqHhvy6CbBnZV4iAHQlAG1ZBSN4J_0YUuZ00JMrre0N_lX0zDF0_chsisqEUMEAOy2uDkbJuATD1dYGMwe1Qgza2_MF3kSr6JtifJcbUQP6eJTLloDNsFBo3gca03DflT36QLuc_CFwdhBAuFI",
    "how-ganbo-chargers-are-designed-for-safe-fast-charging",
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
function Header() {
  return <SharedHeader />;
  /*
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-16">
        <div className="flex items-center gap-8">
          <a
            href="#top"
            className="text-xl font-normal tracking-[-.08em] text-black"
          >
            GANBO
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            {[
              "Chargers",
              "Power Banks",
              "Cables",
              "Accessories",
              "Journal",
            ].map((item, i) => (
              <a
                key={item}
                href="#products"
                className={`text-sm transition-colors ${i === 0 ? "border-b-2 border-black pb-1 font-normal text-black" : "text-slate-500 hover:text-black"}`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Search">
            <Icon>search</Icon>
          </button>
        </div>
      </div>
    </header>
  );
}

  */
}

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    const targets = document.querySelectorAll("[data-scroll-animate]");
    targets.forEach((target) => {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div id="top" className="overflow-x-hidden bg-[#f9f9ff]">
      <Header />
      <main>
        <section
          className="relative min-h-[100svh] overflow-hidden bg-cover bg-[position:72%_center] bg-scroll bg-no-repeat text-center text-[#141b2b] sm:bg-center lg:bg-fixed"
          style={{ backgroundImage: `url(${optimizeImage(hero, 1920)})` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/50 to-white/70 sm:from-white/45 sm:via-white/20 sm:to-white/55" />

          <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center px-5 pb-10 pt-24 sm:items-center sm:px-8 sm:pb-16 sm:pt-20 lg:px-16">
            {/* Mobile: one tight block under the header. Tablet/desktop: centered. */}
            <div className="mx-auto w-full max-w-2xl text-left sm:text-center lg:max-w-5xl xl:max-w-6xl">
              <p className="animate-fade-up mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 sm:mb-4 sm:text-sm sm:tracking-[0.3em] lg:mb-5 lg:tracking-[0.35em]">
                GANBO · GaN Technology
              </p>
              <h1 className="animate-fade-up text-4xl font-normal leading-[1.12] tracking-[-0.04em] text-[#0b1220] sm:text-5xl lg:text-6xl lg:leading-[1.08] xl:text-7xl">
                Power Redefined
                <br />
                for the Modern Era
              </h1>
              <p className="animate-fade-up mt-4 max-w-xl text-base leading-7 text-slate-600 [animation-delay:100ms] sm:mx-auto sm:mt-5 sm:text-lg sm:leading-8 lg:mt-6 lg:max-w-2xl lg:text-xl lg:leading-8 xl:max-w-3xl">
                Experience the pinnacle of Gallium Nitride technology. Faster,
                smaller, and cooler charging solutions for your most essential
                devices.
              </p>
              <div className="animate-fade-up mt-6 flex flex-col gap-3 [animation-delay:200ms] sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:gap-5">
                <a
                  href="#categories"
                  className="inner-glow flex h-12 w-full items-center justify-center rounded-full bg-[#0b1220] text-base font-normal text-white shadow-lg transition hover:bg-black sm:h-auto sm:w-auto sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 xl:px-12"
                >
                  Shop Now
                </a>
                <Link
                  to="/blogs"
                  className="flex h-12 w-full items-center justify-center rounded-full border border-slate-300/80 bg-white/70 text-base font-normal text-[#0b1220] backdrop-blur-md transition hover:bg-white/80 sm:h-auto sm:w-auto sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 xl:px-12"
                >
                  Explore Tech
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="categories"
          data-scroll-animate
          className="scroll-mt-20 py-12 sm:scroll-mt-24 sm:py-16 lg:py-24"
        >
          <Container>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {categories.map(([label, title, image, path]) => (
                <Link
                  to={path}
                  key={title}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 sm:aspect-[4/5] sm:rounded-2xl"
                >
                  <img
                    src={optimizeImage(image, 700)}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-12 sm:p-5 sm:pt-16 lg:p-6 lg:pt-20">
                    <p className="text-[9px] font-normal uppercase tracking-[.18em] text-white/70 sm:text-[10px] sm:tracking-[.2em]">
                      {label}
                    </p>
                    <h2 className="mt-1 text-sm font-normal text-white sm:text-base lg:text-xl">
                      {title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section
          data-scroll-animate
          id="products"
          className="bg-white py-12 sm:py-16 lg:py-24"
        >
          <Container>
            <div className="mb-6 sm:mb-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-blue-600">
                  Shop the collection
                </p>
                <h2 className="text-2xl font-normal tracking-tight sm:text-3xl lg:text-4xl">
                  Best Sellers
                </h2>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  Our most trusted charging solutions.
                </p>
              </div>
            </div>

            {/* Phone: small horizontal cards. Tablet+: catalog-style grid. */}
            <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-5">
              {bestsellers.map(([id, desc]) => {
                const item = catalog[id];
                if (!item) return null;

                return (
                  <article
                    key={id}
                    className="w-[42vw] max-w-[160px] shrink-0 snap-start rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:w-auto sm:max-w-none sm:rounded-2xl sm:p-3 lg:p-4"
                  >
                    <Link
                      to={`/product/${id}`}
                      className="group relative block aspect-square overflow-hidden rounded-lg bg-[#f4f5fa] sm:rounded-xl"
                    >
                      <img
                        src={optimizeImage(item.image, 700)}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <Link
                      to={`/product/${id}`}
                      className="mt-3 block text-xs font-normal leading-snug hover:text-blue-600 sm:mt-4 sm:text-sm"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                      {desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section data-scroll-animate className="py-12 sm:py-16 lg:py-24">
          <Container>
            <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-blue-600">
                Why GANBO
              </p>
              <h2 className="text-2xl font-normal tracking-tight sm:text-3xl lg:text-5xl">
                Engineered for Better
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                We solve power challenges with precision engineering and
                thoughtful design.
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              {[
                [
                  "bolt",
                  "GaNFast™ Tech",
                  "3x faster charging in half the size of traditional silicon chargers.",
                ],
                [
                  "security",
                  "Multi-Safe Shield",
                  "Advanced circuitry provides 10 layers of protection.",
                ],
                [
                  "eco",
                  "Eco-Efficiency",
                  "95% energy conversion efficiency reduces waste heat.",
                ],
              ].map(([icon, title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:p-7"
                >
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 sm:mb-5 sm:h-14 sm:w-14">
                    <Icon>{icon}</Icon>
                  </div>
                  <h3 className="text-base font-normal sm:text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section
          data-scroll-animate
          className="bg-black py-12 text-white sm:py-16 lg:py-24"
        >
          <Container>
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-blue-400 sm:mb-4">
                  The Blueprint
                </p>
                <h2 className="text-3xl font-normal tracking-tight sm:text-4xl lg:text-6xl">
                  Engineered for Precision
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-base sm:leading-7">
                  Our GaN II architecture is a revolution. By maximizing heat
                  dissipation and shortening electrical pathways, we achieve
                  thermal performance previously thought impossible.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200 sm:mt-7 sm:space-y-4">
                  {[
                    "ActiveShield™ 2.0 temperature monitoring",
                    "Real-time dynamic power allocation",
                    "High-frequency planar transformer",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-blue-400">
                        <Icon>check_circle</Icon>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/blogs"
                  className="mt-7 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-blue-500 hover:text-white sm:mt-8 sm:px-7 sm:py-3.5"
                >
                  Deep Dive Into Technology
                </Link>
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-slate-900 sm:min-h-[280px] lg:min-h-[360px]">
                <img
                  src={optimizeImage(engineeredImg, 1200)}
                  alt="GANBO charging technology"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        <section data-scroll-animate className="py-12 sm:py-16 lg:py-24">
          <Container>
            {/* Full image width like catalog banners — no fixed height crop */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={optimizeImage(bottomBanner, 1600)}
                alt="Professional GANBO workspace"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-10">
                <Link
                  to="/cables"
                  className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-blue-500 hover:text-white sm:px-7 sm:py-3.5"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section
          data-scroll-animate
          className="bg-slate-100 py-12 sm:py-16 lg:py-24"
        >
          <Container>
            <h2 className="mb-8 text-center text-2xl font-normal sm:mb-10 sm:text-3xl lg:text-5xl">
              Verified Performance
            </h2>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              {[
                [
                  "James D.",
                  "Verified Tech Analyst",
                  "The build quality is exceptional. It is significantly smaller than my stock MacBook charger.",
                ],
                [
                  "Sarah L.",
                  "Verified Travel Blogger",
                  "The power bank is a lifesaver for long flights. GANBO is now my go-to for power.",
                ],
                [
                  "Marcus K.",
                  "Verified Business Pro",
                  "Elegant packaging and even better performance. The cables are incredibly durable.",
                ],
              ].map(([name, role, quote]) => (
                <article
                  key={name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7"
                >
                  <div className="mb-3 text-blue-600 sm:mb-4">★★★★★</div>
                  <p className="text-sm italic leading-6 text-slate-700 sm:leading-7">
                    “{quote}”
                  </p>
                  <div className="mt-5 flex items-center gap-3 sm:mt-6">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-200 text-sm font-bold">
                      {name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-slate-500">{role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
          <Container>
            <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
              {[
                ["local_shipping", "Global Shipping"],
                ["verified_user", "12-Month Warranty"],
                ["lock", "Secure Payments"],
                ["support_agent", "24/7 Expert Support"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Icon>{icon}</Icon>
                  <span className="text-[11px] font-semibold sm:text-xs lg:text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section data-scroll-animate className="py-12 sm:py-16 lg:py-24">
          <Container>
            <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-normal sm:text-3xl lg:text-5xl">
                Latest Blogs
              </h2>
              <Link
                to="/blogs"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                View All Articles →
              </Link>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {articles.map(([tag, title, text, image, slug]) => (
                <Link key={slug} to={`/blogs/${slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-video">
                    <img
                      src={optimizeImage(image, 700)}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[.2em] text-slate-500 sm:mt-5">
                    {tag}
                  </p>
                  <h3 className="mt-2 text-base font-semibold group-hover:text-blue-600 sm:text-lg lg:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3">
                    {text}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-black py-12 text-white sm:py-14">
          <Container className="flex flex-col items-stretch justify-between gap-6 text-center md:flex-row md:items-center md:gap-7 md:text-left">
            <div className="mx-auto max-w-md md:mx-0">
              <h2 className="text-2xl font-normal sm:text-3xl">
                Stay Powered Up
              </h2>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Join the GANBO inner circle for product launches and tech
                insights.
              </p>
            </div>
            <form
              className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row md:mx-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                aria-label="Email address"
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm outline-none placeholder:text-white/40 focus:border-white"
              />
              <button className="rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black hover:bg-blue-500 hover:text-white">
                Subscribe
              </button>
            </form>
          </Container>
        </section>
      </main>
      {/*
      <footer className="border-t border-slate-200 bg-white py-16">
        <Container>
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <a
                href="#top"
                className="mb-6 block text-xl font-normal tracking-[-.08em]"
              >
                GANBO
              </a>
              <p className="max-w-[200px] text-sm leading-6 text-slate-500">
                Next-generation power solutions engineered for the future of
                productivity.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  aria-label="Social media"
                  className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-600 hover:text-white"
                >
                  <Icon>share</Icon>
                </a>
                <a
                  href="#"
                  aria-label="Email"
                  className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-600 hover:text-white"
                >
                  <Icon>alternate_email</Icon>
                </a>
              </div>
            </div>
            {[
              ["Products", "Chargers", "Power Banks", "Cables"],
              [
                "Company",
                "Our Story",
                "Journal",
              ],
              [
                "Support",
                "Help Center",
                "Shipping & Returns",
                "Warranty Info",
                "Privacy Policy",
              ],
            ].map(([heading, ...links]) => (
              <div key={heading}>
                <h3 className="text-xs font-bold uppercase tracking-[.2em]">
                  {heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-500 hover:text-black"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 md:flex-row">
            © 2024 GANBO. Engineered for the future.
            <div className="flex gap-4">
              <Icon>payments</Icon>
              <Icon>credit_card</Icon>
              <Icon>account_balance_wallet</Icon>
            </div>
          </div>
        </Container>
      </footer>
      */}
      <Footer />
    </div>
  );
}

export default Home;
