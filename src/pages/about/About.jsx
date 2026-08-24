import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { optimizeImage } from "../../data/products";

const hero =
  "https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto/v1786294472/about_banner_no4ecp.png";
const blueprint =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTJTn-LCzgdmcEnUH1cgziV5Ji8pGX34JLJtfO3FijxyY_5Ubf47VipzzAVxof4536VmKHwJToeDpLG_4KFF7u39Lr_OeBfrS8ewn8tSO7wltC449Nt3WeTXIZoDcaAI3RgMeCTwskdNWORwsJ6b8oYm3egeQvJaU4OFjSwq_BH7GaXYGqo-mXe0hinSrxLqD8cD_v_2BwOCfDzQyOuXKmCq1jrCcBnDBo5S9rzEbLV9JxMfAKdOsgqg";
const texture =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQdkuU50GAud1e9sUF08VPMmXwS7D5_hK-nZC3zZ4yEfNIhpuPss-myzUbJurPi_jZ1DhNxcw0SaoDSP7lX9xHBJSDuXbqhevZemUbMYC3yvgB6uywSOUrDBk0sZUZgiEUNGFAeGgvpnWvQZ7gcxdJ8AyL-hqIfqueNNOvSdZqJLAmR3fBH5xsWuOiW2BopXa1-fIOSdfPvyga_xj00oVmSM_WaVAJV9LlO9Vsw1vWLiZEMcABDCon0pz8Q5-y27nyKYDhEC8yoMY";

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

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        }),
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
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="About Us" />
      <main>
        <section
          className="relative flex min-h-[100svh] items-center overflow-hidden bg-cover bg-center bg-scroll bg-no-repeat lg:bg-fixed"
          style={{ backgroundImage: `url(${optimizeImage(hero, 1920)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/30 sm:to-transparent" />
          <Container className="relative z-10 w-full py-16 pt-24 sm:py-20 sm:pt-28">
            <div className="max-w-3xl animate-fade-up">
              <span className="mb-4 inline-block rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md sm:mb-6 sm:px-4 sm:text-xs">
                About GANBO
              </span>
              <h1 className="text-3xl leading-tight tracking-[-.04em] text-white sm:text-5xl md:text-7xl">
                Fast Charge <br />
                for Your Life
              </h1>
              <p className="mb-6 mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:mb-10 sm:mt-8 sm:text-lg">
                Ganbo is an emerging brand that focuses on charging devices. Our
                core team members come from the top brands in the mobile phone
                industry, with deep understanding of charging technology and
                extremely high standards for it.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href="#brand-story"
                  className="rounded-full bg-white px-8 py-3.5 text-center text-sm font-semibold text-black shadow-xl transition hover:bg-blue-600 hover:text-white sm:px-10 sm:py-4"
                >
                  Our Story
                </a>
                <Link
                  to="/blogs"
                  className="rounded-full border border-white/30 bg-black/20 px-8 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/40 sm:px-10 sm:py-4"
                >
                  Explore GaN Tech
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section
          data-scroll-animate
          className="relative overflow-hidden py-12 sm:py-16 lg:py-24"
        >
          <div className="blueprint-pattern pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-40" />
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative z-10">
                <h2 className="text-3xl tracking-[-.04em] sm:text-4xl lg:text-5xl">
                  About GANBO
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                  Our team comes from top mobile phone brands, with deep
                  experience in charging technology and high standards for every
                  product we build.
                </p>
                <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                  {[
                    [
                      "bolt",
                      "Fast & Reliable",
                      "Charging products built for speed without compromising quality.",
                    ],
                    [
                      "security",
                      "Safety First",
                      "Protects your device battery and helps extend its lifespan.",
                    ],
                    [
                      "devices",
                      "One Charger, Many Devices",
                      "Full compatibility across smartphone brands with multi-port designs.",
                    ],
                  ].map(([icon, title, text]) => (
                    <div key={title} className="flex items-start gap-3 sm:gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600/10 text-blue-600 sm:h-11 sm:w-11">
                        <Icon>{icon}</Icon>
                      </div>
                      <div>
                        <h3 className="text-base font-medium sm:text-lg">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:mt-8 sm:text-base">
                  Choose Ganbo for a high-quality charging experience — faster,
                  safer, and built to keep your devices lasting longer.
                </p>
              </div>
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl sm:rounded-[32px]">
                <img
                  src={blueprint}
                  alt="Technical blueprint graphic of a charger"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 sm:aspect-square"
                />
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
              </div>
            </div>
          </Container>
        </section>

        <section
          id="brand-story"
          data-scroll-animate
          className="scroll-mt-24 bg-slate-100/50 py-12 sm:py-16 lg:py-24"
        >
          <Container>
            <div className="mb-8 max-w-3xl sm:mb-12">
              <h2 className="text-3xl tracking-[-.04em] sm:text-4xl lg:text-5xl">
                Brand Story
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-blue-600 sm:mt-4 sm:w-24" />
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                GANBO started from real charging pain points — slow speeds, weak
                safety, and limited compatibility. We brought together technology
                experts, designers, and UX specialists to make charging
                efficient, safe, and stylish every day.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                [
                  "bolt",
                  "Mission",
                  "To provide users with efficient and safe charging solutions through innovative technology.",
                  "DRIVEN BY INNOVATION",
                ],
                [
                  "visibility",
                  "Vision",
                  "To become a global leading brand in charging devices and to lead the future of stylish and efficient charging.",
                  "GLOBAL LEADERSHIP",
                ],
                [
                  "verified",
                  "Quality",
                  "Customer first, innovation leadership, quality focus, and teamwork.",
                  "UNCOMPROMISING STANDARDS",
                ],
              ].map(([icon, title, text, label]) => (
                <article
                  key={title}
                  className="group flex min-h-0 flex-col justify-between rounded-2xl border border-white/80 bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-[0_18px_40px_rgba(37,99,235,0.12)] sm:min-h-[280px] sm:rounded-3xl sm:p-8 lg:p-9"
                >
                  <div>
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white sm:mb-6 sm:h-14 sm:w-14">
                      <Icon>{icon}</Icon>
                    </div>
                    <h3 className="text-xl tracking-tight sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
                      {text}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-[10px] font-semibold tracking-widest text-blue-600 sm:mt-8 sm:pt-5 sm:text-xs">
                    {label}
                    <Icon>arrow_right_alt</Icon>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          data-scroll-animate
          className="relative overflow-hidden bg-black py-14 text-white sm:py-20 lg:py-24"
        >
          <div className="absolute inset-0 opacity-20">
            <img
              src={texture}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover grayscale contrast-150"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
          <Container className="relative z-10 text-center">
            <h2 className="text-3xl tracking-[-.04em] sm:text-4xl md:text-5xl">
              Fast Charge for Your Life
            </h2>
            <div className="mb-10 mt-8 grid grid-cols-2 gap-3 sm:mb-16 sm:mt-10 sm:gap-6 md:grid-cols-4">
              {[
                ["95%", "CONVERSION EFFICIENCY"],
                ["10M+", "DEVICES POWERED"],
                ["3x", "FASTER CHARGING"],
                ["1/2", "SIZE OF TRADITIONAL ADAPTERS"],
              ].map(([number, label]) => (
                <div key={label} className="p-3 sm:p-6 lg:p-8">
                  <div className="text-3xl text-blue-500 sm:text-4xl lg:text-5xl">
                    {number}
                  </div>
                  <p className="mt-2 text-[9px] leading-snug tracking-wider text-white/60 sm:text-xs sm:tracking-widest">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/80 sm:text-lg">
              Choose Ganbo, and you will enjoy a truly high-quality charging
              experience that keeps your device in optimal condition. Our
              charging devices make fast charging safer and your devices more
              durable.
            </p>
          </Container>
        </section>

        <section className="px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-7xl rounded-2xl bg-black p-6 text-center text-white sm:rounded-[40px] sm:p-12 md:p-16 lg:p-24">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl tracking-[-.04em] sm:text-4xl">
                Stay Powered Up
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:mt-4 sm:text-base">
                Join the GANBO inner circle for exclusive early access to
                product launches and engineering insights.
              </p>
              <form
                className="mt-6 flex flex-col gap-3 sm:mt-10 sm:gap-4 md:flex-row"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white/30 sm:px-8 sm:py-4"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-blue-600 hover:text-white sm:px-10 sm:py-4"
                >
                  SUBSCRIBE
                </button>
              </form>
              <label className="mt-5 flex items-start justify-center gap-3 text-left text-xs text-white/50 sm:mt-6 sm:items-center">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-blue-600 sm:mt-0"
                />
                I agree with the terms and conditions.
              </label>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
