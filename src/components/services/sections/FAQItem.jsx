"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="font-display text-xl">
          {item.question}
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#C9A227] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="overflow-hidden"
        >
          <p className="max-w-3xl pt-4 text-sm leading-7 text-[#111111]/60">
            {item.answer}
          </p>
        </motion.div>
      )}
    </div>
  );
}