import { Link } from "react-router-dom";

function Icon({ children }) {
  return <span className="material-symbols-outlined">{children}</span>;
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8Z" />
      <path
        d="m10 15.4 5-3.4-5-3.4v6.8Z"
        className="fill-[#dce4ff] transition group-hover:fill-blue-600"
      />
    </svg>
  );
}

export default function Footer() {
  const groups = [
    [
      "Products",
      [
        ["Chargers", "/chargers"],
        ["Power Banks", "/power-banks"],
        ["Cables", "/cables"],
        ["Neck Mounts", "/neck-mounts"],
      ],
    ],
    [
      "Company",
      [
        ["Our Story", "/about"],
        ["Blogs", "/blogs"],
      ],
    ],
    [
      "Support",
      [
        ["Return Policy", "/return-policy"],
        // ["Warranty Info", "/warranty"],
        ["Privacy Policy", "/privacy-policy"],
        ["Terms of Service", "/terms-of-service"],
      ],
    ],
  ];
  return (
    <footer className="max-w-full overflow-x-clip border-t border-slate-200 bg-white py-12 sm:py-16">
      <div className="mx-auto mb-16 grid w-full min-w-0 max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:gap-8 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-16">
        {/* Address last on mobile only; first from md up. 2×2 on tablet, 4 cols on desktop. */}
        <div className="order-last sm:col-span-3 md:order-first md:col-span-1">
          <div className="space-y-4 text-base leading-7 text-slate-500">
            <p className="flex max-w-md items-start gap-3 lg:max-w-[290px]">
              <Icon>location_on</Icon>
              <span>
                Plot No.2 Basement Shop, Mitra Colony, Shekhawat Complex,
                Jaipur, Rajasthan 302020, India
              </span>
            </p>
            <a
              href="mailto:info@rhsdpl.com"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Icon>mail</Icon>
              <span>info@rhsdpl.com</span>
            </a>
            <a
              href="tel:7375004001"
              className="flex items-center gap-3 transition hover:text-black"
            >
              <Icon>phone</Icon>
              <span>7375004001</span>
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/share/1BrYeiDd6F/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#dce4ff] text-sm font-bold text-slate-700 transition hover:bg-blue-600 hover:text-white"
            >
              f
            </a>
            <a
              href="https://x.com/ganboindia8761?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#dce4ff] text-sm font-medium text-slate-700 transition hover:bg-blue-600 hover:text-white"
            >
              𝕏
            </a>
            <a
              href="https://www.instagram.com/ganboindia?igsh=bjFoOWdscWR5Z2o0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#dce4ff] text-slate-700 transition hover:bg-blue-600 hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/ganboindia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#dce4ff] text-xs font-bold text-slate-700 transition hover:bg-blue-600 hover:text-white"
            >
              in
            </a>
            <a
              href="https://youtube.com/@ganboindia?si=CgzwR22GQr1ELbcj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group grid h-8 w-8 place-items-center rounded-full bg-[#dce4ff] text-slate-700 transition hover:bg-blue-600 hover:text-white"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>
        {groups.map(([heading, links]) => (
          <div key={heading}>
            <h3 className="text-sm font-normal uppercase tracking-[.2em]">
              {heading}
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    onClick={() =>
                      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
                    }
                    className="text-base text-slate-500 transition hover:text-black"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 px-4 pt-8 text-center text-sm text-slate-500 sm:px-8 md:flex-row md:text-left lg:px-16">
        <p>© 2026 GANBO India. Engineered for the future.</p>
        {/* <div className="flex gap-4"><Icon>payments</Icon><Icon>credit_card</Icon><Icon>account_balance_wallet</Icon></div> */}
      </div>
    </footer>
  );
}
