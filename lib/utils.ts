export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function waLink(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function formatINR(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Tokenizes text into inline-formatted segments: **word** -> {bold:true,text}, __word__ -> {accent:true,text}, plain -> {text}.
// Returning a plain array (not JSX) lets this helper live in a .ts file and be used from .tsx files.
export type InlineToken = { text: string; bold?: boolean; accent?: boolean };
export function tokenizeInline(text: string): InlineToken[] {
  if (!text) return [];
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  const out: InlineToken[] = [];
  for (const p of parts) {
    if (!p) continue;
    if (p.startsWith("**") && p.endsWith("**")) {
      out.push({ text: p.slice(2, -2), bold: true });
    } else if (p.startsWith("__") && p.endsWith("__")) {
      out.push({ text: p.slice(2, -2), accent: true });
    } else {
      out.push({ text: p });
    }
  }
  return out;
}

export function stripPerClass(text?: string | null) {
  if (!text) return "";
  return text
    .replace(/\s*\/\s*class\b/gi, "")
    .replace(/\s*\bper\s+class\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function stripRecordingRefs(text?: string | null) {
  if (!text) return "";
  let out = text;
  // Remove any segment separated by " · " that mentions record/recorded
  const parts = out.split(/\s·\s/);
  out = parts.filter((p) => !/record/i.test(p)).join(" · ");
  // Remove parentheticals that mention recording (e.g. "(Includes 6 months of recording validity)")
  out = out.replace(/\s*\([^)]*record[^)]*\)/gi, "");
  // Remove trailing clauses like "Includes 6 months of recording validity" or "Class Recording Access For 12 Months"
  out = out.replace(/\s*[|·–—\-]\s*(?:class\s+)?recording\s+access[^|·–—\-]*/gi, "");
  out = out.replace(/\bincludes\s+\d+\s+months?\s+of\s+recording\s+validity\b/gi, "");
  out = out.replace(/\bclass\s+recording\s+access\s+for\s+\d+\s+months?\b/gi, "");
  out = out.replace(/\s*\|\s*$/, "").replace(/\s{2,}/g, " ").trim();
  return out;
}

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "blockquote", "a", "img", "span", "div", "hr",
  "table", "thead", "tbody", "tr", "td", "th", "pre", "code",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title"]),
};

const SAFE_URL = /^(https?:|mailto:|tel:|^\/|#|data:image\/)/i;

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  let out = html.replace(/<!--[\s\S]*?-->/g, "");
  // Remove entire dangerous elements (tag + content) before tokenizing.
  for (const tag of ["script", "style", "iframe", "object", "embed", "textarea", "form", "link", "meta"]) {
    const re = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    out = out.replace(re, "");
    out = out.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, "gi"), "");
  }
  const tagRe = /<(\/?)([a-zA-Z0-9]+)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  let result = "";
  let last = 0;
  let m: RegExpExecArray | null;
  const stack: string[] = [];
  while ((m = tagRe.exec(out))) {
    result += out.slice(last, m.index);
    last = tagRe.lastIndex;
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    const attrsRaw = m[3];
    const selfClose = m[4] === "/";
    if (!ALLOWED_TAGS.has(tag)) continue;
    if (closing) {
      result += `</${tag}>`;
      const idx = stack.lastIndexOf(tag);
      if (idx !== -1) stack.splice(idx, 1);
      continue;
    }
    const allowed = ALLOWED_ATTRS[tag] ?? new Set<string>();
    let attrStr = "";
    const attrRe = /([a-zA-Z0-9_-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let am: RegExpExecArray | null;
    while ((am = attrRe.exec(attrsRaw))) {
      const name = am[1].toLowerCase();
      const val = am[3] ?? am[4] ?? am[5] ?? "";
      if (name.startsWith("on")) continue;
      if (name === "style") continue;
      if (!allowed.has(name)) continue;
      if ((name === "href" || name === "src") && !SAFE_URL.test(val.trim())) continue;
      attrStr += ` ${name}="${val.replace(/"/g, "&quot;")}"`;
    }
    result += `<${tag}${attrStr}${selfClose ? " /" : ""}>`;
    if (!selfClose && tag !== "br" && tag !== "hr" && tag !== "img") stack.push(tag);
  }
  result += out.slice(last);
  while (stack.length) result += `</${stack.pop()!}>`;
  return result;
}
