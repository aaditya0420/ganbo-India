import { useEffect, useRef } from "react";

/**
 * Sticky left-side table of contents (desktop / large screens only).
 * items: [{ id, label }]
 */
export default function ContentsNav({ items, activeId }) {
  const listRef = useRef(null);
  const activeLinkRef = useRef(null);

  // Only scroll the TOC panel itself — never the page
  useEffect(() => {
    const list = listRef.current;
    const link = activeLinkRef.current;
    if (!list || !link) return;

    const linkTop = link.offsetTop;
    const linkBottom = linkTop + link.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;

    if (linkTop < viewTop) {
      list.scrollTop = linkTop;
    } else if (linkBottom > viewBottom) {
      list.scrollTop = linkBottom - list.clientHeight;
    }
  }, [activeId]);

  return (
    <aside className="hidden lg:col-span-3 lg:block">
      <div
        ref={listRef}
        className="sticky top-28 max-h-[calc(100vh-8rem)] space-y-2 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Contents
        </p>
        <nav className="space-y-1" aria-label="Page contents">
          {items.map(({ id, label }) => {
            const isActive = activeId === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                ref={isActive ? activeLinkRef : null}
                className={`block border-l-2 py-2 pl-4 text-sm transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:border-blue-600 hover:text-black"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
