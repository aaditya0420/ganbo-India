/**
 * Simple accordion item.
 *
 * Parent keeps track of which item is open (one id, or null).
 * Example:
 *   const [openId, setOpenId] = useState(null);
 *   const toggle = (id) => setOpenId((current) => (current === id ? null : id));
 *   <AccordionItem title="Details" isOpen={openId === "details"} onToggle={() => toggle("details")}>
 *     ...
 *   </AccordionItem>
 */
export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 transition-shadow duration-300 ${
        isOpen ? "shadow-sm" : "shadow-none"
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 bg-slate-100 p-4 text-left text-sm font-semibold transition-colors duration-300 hover:bg-slate-200/80 sm:p-6"
      >
        <span className="min-w-0">{title}</span>

        {/* Crossfade between + and − (keeps both icons stacked, fades one in/out) */}
        <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-black text-white">
          <span
            className={`material-symbols-outlined absolute text-[18px] leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "scale-75 opacity-0"
                : "scale-100 opacity-100"
            }`}
            aria-hidden={isOpen}
          >
            add
          </span>
          <span
            className={`material-symbols-outlined absolute text-[18px] leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
            aria-hidden={!isOpen}
          >
            remove
          </span>
        </span>
      </button>

      {/* Height animates with CSS grid (0fr → 1fr). See .accordion-panel in index.css */}
      <div
        className={`accordion-panel ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-panel-inner">
          <div className="accordion-panel-content border-t border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
