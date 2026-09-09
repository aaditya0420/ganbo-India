import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { getAllProducts } from "../../data/products";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  purchaseDate: "",
  productName: "",
  serialNumber: "",
  consent: false,
  website: "",
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

function TurnstileWidget({ siteKey, onToken, resetKey }) {
  const hostRef = useRef(null);
  const widgetId = useRef(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey) return undefined;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !hostRef.current || !window.turnstile) return;
      if (widgetId.current != null) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
      widgetId.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => onTokenRef.current(""),
      });
    };

    const existing = document.querySelector("script[data-ganbo-turnstile]");
    if (window.turnstile) {
      renderWidget();
    } else if (existing) {
      existing.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.ganboTurnstile = "true";
      script.addEventListener("load", renderWidget);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetId.current != null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, resetKey]);

  if (!siteKey) return null;
  return <div ref={hostRef} />;
}

const fieldClass =
  "w-full rounded-xl border border-slate-200/90 bg-[#fafbff] px-4 py-3.5 text-sm text-[#141b2b] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0853ce] focus:bg-white focus:ring-4 focus:ring-[#0853ce]/10";

export default function WarrantyClaim() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const products = getAllProducts();

  const handleTurnstileToken = useCallback((token) => {
    setTurnstileToken(token || "");
  }, []);

  const updateField = (field) => (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    if (field === "name") {
      value = String(value).slice(0, 20);
    }
    if (field === "mobile") {
      value = String(value).replace(/\D/g, "").slice(0, 10);
    }
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
    if (errorMessage) setErrorMessage("");
  };

  const openDatePicker = (event) => {
    const input = event.currentTarget;
    try {
      if (typeof input.showPicker === "function") input.showPicker();
    } catch {
      // Picker already open or not supported
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.consent) {
      setStatus("error");
      setErrorMessage("Please allow us to contact you before submitting.");
      return;
    }

    if (form.name.trim().length > 20) {
      setStatus("error");
      setErrorMessage("Name can be at most 20 characters.");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile.trim())) {
      setStatus("error");
      setErrorMessage("Enter a 10-digit mobile number.");
      return;
    }

    if (!TURNSTILE_SITE_KEY) {
      setStatus("error");
      setErrorMessage("Verification is not configured yet.");
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification checkbox.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/warranty-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          mobile: form.mobile.trim(),
          purchaseDate: form.purchaseDate,
          productName: form.productName,
          serialNumber: form.serialNumber.trim(),
          consent: form.consent,
          website: form.website,
          turnstileToken,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Could not submit your claim.");
      }

      setForm(initialForm);
      setTurnstileToken("");
      setTurnstileReset((value) => value + 1);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Could not submit your claim. Please try again.",
      );
      setTurnstileToken("");
      setTurnstileReset((value) => value + 1);
    }
  };

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Warranty Claim" />
      <main className="relative pt-20 sm:pt-24">
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
                    Thank you. We have emailed a confirmation to you, and our
                    support team has received your warranty claim. We will get
                    back to you shortly.
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
                  className="relative space-y-5 px-5 py-6 sm:space-y-6 sm:px-8 sm:py-8"
                  onSubmit={handleSubmit}
                >
                  <div
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={updateField("website")}
                      placeholder="Company website"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-5">
                    <Field label="Name">
                      <input
                        type="text"
                        value={form.name}
                        onChange={updateField("name")}
                        placeholder="Your full name"
                        maxLength={20}
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
                        maxLength={254}
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Mobile" required>
                      <input
                        required
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit mobile number"
                        value={form.mobile}
                        onChange={updateField("mobile")}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={fieldClass}
                      />
                    </Field>

                    <Field label="Purchase Date">
                      <input
                        type="date"
                        value={form.purchaseDate}
                        onChange={updateField("purchaseDate")}
                        onClick={openDatePicker}
                        onFocus={openDatePicker}
                        className={`${fieldClass} cursor-pointer`}
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
                        maxLength={80}
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

                  <TurnstileWidget
                    siteKey={TURNSTILE_SITE_KEY}
                    onToken={handleTurnstileToken}
                    resetKey={turnstileReset}
                  />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#141b2b] text-sm font-bold tracking-wide text-white shadow-lg shadow-[#141b2b]/15 transition hover:bg-[#0853ce] disabled:cursor-not-allowed disabled:opacity-70 sm:h-14"
                  >
                    {status === "sending" ? "Submitting..." : "Submit Claim"}
                    <Icon className="text-[20px]">arrow_forward</Icon>
                  </button>

                  {status === "error" && errorMessage && (
                    <p className="text-center text-sm text-red-600">
                      {errorMessage}
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
