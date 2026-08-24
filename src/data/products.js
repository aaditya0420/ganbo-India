/**
 * Product data API for the site.
 *
 * Approach (keep this simple):
 * 1. catalog.js     → product data only (id, title, images, specs…)
 * 2. productUtils.js → how to find / list / optimize images
 * 3. this file      → one import path for pages: `from "../../data/products"`
 *
 * Product shape (common fields):
 *   category, title, price, image, gallery?, description,
 *   features?, productInfo?, specs?, detailSections?, inTheBox?, badge?
 *
 * Links use the object key as the URL slug:
 *   products["fast-charger-65w-white"] → /product/fast-charger-65w-white
 */

export { images, products } from "./catalog";

export {
  toSlug,
  slugify,
  cloudinary,
  optimizeImage,
  getAllProducts,
  getProductsByCategory,
  getProductGallery,
  findProduct,
  getProductBySlug,
  getProductSlug,
} from "./productUtils";
