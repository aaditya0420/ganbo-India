import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { getAllProducts } from "../../data/products";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  purchaseDate: "",
  productName: "",
  serialNumber: "",
  consent: false,
};

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()}>
      {children}
    </span>
  );
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

function Field({ label, required, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2.5 block text-[13px] font-semibold tracking-wide text-[#141b2b]">
        {label}
        {required && <span className="ml-0.5 text-[#0853ce]">*</span>}
      </span>
      {children}
    </label>
  );
}

const fieldClass =
  "w-full rounded-xl border border-slate-200/90 bg-[#fafbff] px-4 py-3.5 text-sm text-[#141b2b] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0853ce] focus:bg-white focus:ring-4 focus:ring-[#0853ce]/10";

export default function WarrantyClaim() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const products = getAllProducts();

  const updateField = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.consent) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm(initialForm);
  };

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Warranty Claim" />
      <main className="relative pt-20 sm:pt-24">
        {/* Soft atmosphere behind the form */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_#e8edff_0%,_#faf9ff_55%,_transparent_75%)]"
        />

        <Container className="relative pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#0853ce]">
              GANBO Support
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Warranty Claim
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-base">
              Submit your product details and our support team will review your
              claim quickly and fairly.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-start lg:gap-8">
            {/* Side panel — trust / help */}
            <aside className="order-2 space-y-4 lg:order-1">
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-sm sm:p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#eff6ff] text-[#0853ce]">
                  <Icon>verified_user</Icon>
                </div>
                <h2 className="text-lg font-semibold">We&apos;re here to help</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Keep your purchase invoice and product serial number ready for
                  a faster claim review.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-sm sm:p-6">
                <ul className="space-y-4">
                  {[
                    ["schedule", "Response within 24–48 hours"],
                    ["inventory_2", "Valid for eligible GANBO products"],
                    ["support_agent", "Dedicated warranty support"],
                  ].map(([icon, text]) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f4f6fb] text-[#0853ce]">
                        <Icon className="text-[18px]">{icon}</Icon>
                      </span>
                      <span className="pt-1 text-sm font-medium text-slate-700">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="px-1 text-sm text-slate-500">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-[#0853ce] underline-offset-2 hover:underline"
                >
                  Contact support
                </Link>
              </p>
            </aside>

            {/* Form */}
            <div className="order-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(20,27,43,0.06)] sm:rounded-3xl lg:order-2">
              <div className="border-b border-slate-100 bg-gradient-to-r from-[#141b2b] to-[#1e3a6e] px-5 py-5 sm:px-8 sm:py-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
                  Claim form
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                  Product registration details
                </h2>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16">
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#eff6ff] text-[#0853ce]">
                    <Icon className="text-[28px]">check_circle</Icon>
                  </div>
                  <h3 className="text-xl font-semibold">Claim submitted</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                    Thank you. Our support team has received your warranty claim
                    and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-[#0853ce] hover:text-[#0853ce]"
                  >
                    Submit another claim
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-5 px-5 py-6 sm:space-y-6 sm:px-8 sm:py-8"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-5">
                    <Field label="Name">
                      <input
                        type="text"
                        value={form.name}
                        onChange={updateField("name")}
                        placeholder="Your full name"
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={updateField("email")}
                        placeholder="you@email.com"
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Mobile">
                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={updateField("mobile")}
                        placeholder="Phone number"
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Purchase Date">
                      <input
                        type="date"
                        value={form.purchaseDate}
                        onChange={updateField("purchaseDate")}
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Product Name" required>
                      <select
                        required
                        value={form.productName}
                        onChange={updateField("productName")}
                        className={`${fieldClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="" disabled>
                          Select your product
                        </option>
                        {products.map((product) => (
                          <option key={product.id} value={product.title}>
                            {product.title}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Serial Number" required>
                      <input
                        required
                        type="text"
                        value={form.serialNumber}
                        onChange={updateField("serialNumber")}
                        placeholder="Found on product / packaging"
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-[#fafbff] p-4 text-sm leading-relaxed text-slate-600 transition hover:border-slate-200">
                    <input
                      required
                      type="checkbox"
                      checked={form.consent}
                      onChange={updateField("consent")}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#0853ce] focus:ring-[#0853ce]"
                    />
                    <span>
                      Allow us to contact you about this warranty registration.
                      We&apos;ll only use your data for this purpose.
                      <span className="ml-0.5 text-[#0853ce]">*</span>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#141b2b] text-sm font-bold tracking-wide text-white shadow-lg shadow-[#141b2b]/15 transition hover:bg-[#0853ce] sm:h-14"
                  >
                    Submit Claim
                    <Icon className="text-[20px]">arrow_forward</Icon>
                  </button>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-600">
                      Please allow us to contact you before submitting.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
