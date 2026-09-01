function compareText(a, b) {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

export function filterProducts(products, filterId) {
  if (!filterId || filterId === "all") return products;

  return products.filter((product) => {
    switch (filterId) {
      case "white":
      case "black":
      case "pink":
      case "green":
      case "blue":
        return product.color === filterId;
      case "22-5w":
        return product.wattage === 22.5;
      case "45w":
        return product.wattage === 45;
      case "65w":
        return product.wattage === 65;
      case "10000mah":
        return product.capacity === 10000;
      case "20000mah":
        return product.capacity === 20000;
      case "c-to-c":
        return product.cableType === "c-to-c";
      case "a-to-c":
        return product.cableType === "a-to-c";
      case "new":
        return product.badge?.toLowerCase() === "new";
      case "popular":
        return product.badge?.toLowerCase() === "popular";
      default:
        return true;
    }
  });
}

export function sortProducts(products, sortId) {
  const sorted = [...products];

  switch (sortId) {
    case "name-asc":
      return sorted.sort((a, b) => compareText(a.name, b.name));
    case "name-desc":
      return sorted.sort((a, b) => compareText(b.name, a.name));
    case "wattage-asc":
      return sorted.sort((a, b) => (a.wattage ?? 0) - (b.wattage ?? 0));
    case "wattage-desc":
      return sorted.sort((a, b) => (b.wattage ?? 0) - (a.wattage ?? 0));
    case "capacity-asc":
      return sorted.sort((a, b) => (a.capacity ?? 0) - (b.capacity ?? 0));
    case "capacity-desc":
      return sorted.sort((a, b) => (b.capacity ?? 0) - (a.capacity ?? 0));
    default:
      return sorted.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}

export function getCatalogProducts(products, { filter, sort }) {
  return sortProducts(filterProducts(products, filter), sort);
}
