import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const officeMapEmbed =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.3727803429815!2d75.74502787489541!3d26.923394159632448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db365246e5f51%3A0xb64b2d065f198bb9!2sShekhawat%20Complex!5e0!3m2!1sen!2sin!4v1786806271108!5m2!1sen!2sin";
const officeDirections =
  "https://www.google.com/maps/place/Shekhawat+Complex/@26.9233942,75.7450279,17z";

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

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <Header active="Contact Us" />
      <main className="pt-20 sm:pt-24">
        <Container className="pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl">
            How can we help?
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base lg:text-lg">
            Experience precision support. Whether you have a question about our
            high-performance hardware or need technical assistance, our experts
            are ready to assist.
          </p>
        </Container>

        <Container className="pb-14 sm:pb-20 lg:pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="glass-border rounded-2xl bg-[#fbfbfb] p-5 sm:rounded-3xl sm:p-8 lg:col-span-7 lg:p-10">
              <h2 className="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl lg:mb-10">
                Send a Message
              </h2>
              <form
                className="space-y-5 sm:space-y-8 lg:space-y-10"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:gap-8 md:grid-cols-2">
                  <input
                    required
                    placeholder="First Name"
                    aria-label="First Name"
                    className="input-glass py-3 text-sm"
                  />
                  <input
                    required
                    placeholder="Last Name"
                    aria-label="Last Name"
                    className="input-glass py-3 text-sm"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  className="input-glass w-full py-3 text-sm"
                />
                <select
                  required
                  defaultValue=""
                  aria-label="Inquiry Type"
                  className="input-glass w-full bg-transparent py-3 text-sm"
                >
                  <option value="" disabled>
                    Select Inquiry Type
                  </option>
                  <option>Technical Support</option>
                  <option>Order Inquiries</option>
                  <option>Warranty Claim</option>
                  <option>Partnership</option>
                </select>
                <textarea
                  rows="4"
                  placeholder="How can we help?"
                  aria-label="Message"
                  className="input-glass w-full resize-none py-3 text-sm"
                />
                <button
                  type="submit"
                  className="btn-black w-full rounded-lg px-10 py-3.5 text-sm font-medium sm:w-auto sm:py-3"
                >
                  Send Inquiry
                </button>
                {sent && (
                  <p className="text-sm text-blue-600">
                    Thanks. Our support team will get back to you shortly.
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-4 sm:space-y-6 lg:col-span-5">
              <a
                href="mailto:info@rhsdpl.com"
                className="glass-border flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:border-blue-200 sm:gap-4 sm:p-6"
              >
                <div className="shrink-0 rounded-lg bg-blue-50 p-2.5 text-blue-600 sm:p-3">
                  <Icon>mail</Icon>
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    Email
                  </p>
                  <p className="truncate text-base font-semibold sm:text-lg">
                    info@rhsdpl.com
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    24/7 Response time
                  </p>
                </div>
              </a>

              <a
                href="tel:7375004001"
                className="glass-border flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:border-blue-200 sm:gap-4 sm:p-6"
              >
                <div className="shrink-0 rounded-lg bg-blue-50 p-2.5 text-blue-600 sm:p-3">
                  <Icon>phone</Icon>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    Phone
                  </p>
                  <p className="text-base font-semibold sm:text-lg">
                    7375004001
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Everyday support</p>
                </div>
              </a>

              <div className="glass-border flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm sm:gap-4 sm:p-6">
                <div className="shrink-0 rounded-lg bg-blue-50 p-2.5 text-blue-600 sm:p-3">
                  <Icon>schedule</Icon>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    Office Hours
                  </p>
                  <p className="text-base font-semibold sm:text-lg">
                    Everyday 9:00–18:00
                  </p>
                </div>
              </div>

              <div className="glass-border overflow-hidden rounded-2xl bg-white shadow-sm sm:rounded-3xl">
                <div className="relative h-48 bg-slate-100 sm:h-56 lg:h-64">
                  <iframe
                    title="GANBO office location — Shekhawat Complex, Jaipur"
                    src={officeMapEmbed}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <span className="pointer-events-none absolute bottom-3 left-3 z-10 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-white sm:bottom-4 sm:left-4">
                    Office Location
                  </span>
                </div>
                <div className="p-5 sm:p-7 lg:p-8">
                  <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
                    Jaipur Office
                  </h3>
                  <address className="mb-5 not-italic text-sm leading-relaxed text-slate-500 sm:mb-6">
                    Plot No. 2 Basement Shop,
                    <br />
                    Mitra Colony, Shekhawat Complex,
                    <br />
                    Jaipur, Rajasthan 302020, India
                  </address>
                  <a
                    href={officeDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Get Directions <Icon>arrow_forward</Icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className="mb-14 sm:mb-20 lg:mb-24">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-slate-50 p-6 text-center sm:rounded-[40px] sm:p-10 md:flex-row md:gap-8 md:p-12 md:text-left">
            <div className="max-w-xl">
              <h2 className="mb-2 text-2xl font-bold tracking-tight sm:mb-3 sm:text-3xl">
                Looking for quick answers?
              </h2>
              <p className="text-sm text-slate-500 sm:text-base">
                Check out our Knowledge Base for setup guides and
                troubleshooting tips.
              </p>
            </div>
            <a
              href="#"
              className="w-full shrink-0 rounded-lg border border-slate-400 px-8 py-3 text-center text-sm font-medium transition hover:bg-white sm:w-auto"
            >
              Browse Help Center
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
