import React from "react";
import { tokenizeInline } from "@/lib/utils";

// Renders **text** as <strong> (text-foreground) and __text__ as <span class="text-primary font-semibold">.
// Used everywhere admin-controlled text is rendered, so that double-asterisk bolds work
// the same on the live course detail page, the about page, the home page, etc.
export function InlineText({ text, className = "", keyPrefix = "" }: { text?: string | null; className?: string; keyPrefix?: string }) {
  const tokens = tokenizeInline(text ?? "");
  if (tokens.length === 0) return null;
  return (
    <span className={className}>
      {tokens.map((t, i) => {
        const k = `${keyPrefix}-${i}`;
        if (t.bold) return <strong key={k} className="text-foreground font-bold">{t.text}</strong>;
        if (t.accent) return <span key={k} className="text-primary font-semibold">{t.text}</span>;
        return <React.Fragment key={k}>{t.text}</React.Fragment>;
      })}
    </span>
  );
}
