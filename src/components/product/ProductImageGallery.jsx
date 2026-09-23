import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { optimizeImage } from "../../data/products";

/** Thumbnails shown under the hero before the "+N more" slot. */
export const VISIBLE_THUMB_COUNT = 5;

const IMAGE_WIDTH = {
  hero: 1000,
  modal: 1200,
  strip: 200,
  modalThumb: 240,
};

/**
 * Split a gallery into the inline strip + overflow count for "+N more".
 * Pure helper — easy to unit-test and reuse.
 */
export function getGalleryStrip(gallery, maxVisible = VISIBLE_THUMB_COUNT) {
  const total = gallery?.length ?? 0;
  if (total <= maxVisible) {
    return {
      visible: gallery ?? [],
      moreCount: 0,
      columnCount: Math.max(total, 1),
      hasMore: false,
    };
  }

  const visible = gallery.slice(0, maxVisible - 1);
  return {
    visible,
    moreCount: total - visible.length,
    columnCount: maxVisible,
    hasMore: true,
  };
}

function clampIndex(index, length) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function prefetchImage(url, width) {
  if (!url || typeof Image === "undefined") return;
  const img = new Image();
  img.src = optimizeImage(url, width);
}

function Icon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{children}</span>
  );
}

function GalleryModal({
  open,
  title,
  gallery,
  activeIndex,
  onSelectIndex,
  onClose,
}) {
  const titleId = useId();
  const closeRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const activeImage = gallery[activeIndex] ?? gallery[0];

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onSelectIndex(clampIndex(activeIndexRef.current + 1, gallery.length));
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onSelectIndex(clampIndex(activeIndexRef.current - 1, gallery.length));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, onSelectIndex, gallery.length]);

  // Warm nearby full-size assets so scrubbing the grid stays snappy.
  useEffect(() => {
    if (!open || gallery.length < 2) return;
    prefetchImage(gallery[clampIndex(activeIndex + 1, gallery.length)], IMAGE_WIDTH.modal);
    prefetchImage(gallery[clampIndex(activeIndex - 1, gallery.length)], IMAGE_WIDTH.modal);
  }, [open, activeIndex, gallery]);

  if (!open || !activeImage) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="flex max-h-[min(90dvh,880px)] w-full max-w-5xl min-h-0 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5 md:px-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="border-b-2 border-[#0853ce] pb-2 text-sm font-semibold uppercase tracking-wide text-[#141b2b]">
              Images
            </span>
            <span className="pb-2 text-sm text-slate-400">
              {gallery.length} photos
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close image gallery"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-black"
          >
            <Icon>close</Icon>
          </button>
        </div>

        {/*
          < xl: stacked (phone + tablet portrait) — scrollable, no row stretch.
          xl+: side-by-side preview | thumbs, thumbs pack to top (content-start).
        */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-5 xl:grid xl:grid-cols-[minmax(0,1.35fr)_minmax(240px,1fr)] xl:gap-5 xl:overflow-hidden xl:p-6">
          <div className="mb-3 flex w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#f7f8fc] aspect-square max-h-[min(40dvh,360px)] sm:mb-4 sm:max-h-[min(44dvh,440px)] md:max-h-[min(46dvh,520px)] xl:mb-0 xl:aspect-auto xl:h-full xl:max-h-none xl:min-h-0">
            <img
              key={activeImage}
              src={optimizeImage(activeImage, IMAGE_WIDTH.modal)}
              alt={`${title} — image ${activeIndex + 1} of ${gallery.length}`}
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex min-h-0 flex-col xl:overflow-hidden">
            <h3
              id={titleId}
              className="mb-3 line-clamp-2 shrink-0 text-sm font-semibold leading-snug text-[#141b2b] sm:mb-3 sm:text-base md:text-lg"
            >
              {title}
            </h3>
            {/* Outer scroll shell can grow; inner grid must NOT stretch rows (content-start). */}
            <div className="min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
              <div className="grid grid-cols-3 content-start gap-2 sm:grid-cols-4 sm:gap-2.5">
                {gallery.map((image, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      type="button"
                      key={`${index}-${image}`}
                      aria-label={`Show image ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => onSelectIndex(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 bg-white transition ${
                        isActive
                          ? "border-[#0853ce]"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={optimizeImage(image, IMAGE_WIDTH.modalThumb)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Product hero + thumbnail strip + optional "+N more" images modal.
 * Owns its own selection index so the parent page stays lean.
 */
export default function ProductImageGallery({
  title,
  gallery,
  badge,
  /** Stable id (e.g. product slug) — resets selection when the product changes. */
  productId,
  maxVisibleThumbs = VISIBLE_THUMB_COUNT,
}) {
  // Content-keyed so parent re-renders that rebuild the gallery array don't reset UI.
  const galleryKey = Array.isArray(gallery) ? gallery.filter(Boolean).join("\0") : "";
  const images = useMemo(
    () => (galleryKey ? galleryKey.split("\0") : []),
    [galleryKey],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setModalOpen(false);
  }, [productId, galleryKey]);

  const activeImage = images[activeIndex] ?? images[0];
  const strip = useMemo(
    () => getGalleryStrip(images, maxVisibleThumbs),
    [images, maxVisibleThumbs],
  );

  const imageCount = images.length;

  const selectIndex = useCallback((index) => {
    setActiveIndex(clampIndex(index, imageCount));
  }, [imageCount]);

  const step = useCallback(
    (direction) => {
      if (imageCount < 2) return;
      setActiveIndex((current) => clampIndex(current + direction, imageCount));
    },
    [imageCount],
  );

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // Prefetch next/prev hero sizes while browsing the strip.
  useEffect(() => {
    if (imageCount < 2) return;
    prefetchImage(images[clampIndex(activeIndex + 1, imageCount)], IMAGE_WIDTH.hero);
    prefetchImage(images[clampIndex(activeIndex - 1, imageCount)], IMAGE_WIDTH.hero);
  }, [activeIndex, images, imageCount]);

  if (!activeImage) return null;

  return (
    <div className="relative w-full min-w-0 max-w-[480px] justify-self-center lg:max-w-[460px] lg:justify-self-start xl:max-w-[480px]">
      <div className="product-detail-media product-gradient group relative overflow-hidden rounded-xl border border-slate-300/40">
        <img
          key={activeImage}
          src={optimizeImage(activeImage, IMAGE_WIDTH.hero)}
          alt={title}
          decoding="async"
          fetchPriority="high"
          className="product-image-change h-full w-full object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous product image"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-300/80 bg-white/85 text-[#0f2f80] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#0f2f80] hover:bg-[#0f2f80] hover:text-white sm:left-4 sm:h-11 sm:w-11 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
            >
              <Icon>chevron_left</Icon>
            </button>
            <button
              type="button"
              aria-label="Next product image"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-300/80 bg-white/85 text-[#0f2f80] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#0f2f80] hover:bg-[#0f2f80] hover:text-white sm:right-4 sm:h-11 sm:w-11 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
            >
              <Icon>chevron_right</Icon>
            </button>
          </>
        )}
        {badge ? (
          <span className="absolute left-3 top-3 rounded-sm bg-blue-600 px-2.5 py-1.5 text-[10px] font-bold tracking-widest text-white sm:left-6 sm:top-6 sm:px-3 sm:py-2">
            {badge}
          </span>
        ) : null}
      </div>

      {images.length > 0 && (
        <div className="relative mt-3 min-w-0 w-full sm:mt-4">
          <div
            className="grid w-full min-w-0 gap-1.5 sm:gap-2"
            style={{
              gridTemplateColumns: `repeat(${strip.columnCount}, minmax(0, 1fr))`,
            }}
          >
            {strip.visible.map((image, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  type="button"
                  key={`${index}-${image}`}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => selectIndex(index)}
                  className={`aspect-square w-full min-w-0 overflow-hidden rounded border-2 transition duration-300 ${
                    isActive ? "border-black" : "border-slate-300"
                  }`}
                >
                  <img
                    src={optimizeImage(image, IMAGE_WIDTH.strip)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
            {strip.hasMore && (
              <button
                type="button"
                onClick={openModal}
                aria-label={`View ${strip.moreCount} more images`}
                className="aspect-square w-full min-w-0 overflow-hidden rounded border-2 border-slate-300 bg-slate-100 transition duration-300 hover:border-black hover:bg-slate-200"
              >
                <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 text-[#141b2b]">
                  <span className="text-sm font-bold leading-none sm:text-base">
                    {strip.moreCount}+
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-wide text-slate-500 sm:text-[10px]">
                    more
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      <GalleryModal
        open={modalOpen}
        title={title}
        gallery={images}
        activeIndex={activeIndex}
        onSelectIndex={selectIndex}
        onClose={closeModal}
      />
    </div>
  );
}
