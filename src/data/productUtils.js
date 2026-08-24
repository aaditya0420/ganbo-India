/**
 * Small helpers for the product catalog.
 * Pages import these via `products.js` — you usually don’t need this file directly.
 */

import { products } from "./catalog";

/** "Fast Charger 65W" → "fast-charger-65w" */
export function toSlug(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const slugify = toSlug;

/** Old URLs that should still open the renamed products */
const ALIASES = {
  "apex-power-20k": "fast-charging-powerbank-20000mah",
  "go-power-10k": "fast-charging-powerbank-10000mah",
};

/** Every product as a list: [{ id, title, image, ... }] */
export function getAllProducts() {
  return Object.entries(products).map(([id, product]) => ({ id, ...product }));
}

/** Products in one category, e.g. "Cables" */
export function getProductsByCategory(category) {
  return getAllProducts().filter((p) => p.category === category);
}

/** Gallery images for a product page (falls back to main image) */
export function getProductGallery(product) {
  if (!product) return [];
  if (Array.isArray(product.gallery) && product.gallery.length) {
    return [...new Set(product.gallery.filter(Boolean))];
  }
  return product.image ? [product.image] : [];
}

function sameWords(a, b) {
  const key = (text) =>
    toSlug(text).split("-").filter(Boolean).sort().join("-");
  return key(a) === key(b);
}

/**
 * Find a product by URL slug or title.
 * Order: alias → exact id → title slug → same words (any order)
 */
export function findProduct(slugOrTitle) {
  if (!slugOrTitle) return null;

  let search = toSlug(slugOrTitle);
  if (ALIASES[search]) search = ALIASES[search];

  if (products[search]) {
    return { id: search, slug: search, ...products[search] };
  }

  const all = getAllProducts();

  const byTitle = all.find((p) => toSlug(p.title) === search);
  if (byTitle) return { ...byTitle, slug: byTitle.id };

  const byWords = all.find(
    (p) => sameWords(p.id, search) || sameWords(p.title, search),
  );
  if (byWords) return { ...byWords, slug: byWords.id };

  return null;
}

export const getProductBySlug = findProduct;

/** Id for links: /product/{id} */
export function getProductSlug(titleOrSlug) {
  return findProduct(titleOrSlug)?.id ?? toSlug(titleOrSlug);
}

/** Build a Cloudinary URL from a path */
export function cloudinary(path, width = 1200) {
  const clean = String(path || "").replace(/^\/+/, "");
  return `https://res.cloudinary.com/deywq723/image/upload/f_auto,q_auto:good,c_limit,w_${width}/${clean}`;
}

/**
 * Serve a Cloudinary image at display size (quality stays high).
 * 200 thumb · 700 card · 1200 product · 1920 hero
 */
export function optimizeImage(url, width = 1200) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const marker = "/upload/";
  const at = url.indexOf(marker);
  if (at === -1) return url;

  const head = url.slice(0, at + marker.length);
  let tail = url.slice(at + marker.length);

  const slash = tail.indexOf("/");
  if (slash > 0) {
    const first = tail.slice(0, slash);
    if (/[_,]/.test(first) && !/^v\d+$/i.test(first)) {
      tail = tail.slice(slash + 1);
    }
  }

  return `${head}f_auto,q_auto:good,c_limit,w_${width}/${tail}`;
}
