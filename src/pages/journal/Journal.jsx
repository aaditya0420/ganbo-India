import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { optimizeImage } from "../../data/products";

const articles = [
  [
    "BENCHMARK",
    "Technical Analysis • April 27, 2026",
    "How Fast Is 22.5W Charging? Real-Life Speed Test",
    "We subject our latest 22.5W architecture to rigorous real-world testing. Discover how thermal management affects sustained peak power delivery across different devices.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_cCKSxFC-pRCAwboT0m0sigyH6UKeaQlyzYwvJEsFhv3_dc9I7AUu1pklZVVwJbbC8VPtbJlzkcQNdFVYSkKoYIK094ismpqsYsirxCTa0uyufqz5XkiXrLCbPsdMWnHIdXofWQsgybFXGN8n-EcVg2KuO-DsvXBUyOlyM7kd0O3s1xisLkMWX1-UDmqKcflXHnvrtKRRr2AtlE6EcXz6ooGA0MVgW1OxuUIPQcQBSJUd6xEED8juaL55damgW_Baxm5XTO3jEbw",
  ],
  [
    "DEEP DIVE",
    "Battery Science • April 2, 2026",
    "Why Your Power Bank Drains Fast (Even When Not in Use)",
    "Understanding quiescent current and parasitic draw. A technical exploration into why energy storage degrades over time and how low-leakage circuitry preserves power.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA0IamLTl4N34bYJRMXNdmlnNsY_cA_rSkEznyZZ2ZavG8eCI19wwA4oMVQlMG05HirxsaukYGurtU0-xeuHamOTZ-38n2pd9Fbga3smEftnTU8gq58jrUjRQJFjJfirawGgFnxejZWDTvum-vR1bDmfF3Oq8YzvGE5-GpqIkCQVf3QoSEaDAi2ziDTGuoVlO5I_53X4pZzQmSIOwekhw5tSK6aj2TAGJKgkNWrOaFGqZ8xxHOIFW8DAvfXHxCO3ICfKrO5xpsC0BU",
  ],
  [
    "ENGINEERING",
    "Design Philosophy • March 17, 2026",
    "How GANBO Chargers Are Designed for Safe Fast Charging",
    "Behind the scenes with our engineering team. We break down the multi-layer protection protocols that prevent over-voltage and thermal runaway.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaQOaukpT2DBJul-yqVa7p4HpLJP9bv5Yo53qKamvBk0cz478Tt9p97Efm_Q2itF1sCtNn176QxQN0v7bEC_AY9cxBw97saQK9uRuxiN5hKAUvLzlki1DmijcUOlqHhvy6CbBnZV4iAHQlAG1ZBSN4J_0YUuZ00JMrre0N_lX0zDF0_chsisqEUMEAOy2uDkbJuATD1dYGMwe1Qgza2_MF3kSr6JtifJcbUQP6eJTLloDNsFBo3gca03DflT36QLuc_CFwdhBAuFI",
  ],
  [
    "LONGEVITY",
    "Myth vs Reality • Feb 23, 2026",
    "Does Fast Charging Damage Batteries? Battery Health Guide",
    "Debunking misconceptions about high-wattage charging. We analyze cycle life data and intelligent current modulation.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaGGhsAU-ksAhYCxhpmZDe-9Gog2ZgIrr3436WOq2YsI2nO60uNpQGMrRfsnald78cucXz2be3jCBAEz3PX47SbZ8XmRYS7lwKI_ECXwEGVJBYpRPqcmQXB3YfIDZpaEde5xzqYR81Wf1oLWb3F0c4TBYX80Db7Ly4prAgSt4tSFnOpGK0i7nHArsr8Kkj-_7bFBNyON3Hc4rfBf0yLrL0qdadz1R6MAT9oX-PL7RF--TiKNOxnUKV2TSdpb-iHnHR_Su1TVQkvB4",
  ],
  [
    "BUYER'S GUIDE",
    "Utilities • Feb 2, 2026",
    "How to Choose the Right Power Bank for Daily Use",
    "From mAh capacity to port configurations. A comprehensive guide to matching mobile power requirements with the right hardware.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgFCQ9yKezUT9_p45pHa0wlgRu9FivTNZGFICKAz4aLZ4MiDs3eQWSAbEaIPldK2h-pdVkqHVKFJ3jI43IHJNU4HPayvYkaa-IQTw0CAAwxpFQvfjQtxvY6EGSbsgJWVbxlUselbJD27uflymCuuUw9UIjcCWgqQSkzYmGGggrqGY-1lWaiIQMtMg5V4ixFUy1jd6gcXeOtUB0g_nFqfWwWmtxCTcywYJsikao9EHI7rxwYhWjNbqh29dxtVCVDfPI01PpfuS8S0s",
  ],
  [
    "COMPARISON",
    "Hardware Basics • Jan 23, 2026",
    "Difference Between Fast Charger and Normal Charger",
    "It is more than just wattage. Explore the communication protocols that allow safe, rapid energy transfer without efficiency loss.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgehKoyEzQ3d08uZFR6wBvrlXynF3SY46YZzoUkWw2e1se3fXmbXh4lk06DmFJdKiw-BKZxysl43uSpq0QaA5ppJMNdfxHPEFX4BLNJ9vSclBFxn6p-yvSCYnNTI-TfTk9CIjDrrGAyp5THiVBYF4qcd0bNlsJPmCyeyavBUonnXJElXDGSPAHdnPtFh3Q0c67ri2TmzEQQm89zvaBYtm55CRJIaU58MLIX-WnK07-ZO4RpMKLuXVw4BEWrT0_T5JDyDPs9DudVIw",
  ],
];

function IconArrow() {
  return (
    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
      arrow_forward
    </span>
  );
}

export default function Journal() {
  const navigate = useNavigate();

  useEffect(() => {
    const nav = document.querySelector("header");
    const updateNav = () =>
      nav?.classList.toggle("bg-white/90", window.scrollY > 20);
    window.addEventListener("scroll", updateNav);

    const onArticleClick = (event) => {
      const article = event.target.closest("article");
      const title = article?.querySelector("h2")?.textContent;
      if (title)
        navigate(
          `/blogs/${title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")}`,
        );
    };
    const cards = document.querySelectorAll("article");
    cards.forEach((card) => card.addEventListener("click", onArticleClick));

    return () => {
      window.removeEventListener("scroll", updateNav);
      cards.forEach((card) =>
        card.removeEventListener("click", onArticleClick),
      );
    };
  }, [navigate]);

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Blogs" />
      <main>
        <section className="hero-gradient flex min-h-[32vh] items-center justify-center overflow-hidden px-4 pb-12 pt-28 sm:min-h-[40vh] sm:px-8 sm:pb-16 sm:pt-32 lg:px-16">
          <div className="max-w-4xl text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-blue-600 sm:mb-4 sm:text-sm">
              Engineered Perspective
            </span>
            <h1 className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-[-.04em] sm:mb-6 sm:text-5xl md:text-7xl">
              GANBO Blogs: Engineering Insights
            </h1>
            <p className="mx-auto max-w-2xl text-sm font-normal leading-[1.6] text-slate-600 sm:text-lg md:text-xl">
              Exploring the precision behind power. Technical deep-dives into
              charging architecture, battery longevity, and the future of mobile
              energy.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-14 lg:py-16">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 sm:gap-6 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-16">
            {articles.map(([tag, meta, title, description, image]) => (
              <article
                key={title}
                className="glass-card group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-square">
                  <img
                    src={optimizeImage(image, 800)}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-blue-600 px-2.5 py-1 text-[9px] font-bold leading-none tracking-[.1em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
                    {tag}
                  </span>
                </div>
                <div className="flex flex-grow flex-col p-5 sm:p-7 lg:p-8">
                  <span className="mb-2 text-xs font-semibold leading-[1.2] tracking-[.02em] text-slate-500 sm:text-sm">
                    {meta}
                  </span>
                  <h2 className="mb-3 text-lg font-semibold leading-[1.3] sm:mb-4 sm:text-xl lg:text-2xl">
                    {title}
                  </h2>
                  <p className="mb-5 line-clamp-3 text-sm font-normal leading-[1.6] text-slate-600 sm:mb-6 sm:text-base">
                    {description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.02em] transition group-hover:text-blue-600 sm:text-sm">
                    Continue Reading <IconArrow />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <button
        type="button"
        aria-label="Open chat"
        className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-2xl transition hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
      >
        <span className="material-symbols-outlined">forum</span>
      </button>
      <Footer />
    </div>
  );
}
