import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { products } from "../../data/products";

function Icon({ children, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`.trim()}
    >
      {children}
    </span>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="22"
      height="22"
      fill="currentColor"
      className={className}
    >
      <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z" />
    </svg>
  );
}

const links = [
  ["Fast Chargers", "/chargers"],
  ["Power Banks", "/power-banks"],
  ["Charging Cables", "/cables"],
  ["Neck Mounts", "/neck-mounts"],
  ["About Us", "/about"],
  ["Blogs", "/blogs"],
  ["Contact Us", "/contact"],
];

function activeLinkFromPath(pathname) {
  if (!pathname || pathname === "/") return "";

  if (pathname.startsWith("/journal") || pathname.startsWith("/blogs")) {
    return "Blogs";
  }

  const match = links.find(
    ([, path]) => pathname === path || pathname.startsWith(`${path}/`),
  );
  return match?.[0] ?? "";
}

function SearchResults({ results, onSelect }) {
  if (!results) return null;

  return (
    <div className="mt-2 max-h-[min(60vh,360px)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
      {results.length > 0 ? (
        results.map(([slug, product]) => (
          <Link
            key={slug}
            to={`/product/${slug}`}
            onClick={onSelect}
            className="flex gap-3 rounded-lg p-2 transition hover:bg-slate-50"
          >
            <img
              src={product.image}
              alt=""
              className="h-12 w-12 shrink-0 rounded object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-slate-900">
                {product.title}
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                {product.category}
              </span>
            </span>
          </Link>
        ))
      ) : (
        <p className="px-3 py-4 text-center text-sm text-slate-500">
          No products found
        </p>
      )}
    </div>
  );
}

export default function Header({ active }) {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const activeItem =
    active !== undefined && active !== ""
      ? active
      : activeLinkFromPath(pathname);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return null;

    return Object.entries(products).filter(([slug, product]) =>
      [slug, product.title, product.category, product.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 max-w-full overflow-x-clip border-b border-white/50 bg-white/75 shadow-sm backdrop-blur-xl"
    >
      {" "}
      <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-8 lg:px-16">
        <Link
          to="/"
          aria-label="GANBO home"
          className="relative z-10 flex items-center"
        >
          <img src={logo} alt="GANBO" className="h-9 w-auto object-contain" />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 lg:flex xl:gap-6">
          {links.map(([item, path]) => (
            <Link
              key={item}
              to={path}
              className={`whitespace-nowrap text-sm transition-colors ${activeItem === item ? "border-b-2 border-black pb-1 font-normal text-black" : "text-slate-500 hover:text-black"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-1 sm:gap-2">
          {/* Desktop inline search (lg+) */}
          {searchOpen ? (
            <div className="relative hidden w-[min(40vw,320px)] lg:block">
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-0 top-1/2 z-10 -translate-y-1/2 text-slate-800">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  aria-label="Search products"
                  autoFocus
                  autoComplete="off"
                  className="w-full border-b border-black bg-transparent py-2.5 pl-8 pr-8 text-sm leading-normal text-black outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center p-0 text-slate-500 transition hover:text-black"
                >
                  <Icon className="block text-[22px]">close</Icon>
                </button>
              </div>
              <div className="absolute right-0 top-full z-[60] w-full">
                <SearchResults results={results} onSelect={closeSearch} />
              </div>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Search"
              onClick={openSearch}
              className="hidden h-9 w-9 place-items-center text-slate-800 lg:grid"
            >
              <SearchIcon />
            </button>
          )}

          {/* Mobile / tablet search trigger */}
          <button
            type="button"
            aria-label="Search"
            onClick={openSearch}
            className="grid h-9 w-9 place-items-center text-slate-800 lg:hidden"
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-9 w-9 place-items-center text-slate-800 lg:hidden"
          >
            <span
              className="relative flex h-[14px] w-5 flex-col justify-between"
              aria-hidden="true"
            >
              <span
                className={`block h-[2px] w-full bg-current transition-transform duration-300 ease-in-out ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-current transition-opacity duration-200 ease-in-out ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-current transition-transform duration-300 ease-in-out ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      {/* Mobile / tablet floating search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-0 z-[70] px-3 pt-2 lg:hidden">
          <div className="relative flex h-12 items-center rounded-xl bg-white px-3 shadow-[0_8px_24px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type keyword to Search..."
              aria-label="Search products"
              autoFocus
              autoComplete="off"
              className="h-full w-full bg-transparent py-0 pl-9 pr-9 text-sm leading-normal text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full p-0 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <Icon className="block text-[22px]">close</Icon>
            </button>
          </div>
          <SearchResults results={results} onSelect={closeSearch} />
        </div>
      )}
      <nav
        aria-hidden={!menuOpen}
        className={`origin-top overflow-hidden border-t border-slate-200 bg-white px-5 shadow-lg transition-all duration-300 ease-out lg:hidden ${menuOpen ? "max-h-[420px] translate-y-0 py-3 opacity-100" : "pointer-events-none max-h-0 -translate-y-2 py-0 opacity-0"}`}
      >
        {links.map(([item, path]) => (
          <Link
            key={item}
            to={path}
            onClick={closeMenu}
            className={`block border-b border-slate-100 py-3 text-sm transition-colors last:border-0 ${activeItem === item ? "font-semibold text-black" : "text-slate-600 hover:text-black"}`}
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
