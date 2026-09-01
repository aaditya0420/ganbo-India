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
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
          open
            ? "border-blue-600 bg-blue-50 text-blue-700"
            : "border-slate-300 bg-white hover:border-slate-400"
        }`}
      >
        {icon && <Icon className="text-[18px]">{icon}</Icon>}
        <span>
          {label}: {activeOption.label}
        </span>
        <Icon className="text-[18px]">{open ? "expand_less" : "expand_more"}</Icon>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
        >
          {options.map((option) => (
            <li key={option.id} role="option" aria-selected={value === option.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                  value === option.id
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-700"
                }`}
              >
                {option.label}
                {value === option.id && (
                  <Icon className="text-[18px]">check</Icon>
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
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <Dropdown
        label="Filter"
        icon="filter_list"
        value={filter}
        options={filterOptions}
        onChange={onFilterChange}
      />
      <Dropdown
        label="Sort by"
        icon={null}
        value={sort}
        options={sortOptions}
        onChange={onSortChange}
      />
    </div>
  );
}
