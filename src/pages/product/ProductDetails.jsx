import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AccordionItem from "../../components/ui/Accordion";
import {
  findProduct,
  getAllProducts,
  getProductGallery,
  images,
  optimizeImage,
} from "../../data/products";

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{children}</span>
  );
}

function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full min-w-0 max-w-7xl px-5 sm:px-8 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

// Used for "related products" order only (keeps the list looking mixed)
const stableScore = (value) =>
  [...value].reduce(
    (score, character) => (score * 31 + character.charCodeAt(0)) % 997,
    7,
  );

// Simple placeholder image when a product is not in the catalog
function makeDemoImage(title, view) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="800" height="800" fill="#e8edf5"/><rect x="90" y="90" width="620" height="620" rx="28" fill="#d5dce8"/><circle cx="400" cy="340" r="120" fill="#f8fafc"/><text x="400" y="570" text-anchor="middle" font-family="Arial" font-size="30" font-weight="700" fill="#0f172a">${title}</text><text x="400" y="620" text-anchor="middle" font-family="Arial" font-size="24" fill="#475569">Demo view ${view}</text></svg>`,
  )}`;
}

// Basic product shown only if we cannot find the item in products.js
function makeFallbackProduct(slug) {
  const title = slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  let category = "Power Banks";
  let image = images.bank;

  if (slug.includes("cable")) {
    category = "Cables";
    image = images.cable;
  } else if (slug.includes("charger")) {
    category = "Chargers";
    image = images.charger;
  }

  return {
    category,
    title,
    price: "Contact for price",
    image,
    description:
      "Precision engineering meets dependable everyday power. Designed for performance, safety, and a refined GANBO experience.",
    features: [
      ["bolt", "Fast Performance"],
      ["verified", "Safe Design"],
      ["devices", "Universal Compatibility"],
    ],
    specs: [
      ["Brand", "GANBO Engineering"],
      ["Model NO.", "GANBO-PRO"],
      ["Performance", "Precision engineered"],
      ["Warranty", "1 Year International"],
    ],
  };
}

/** Build accordion sections from product data (skip empty ones). */
function getProductAccordionItems(product) {
  const items = [];

  if (product.detailSections?.length) {
    items.push({
      id: "details",
      title: product.detailAccordionTitle || "Why You'll Love This Product",
      body: (
        <div className="space-y-6 sm:space-y-8">
          {product.detailSections.map(([heading, text]) => (
            <div key={heading}>
              <h4 className="text-base font-semibold text-[#141b2b]">
                {heading}
              </h4>
              <p className="mt-2">{text}</p>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (product.inTheBox?.length) {
    items.push({
      id: "in-the-box",
      title: "What's in the Box?",
      body: (
        <ul className="space-y-2">
          {product.inTheBox.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Icon className="mt-0.5 shrink-0 text-base text-blue-600">
                check_circle
              </Icon>
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  return items;
}

export default function ProductDetails() {
  const { slug } = useParams();
  const location = useLocation();

  // 1) Look up the product in our catalog (products.js)
  const catalogProduct = findProduct(slug);

  // 2) Optional data passed from a category card click
  const cardProduct = location.state?.catalogProduct;

  // 3) Prefer catalog data so gallery / specs always load correctly
  const product = catalogProduct || cardProduct || makeFallbackProduct(slug);

  const [selected, setSelected] = useState({ slug, image: product.image });
  const [reviewOpen, setReviewOpen] = useState(false);
  // Which accordion is open (item id), or null when all closed
  const [openAccordionId, setOpenAccordionId] = useState(null);

  const accordionItems = getProductAccordionItems(product);

  // Close accordion when user opens a different product
  useEffect(() => {
    setOpenAccordionId(null);
  }, [slug]);

  const toggleAccordion = (id) => {
    setOpenAccordionId((current) => (current === id ? null : id));
  };

  const selectedImage = selected.slug === slug ? selected.image : product.image;

  // Real gallery from products.js, or placeholders only for unknown products
  const gallery = catalogProduct
    ? getProductGallery(catalogProduct)
    : [
        product.image,
        ...Array.from({ length: 5 }, (_, index) =>
          makeDemoImage(product.title, index + 1),
        ),
      ].filter(Boolean);

  const selectedIndex = Math.max(0, gallery.indexOf(selectedImage));

  const changeGalleryImage = (direction) => {
    if (!gallery.length) return;
    const nextIndex =
      (selectedIndex + direction + gallery.length) % gallery.length;
    setSelected({ slug, image: gallery[nextIndex] });
  };

  const related = getAllProducts()
    .filter(
      (item) => item.id !== catalogProduct?.id && item.title !== product.title,
    )
    .sort(
      (a, b) => stableScore(`${slug}-${a.id}`) - stableScore(`${slug}-${b.id}`),
    )
    .slice(0, 3)
    .map((item) => ({ ...item, slug: item.id }));

  const categoryPath = product.category.toLowerCase().replace(" ", "-");

  return (
    <div className="w-full max-w-full overflow-x-clip bg-[#faf9ff] text-[#141b2b]">
      <Header
        active={
          product.category === "Power Banks"
            ? "Power Banks"
            : product.category === "Chargers"
              ? "Fast Chargers"
              : product.category === "Cables"
                ? "Charging Cables"
                : product.category
        }
      />
      <main className="min-w-0 max-w-full overflow-x-clip pt-16">
        <section className="py-6 sm:py-8 lg:py-10">
          <Container className="min-w-0">
            <nav className="mb-5 max-w-full text-[11px] uppercase leading-5 tracking-wider text-slate-400 sm:mb-6 sm:text-xs sm:tracking-widest">
              <p className="break-words">
                <Link to="/">Home</Link>
                {" / "}
                <Link to={`/${categoryPath}`}>{product.category}</Link>
                {" / "}
                <span className="text-slate-700">{product.title}</span>
              </p>
            </nav>

            <div className="grid min-w-0 items-start gap-6 sm:gap-8 lg:grid-cols-2">
              <div className="relative w-full min-w-0 max-w-[560px] justify-self-center lg:max-w-none">
                <div className="product-detail-media product-gradient group relative overflow-hidden rounded-xl border border-slate-300/40">
                  <img
                    key={selectedImage}
                    src={optimizeImage(selectedImage, 1200)}
                    alt={product.title}
                    decoding="async"
                    fetchPriority="high"
                    className="product-image-change h-full w-full object-contain"
                  />
                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous product image"
                        onClick={() => changeGalleryImage(-1)}
                        className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-300/80 bg-white/85 text-[#0f2f80] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#0f2f80] hover:bg-[#0f2f80] hover:text-white sm:left-4 sm:h-11 sm:w-11 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
                      >
                        <Icon>chevron_left</Icon>
                      </button>
                      <button
                        type="button"
                        aria-label="Next product image"
                        onClick={() => changeGalleryImage(1)}
                        className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-300/80 bg-white/85 text-[#0f2f80] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#0f2f80] hover:bg-[#0f2f80] hover:text-white sm:right-4 sm:h-11 sm:w-11 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
                      >
                        <Icon>chevron_right</Icon>
                      </button>
                    </>
                  )}
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-sm bg-blue-600 px-2.5 py-1.5 text-[10px] font-bold tracking-widest text-white sm:left-6 sm:top-6 sm:px-3 sm:py-2">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="relative mt-3 min-w-0 max-w-full sm:mt-4">
                  <div className="flex w-full min-w-0 max-w-full flex-nowrap justify-start gap-2 overflow-x-auto overscroll-x-contain pb-2 hide-scrollbar">
                    {gallery.map((image, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelected({ slug, image })}
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded border-2 transition duration-300 sm:h-16 sm:w-16 lg:h-20 lg:w-20 ${selectedImage === image ? "border-black" : "border-slate-300"}`}
                      >
                        <img
                          src={optimizeImage(image, 200)}
                          alt={`${product.title} detail ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-4">
                <h1 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
                  {product.title}
                </h1>
                {/* Product pricing is intentionally hidden until pricing is finalized. */}
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {product.description}
                </p>
                <ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  {product.features.map(([icon, feature]) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Icon className="mt-0.5 shrink-0 text-lg">{icon}</Icon>
                      <span className="min-w-0">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
                  {product.amazonUrl ? (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 items-center justify-center rounded bg-black text-sm font-bold text-white shadow-lg transition hover:bg-slate-700 sm:h-14 sm:text-base"
                    >
                      Buy on Amazon
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="flex h-12 items-center justify-center rounded bg-black text-sm font-bold text-white shadow-lg transition hover:bg-slate-700 sm:h-14 sm:text-base"
                    >
                      Buy on Amazon
                    </button>
                  )}
                  {product.flipkartUrl ? (
                    <a
                      href={product.flipkartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 items-center justify-center rounded border border-slate-300 bg-slate-100 text-sm font-bold transition hover:bg-slate-200 sm:h-14 sm:text-base"
                    >
                      Buy on Flipkart
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="flex h-12 items-center justify-center rounded border border-slate-300 bg-slate-100 text-sm font-bold transition hover:bg-slate-200 sm:h-14 sm:text-base"
                    >
                      Buy on Flipkart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-10 sm:py-14 lg:py-16">
          <Container>
            <h2 className="mb-8 text-center text-2xl sm:mb-10 sm:text-3xl">
              Engineered for Velocity
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {(product.features?.length
                ? product.features.map(([icon, title]) => [
                    icon,
                    title,
                    title.includes("22.5W") || title.includes("High Speed")
                      ? "Recharge your devices quickly with optimized PD and QC protocols."
                      : title.includes("Protection")
                        ? "Multiple layers of circuit protection including temperature control and short-circuit protection."
                        : title.includes("Compatibility")
                          ? "Designed to work seamlessly across smartphones, tablets, and more."
                          : title.includes("Dual Port") ||
                              title.includes("Auto-Detect")
                            ? "Smart dual-port charging that adapts power for connected devices."
                            : title.includes("Smart IC")
                              ? "Intelligent chip control for faster, safer everyday charging."
                              : "Built for reliable performance in daily use and travel.",
                  ])
                : [
                    [
                      "flash_on",
                      "22.5W Fast Charge",
                      "Recharge your devices quickly with optimized PD and QC protocols.",
                    ],
                    [
                      "security",
                      "Total Protection",
                      "Multiple layers of circuit protection including temperature control and short-circuit protection.",
                    ],
                    [
                      "devices",
                      "Universal Compatibility",
                      "Designed to work seamlessly across your everyday devices.",
                    ],
                  ]
              ).map(([icon, title, text]) => (
                <article
                  key={title}
                  className="flex flex-col items-center gap-3 rounded-xl border border-slate-300/40 bg-[#faf9ff] p-6 text-center transition hover:border-black sm:gap-4 sm:p-8"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-black/10 bg-black/5 sm:h-16 sm:w-16">
                    <Icon className="text-[28px] sm:text-[32px]">{icon}</Icon>
                  </div>
                  <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-10 sm:py-14 lg:py-16">
          <Container>
            <div className="mb-8 border-l-4 border-black pl-4 sm:mb-12">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Technical Details
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Product information and precision specifications.
              </p>
            </div>

            <div className="grid gap-10 border-t border-slate-300/40 pt-6 sm:gap-12 sm:pt-8 md:grid-cols-2">
              {/* Product information (brand, weight, warranty, etc.) */}
              <div className="min-w-0">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                  Product information
                </h3>
                {(product.productInfo?.length
                  ? product.productInfo
                  : product.specs?.slice(0, 4) || []
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-slate-300/30 py-3 text-sm sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <span className="shrink-0 text-slate-500">{label}</span>
                    <span className="break-words font-bold sm:max-w-[70%] sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical specifications */}
              <div className="min-w-0">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest">
                  Technical Specifications
                </h3>
                {(product.productInfo?.length
                  ? product.specs || []
                  : product.specs?.slice(4)?.length
                    ? product.specs.slice(4)
                    : product.specs || []
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-slate-300/30 py-3 text-sm sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <span className="shrink-0 text-slate-500">{label}</span>
                    <span className="break-words font-bold sm:max-w-[70%] sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {accordionItems.length > 0 && (
              <div className="mx-auto mt-10 max-w-3xl space-y-3 sm:mt-14 sm:space-y-4">
                {accordionItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    title={item.title}
                    isOpen={openAccordionId === item.id}
                    onToggle={() => toggleAccordion(item.id)}
                  >
                    {item.body}
                  </AccordionItem>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* <section className="bg-slate-100 py-10 sm:py-14 lg:py-16">
          <Container>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:gap-5 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  User Experiences
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="text-blue-600">★★★★★</div>
                  <span className="font-bold">4.8 / 5</span>
                  <span className="text-xs text-slate-500">
                    (1,248 reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setReviewOpen(!reviewOpen)}
                className="w-full rounded-full border-2 border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white sm:w-auto"
              >
                Write a Review
              </button>
            </div>
            {reviewOpen && (
              <p className="mb-6 rounded-xl bg-white p-4 text-sm text-blue-600">
                Review form coming soon.
              </p>
            )}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {[
                [
                  "Vikram S.",
                  "2 days ago",
                  "The build quality is incredible. Feels like a premium piece of tech, not just a battery. Fast charging works perfectly with my iPhone 15 Pro.",
                ],
                [
                  "Ananya M.",
                  "1 week ago",
                  "Super slim and compact. The LED display is very helpful for knowing exactly how much charge is left.",
                ],
                [
                  "Rahul K.",
                  "3 weeks ago",
                  "Great for traveling. Charging multiple devices at once is a lifesaver at the airport. Highly recommended for professionals.",
                ],
              ].map(([name, date, text]) => (
                <article
                  key={name}
                  className="rounded-xl border border-slate-300/40 bg-[#faf9ff] p-5 transition hover:border-blue-600 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">{name}</p>
                      <p className="text-xs text-slate-500">Verified Buyer</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-500">
                      {date}
                    </span>
                  </div>
                  <div className="my-4 text-blue-600">★★★★★</div>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section> */}

        <section className="max-w-full overflow-x-clip py-10 sm:py-14 lg:py-16">
          <Container className="min-w-0">
            <h2 className="mb-8 text-2xl font-semibold sm:mb-10 sm:text-3xl">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/product/${item.slug}`}
                  state={{
                    catalogProduct: {
                      category: item.category,
                      title: item.title,
                      image: item.image,
                    },
                  }}
                  className="group min-w-0 overflow-hidden rounded-xl border border-slate-300/40 bg-white"
                >
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={optimizeImage(item.image, 700)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold sm:text-lg">
                      {item.title}
                    </h3>
                    <div className="mt-4">
                      <span className="sr-only">Product price hidden</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
