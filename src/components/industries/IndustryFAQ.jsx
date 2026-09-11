"use client";

import { useState } from "react";

export default function IndustryFAQ({ items = [] }) {
  const [open, setOpen] = useState(null);

  if (!items.length) return null;

  return (
    <section className="bg-ivory px-6 py-24 md:py-32">

      <div className="mx-auto max-w-4xl">

        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">
            FAQ
          </p>

          <h2 className="mt-5 font-display text-4xl text-ink md:text-6xl">
            Questions worth answering.
          </h2>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">

          {items.map((item, index) => {
            const isOpen = open === index;

            return (
              <div key={item._key || index}>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="
                    flex w-full
                    items-center
                    justify-between
                    gap-8
                    py-7
                    text-left
                  "
                >

                  <span className="font-display text-xl text-ink md:text-2xl">
                    {item.question}
                  </span>

                  <span
                    className={`
                      shrink-0
                      text-2xl
                      text-gold-deep
                      transition-transform
                      duration-300
                      ${isOpen ? "rotate-45" : ""}
                    `}
                  >
                    +
                  </span>

                </button>

                <div
                  className={`
                    grid transition-all duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr] pb-7"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">

                    <p className="max-w-3xl text-sm leading-7 text-ink/55">
                      {item.answer}
                    </p>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}