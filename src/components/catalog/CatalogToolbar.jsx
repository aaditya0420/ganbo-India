import { useEffect, useRef, useState } from "react";

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()}>
      {children}
    </span>
  );
}

function Dropdown({ label, icon, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const activeOption =
    options.find((option) => option.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;

    const closeOnClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-w-0 w-full lg:w-auto">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${label}: ${activeOption.label}`}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full min-w-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-left transition sm:gap-2 sm:rounded-full sm:px-4 sm:py-2 lg:w-auto ${
          open
            ? "border-blue-600 bg-blue-50 text-blue-700"
            : "border-slate-300 bg-white hover:border-slate-400"
        }`}
      >
        {icon && (
          <Icon className="shrink-0 text-[18px] sm:text-[20px]">{icon}</Icon>
        )}

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:hidden">
            {label}
          </span>
          <span className="block truncate text-xs font-semibold text-slate-900 sm:text-sm">
            <span className="hidden sm:inline">{label}: </span>
            {activeOption.label}
          </span>
        </span>

        <Icon className="shrink-0 text-[18px] text-slate-500">
          {open ? "expand_less" : "expand_more"}
        </Icon>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-2 max-h-[min(60vh,320px)] overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl sm:right-0 sm:left-auto sm:min-w-[220px] sm:max-w-none"
        >
          {options.map((option) => (
            <li key={option.id} role="option" aria-selected={value === option.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition hover:bg-slate-50 sm:py-2.5 ${
                  value === option.id
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-700"
                }`}
              >
                <span className="min-w-0">{option.label}</span>
                {value === option.id && (
                  <Icon className="shrink-0 text-[18px]">check</Icon>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CatalogToolbar({
  filter,
  sort,
  filterOptions,
  sortOptions,
  onFilterChange,
  onSortChange,
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:gap-3 lg:flex lg:w-auto lg:justify-end">
      <Dropdown
        label="Filter"
        icon="filter_list"
        value={filter}
        options={filterOptions}
        onChange={onFilterChange}
      />
      <Dropdown
        label="Sort"
        icon="swap_vert"
        value={sort}
        options={sortOptions}
        onChange={onSortChange}
      />
    </div>
  );
}
