import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { blogArticles } from "../../data/blogs";
import { optimizeImage } from "../../data/products";

const PAGE_SIZE = 6;

const articles = blogArticles;

function IconArrow() {
  return (
    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
      arrow_forward
    </span>
  );
}

export default function Journal() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isFinite(rawPage)
    ? Math.min(totalPages, Math.max(1, rawPage))
    : 1;
  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return articles.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  const goToPage = (page) => {
    const nextPage = Math.min(totalPages, Math.max(1, page));
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (nextPage <= 1) next.delete("page");
        else next.set("page", String(nextPage));
        return next;
      },
      { preventScrollReset: true },
    );
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const openArticle = (slug, title) => {
    if (slug) navigate(`/blogs/${slug}`);
    else if (title)
      navigate(
        `/blogs/${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`,
      );
  };

  useEffect(() => {
    const nav = document.querySelector("header");
    const updateNav = () =>
      nav?.classList.toggle("bg-white/90", window.scrollY > 20);
    window.addEventListener("scroll", updateNav);
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#faf9ff] text-[#141b2b]">
      <Header active="Blogs" />
      <main>
        <section className="hero-gradient flex min-h-[32vh] items-center justify-center overflow-hidden px-4 pb-12 pt-28 sm:min-h-[40vh] sm:px-8 sm:pb-16 sm:pt-32 lg:px-16">
          <div className="max-w-4xl text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-blue-600 sm:mb-4 sm:text-sm">
              Latest News & Updates
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
            {pagedArticles.map(({ tag, meta, title, description, image, slug }) => (
              <article
                key={slug || title}
                data-slug={slug}
                onClick={() => openArticle(slug, title)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openArticle(slug, title);
                  }
                }}
                role="link"
                tabIndex={0}
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
                  {/* <span className="absolute left-3 top-3 rounded-sm bg-blue-600 px-2.5 py-1 text-[9px] font-bold leading-none tracking-[.1em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
                    {tag}
                  </span> */}
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
          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mx-auto mt-10 flex w-full max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:mt-14 sm:px-8 lg:px-16"
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_left
                </span>
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold transition sm:h-11 sm:min-w-11 ${
                      isActive
                        ? "bg-black text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_right
                </span>
              </button>
            </nav>
          )}
        </section>
      </main>

      {/* <button
        type="button"
        aria-label="Open chat"
        className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-2xl transition hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
      >
        <span className="material-symbols-outlined">forum</span>
      </button> */}
      <Footer />
    </div>
  );
}
