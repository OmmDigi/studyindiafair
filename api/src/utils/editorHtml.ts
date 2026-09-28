import type { EditorContent } from "./editorContent.js";

type Block = NonNullable<EditorContent>["blocks"][number];
type ListItem = string | { content?: string; items?: ListItem[]; meta?: { checked?: boolean } };

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const str = (v: unknown) => (typeof v === "string" ? v : "");

function renderList(items: ListItem[], style: string): string {
  const tag = style === "ordered" ? "ol" : "ul";
  const listStyle = style === "checklist" ? ' style="list-style:none;padding-left:0"' : "";
  const lis = items
    .map((item) => {
      if (typeof item === "string") return `<li>${item}</li>`;
      const box = style === "checklist" ? (item.meta?.checked ? "&#9745; " : "&#9744; ") : "";
      const nested = item.items?.length ? renderList(item.items, style) : "";
      return `<li>${box}${str(item.content)}${nested}</li>`;
    })
    .join("");
  return `<${tag}${listStyle}>${lis}</${tag}>`;
}

function renderBlock({ type, data }: Block) {
  switch (type) {
    case "paragraph":
      return `<p style="margin:0 0 12px">${str(data.text)}</p>`;
    case "header": {
      const level = Math.min(Math.max(Number(data.level) || 2, 1), 6);
      return `<h${level} style="margin:16px 0 8px">${str(data.text)}</h${level}>`;
    }
    case "list":
      return renderList(Array.isArray(data.items) ? (data.items as ListItem[]) : [], str(data.style));
    case "quote":
      return `<blockquote style="margin:0 0 12px;padding-left:12px;border-left:3px solid #ccc">${str(data.text)}${
        data.caption ? `<br><small>${str(data.caption)}</small>` : ""
      }</blockquote>`;
    case "code":
      return `<pre style="background:#f4f4f4;padding:10px;border-radius:4px;white-space:pre-wrap">${escapeHtml(str(data.code))}</pre>`;
    case "table": {
      const rows = Array.isArray(data.content) ? (data.content as unknown[][]) : [];
      const cell = "border:1px solid #ddd;padding:6px 8px;text-align:left";
      const html = rows
        .map((row, i) => {
          const tag = i === 0 && data.withHeadings ? "th" : "td";
          return `<tr>${row.map((c) => `<${tag} style="${cell}">${str(c)}</${tag}>`).join("")}</tr>`;
        })
        .join("");
      return `<table style="border-collapse:collapse;margin:0 0 12px">${html}</table>`;
    }
    case "delimiter":
      return `<hr style="border:none;border-top:1px solid #ddd;margin:16px 0">`;
    case "embed": {
      const source = str(data.source);
      return source ? `<p style="margin:0 0 12px"><a href="${escapeHtml(source)}">${escapeHtml(str(data.caption) || source)}</a></p>` : "";
    }
    default:
      return typeof data.text === "string" ? `<p style="margin:0 0 12px">${data.text}</p>` : "";
  }
}

export function editorToHtml(content: EditorContent) {
  return content ? content.blocks.map(renderBlock).join("\n") : "";
}
