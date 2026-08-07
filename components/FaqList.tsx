"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faqs";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "./Icons";

export function FaqList({ items = FAQS }: { items?: typeof FAQS }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="max-w-3xl mx-auto">
      {items.map((faq, i) => (
        <div key={i} className={cn("faq-item", open === i && "active")}>
          <button
            className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left text-lg font-semibold text-foreground"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            {faq.question}
            <IconChevronDown size={16} className={cn("text-primary transition-transform", open === i && "rotate-180")} />
          </button>
          <div className="faq-answer">
            <p className="px-6 sm:px-8 pb-6 opacity-85 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
