import { useEffect, useState } from "react";

/**
 * Tracks which page section is currently in focus while scrolling.
 *
 * How it works (simple):
 * - Imagine a horizontal line ~1/3 down the screen
 * - The last section whose top has crossed that line is "active"
 *
 * Using a % of the viewport (not a fixed px) works better on long
 * policy pages where sections are tall.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey.split(",").filter(Boolean);
    if (ids.length === 0) return;

    function updateActive() {
      // Line used to decide the active section (about 1/3 down the screen)
      const probeY = Math.max(120, window.innerHeight * 0.32);
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= probeY) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [idsKey]);

  return activeId;
}
