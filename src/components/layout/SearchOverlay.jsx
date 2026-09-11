"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";

const TYPE_LABELS = {
  service: "Service",
  industry: "Industry",
  solution: "Solution",
  caseStudy: "Case Study",
};

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => inputRef.current?.focus(), 150);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      requestRef.current?.abort();
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    requestRef.current?.abort();
    requestRef.current = controller;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(value)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setResults(Array.isArray(data?.results) ? data.results : []);
        }
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error("Search error:", error);
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const trimmedQuery = query.trim();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/35 px-4 backdrop-blur-xl"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-[18vh] w-[min(820px,100%)]"
          >
            <div className="mb-4 flex items-center justify-between px-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                Search Tendrils
              </p>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
              >
                ESC
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-black/10 bg-[#F7F2E8] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="flex items-center">
                <Search className="ml-6 h-6 w-6 shrink-0 text-[#111111]" strokeWidth={1.8} />

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search services, industries, solutions, case studies..."
                  autoComplete="off"
                  className="h-[76px] w-full bg-transparent px-5 text-[18px] font-medium text-[#111111] outline-none placeholder:text-[#111111]/35"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="mr-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#111111]/60 transition hover:bg-black/10 hover:text-[#111111]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {trimmedQuery && (
                <div className="border-t border-black/10 px-3 py-3">
                  <SearchResults
                    query={trimmedQuery}
                    results={results}
                    loading={loading}
                    onClose={onClose}
                  />
                </div>
              )}
            </div>

            {!trimmedQuery && (
              <div className="mt-4 flex justify-center text-[10px] uppercase tracking-[0.18em] text-white/45">
                Search across services, industries, solutions & case studies
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchResults({ query, results, loading, onClose }) {
  if (loading) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-[#C5A05A]" />
        <p className="mt-3 text-[11px] text-[#111111]/40">
          Searching for “{query}”...
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="font-display text-lg text-[#111111]">No results found</p>
        <p className="mt-1 text-xs text-[#111111]/40">
          Try a service, industry, solution, or case study name.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[min(58vh,520px)] overflow-y-auto pr-1">
      <div className="mb-2 px-4 pt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#111111]/35">
        {results.length} result{results.length === 1 ? "" : "s"}
      </div>

      <div className="space-y-1">
        {results.map((item) => (
          <Link
            key={item._id}
            href={item.href}
            onClick={onClose}
            className="group flex items-center justify-between rounded-[16px] px-4 py-3.5 transition hover:bg-white"
          >
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#111111]">
                {item.title}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#9A7625]">
                {TYPE_LABELS[item.type] || item.type}
              </p>

              {item.shortDescription && (
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#111111]/45">
                  {item.shortDescription}
                </p>
              )}
            </div>

            <ArrowUpRight className="ml-4 h-4 w-4 shrink-0 text-[#C9A227] opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
