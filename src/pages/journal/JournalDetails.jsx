import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { optimizeImage } from "../../data/products";

const hero =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCSr4371Cw7yedJYO2EjEsGmCHhb8W9oq9KKqjdUawDZVVniNnJD1oSHa-3DSx4UiothSV2R-8X0IfXuDV2rjrsNKLoTsM1ZNxHWm9YAh6PQBpfs2UZClc3vcPGppoM7RjFrzcc-2P90IUUKOeDDfjSGIGbk3QyZ0aPLjf6tTPG8lGj53bwy9ibck5qvAIMGSC0riw7Eq3YI_qP9xfjOWUCBGDhb2CTYk7r_3VCZ8MqlRgKcafY5Mu2z-An1u1sH2bZVqXzBiBiZG4";
const blueprint =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXEKmMipLPCtJQ4IAcym2cy9hXbndPqXH2ah1V9Gy0mbynoOV43u6Y0HPGs-r0nc95872cdcq2YWs4nofVXJIPmUINWZCB0VrTcr7iENZuyIt7Cu4KFpIzMJfx1lMHfiEdJTs2Z8cf73q5eeVwjEGrw7Un2aF-9dz8GZWUdZ9-qCqAeFWREWFY7NOEMQLiOPRU75vU09C-Cb8t3YNMbaC1sS23oDG55a5HjT6J_cdIUnClSN7Y0_UbRH96GqiHEKs4HCv-pIexg18";

const articleTitles = {
  "why-your-power-bank-drains-fast-even-when-not-in-use":
    "Why Your Power Bank Drains Fast.",
  "how-fast-is-22-5w-charging-real-life-speed-test":
    "How Fast Is 22.5W Charging? Real-Life Speed Test",
  "how-ganbo-chargers-are-designed-for-safe-fast-charging":
    "How GANBO Chargers Are Designed for Safe Fast Charging",
};

function Icon({ children }) {
  return <span className="material-symbols-outlined">{children}</span>;
}

export default function JournalDetails() {
  const { slug } = useParams();
  const title = articleTitles[slug] || "Why Your Power Bank Drains Fast.";
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="blueprint-grid overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Blogs" />
      <main>
        {/* Banner starts under the fixed navbar (same approach as Journal listing) */}
        <section className="relative flex min-h-[420px] items-end overflow-hidden sm:min-h-[560px] lg:min-h-[716px]">
          <img
            src={optimizeImage(hero, 1920)}
            alt="Technical power bank laboratory"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9ff] via-[#faf9ff]/50 to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-16 lg:pb-16">
            <div className="max-w-4xl">
              <span className="mb-3 inline-block rounded-sm bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white sm:mb-4">
                Technical Journal
              </span>
              <h1 className="mb-3 text-3xl font-extrabold leading-[1.15] tracking-[-.04em] sm:mb-4 sm:text-5xl md:text-7xl">
                {title.includes("Drains") ? (
                  <>
                    Why Your Power Bank <br />
                    <span className="text-glow text-blue-600">
                      Drains Fast.
                    </span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="max-w-2xl text-sm leading-[1.6] text-slate-600 sm:text-lg md:text-xl">
                A deep dive into the engineering of portable energy storage and
                the hidden factors that compromise battery integrity even when
                not in use.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:gap-12 sm:px-8 sm:py-14 lg:flex-row lg:gap-6 lg:px-16 lg:py-16">
          <article className="min-w-0 flex-1 space-y-10 sm:space-y-14 lg:space-y-16">
            <p className="text-base leading-[1.6] text-slate-600 sm:text-xl">
              A power bank is meant to be a reliable backup when your phone runs
              low on battery. But many people notice their power bank losing
              charge quickly—even when they are not using it. This can be
              frustrating, especially during travel or emergencies.
            </p>

            <div className="glass-panel rounded-xl p-5 sm:p-8">
              <div className="mb-5 flex items-start gap-2 sm:mb-6 sm:items-center">
                <Icon>analytics</Icon>
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Common Signs Your Power Bank Is Draining Too Fast
                </h2>
              </div>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                {[
                  [
                    "trending_down",
                    "The charge drops from 100% to 20–30% in a short time, even without heavy use.",
                  ],
                  [
                    "battery_horiz_000",
                    "The battery level decreases even when it is not connected to any device.",
                  ],
                  [
                    "thermostat",
                    "The power bank feels unusually warm, even in standby mode.",
                  ],
                  [
                    "history",
                    "It charges your phone fewer times than it used to originally.",
                  ],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="rounded-lg border border-slate-300/40 bg-white/50 p-3 sm:p-4"
                  >
                    <div className="flex items-start gap-2">
                      <span className="shrink-0">
                        <Icon>{icon}</Icon>
                      </span>
                      <p className="text-sm leading-[1.6] sm:text-base">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 border-l-4 border-blue-600 pl-3 text-2xl font-semibold sm:mb-8 sm:pl-4 sm:text-3xl">
                Top 7 Hidden Reasons Your Power Bank Drains Quickly
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  [
                    "01",
                    "Poor Battery Quality",
                    "Many cheaper power banks use inferior lithium-ion batteries that tend to wear out faster over time.",
                  ],
                  [
                    "02",
                    "Standby Power Loss (Self-Discharge)",
                    "All batteries naturally lose some charge over time. In lower-quality devices, standby drain can be much higher.",
                  ],
                  [
                    "03",
                    "Overcharging Your Power Bank",
                    "Leaving your power bank plugged in overnight can generate heat and gradually reduce its capacity.",
                  ],
                  [
                    "04",
                    "Low-Quality Circuit Protection",
                    "Inferior voltage regulation or temperature control can lead to parasitic power loss even when unused.",
                  ],
                ].map(([number, heading, text]) => (
                  <div
                    key={number}
                    className="group flex gap-3 rounded-xl border border-transparent p-3 transition hover:border-slate-300/30 hover:bg-slate-100 sm:gap-6 sm:p-4"
                  >
                    <span className="shrink-0 text-3xl font-extrabold text-slate-300 transition group-hover:text-blue-600 sm:text-5xl">
                      {number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="mb-1.5 text-lg font-semibold sm:mb-2 sm:text-2xl">
                        {heading}
                      </h3>
                      <p className="text-sm leading-[1.6] text-slate-600 sm:text-base">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="glass-panel blueprint-grid my-6 h-[220px] overflow-hidden rounded-2xl border-blue-600/20 sm:my-8 sm:h-[320px] lg:h-[400px]">
                  <img
                    src={optimizeImage(blueprint, 1000)}
                    alt="Power bank technical blueprint"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-4 sm:p-8"
                  />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-black p-5 text-white sm:rounded-3xl sm:p-8 lg:p-12">
              <Icon>build_circle</Icon>
              <h2 className="mb-6 mt-3 text-2xl font-semibold sm:mb-8 sm:mt-4 sm:text-3xl">
                How to Fix Power Bank Draining Fast
              </h2>
              <div className="space-y-4">
                {[
                  "Use a high-quality charging cable and adapter for efficient charging.",
                  "Avoid leaving the power bank plugged in long after it is fully charged.",
                  "Store it in a cool, dry place away from heat and moisture.",
                  "Use the power bank regularly instead of letting it sit unused for long periods.",
                ].map((text, index) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 border-b border-white/10 pb-4 sm:items-center sm:gap-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-sm sm:text-base">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
                LEAVE A COMMENT
              </h3>
              <div className="glass-panel rounded-2xl p-5 sm:p-8">
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <input
                      required
                      placeholder="Name *"
                      aria-label="Name"
                      className="rounded-full border border-slate-400 bg-white/50 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600 sm:px-6 sm:text-base"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email *"
                      aria-label="Email"
                      className="rounded-full border border-slate-400 bg-white/50 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600 sm:px-6 sm:text-base"
                    />
                  </div>
                  <textarea
                    required
                    rows="5"
                    placeholder="Comment *"
                    aria-label="Comment"
                    className="w-full rounded-2xl border border-slate-400 bg-white/50 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600 sm:px-6 sm:py-4 sm:text-base"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-black px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-blue-600 sm:w-auto sm:py-4"
                  >
                    Post Comment
                  </button>
                  {submitted && (
                    <p className="text-sm text-blue-600">
                      Thanks—your comment has been submitted for review.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </article>

          <aside className="w-full shrink-0 space-y-8 sm:space-y-12 lg:w-[350px]">
            <div className="glass-panel rounded-2xl p-4">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Engineer&apos;s Pick
              </h4>
              <div className="rounded-xl bg-slate-100 p-4">
                <img
                  src={optimizeImage(hero, 700)}
                  alt="GANBO Ultra Pro"
                  loading="lazy"
                  decoding="async"
                  className="mb-4 aspect-square w-full rounded-lg object-cover"
                />
                <h5 className="text-lg font-semibold sm:text-xl">
                  GANBO Ultra Pro
                </h5>
                <p className="my-3 text-sm text-slate-600">
                  Advanced circuitry for zero standby drain.
                </p>
                <Link
                  to="/power-banks"
                  className="block w-full rounded-full bg-black py-3 text-center text-xs font-semibold uppercase tracking-widest text-white hover:bg-blue-600"
                >
                  Explore Product
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="border-b border-slate-400 pb-2 text-xs font-semibold uppercase tracking-widest">
                Related Articles
              </h4>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  [
                    "How Fast is 22.5W Charging? Real-Life Speed Test",
                    "/blogs/how-fast-is-22-5w-charging-real-life-speed-test",
                  ],
                  [
                    "How GANBO Chargers Are Designed for Safe Fast Charging",
                    "/blogs/how-ganbo-chargers-are-designed-for-safe-fast-charging",
                  ],
                ].map(([heading, path]) => (
                  <Link key={heading} to={path} className="group block">
                    <div className="mb-2 h-36 overflow-hidden rounded-xl sm:h-40">
                      <img
                        src={optimizeImage(hero, 700)}
                        alt={heading}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h5 className="text-sm font-semibold group-hover:text-blue-600">
                      {heading}
                    </h5>
                    <p className="mt-1 text-xs text-slate-500">
                      April 27, 2026
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* <button
        type="button"
        aria-label="Chat"
        className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-xl transition hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <Icon>chat</Icon>
      </button> */}
      <Footer />
    </div>
  );
}
