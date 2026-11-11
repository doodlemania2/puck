/** Fallback component. Should not contain any tiptap imports (except for types) */

import getClassNameFactory from "../../../lib/get-class-name-factory";
import styles from "../styles.module.css";

const getClassName = getClassNameFactory("RichTextEditor", styles);

/**
 * Doodle patch: the fallback renders on the server and before the editor chunk loads, with no
 * Tiptap schema to sanitize against. It used to inject the raw string with dangerouslySetInnerHTML,
 * so stored `<script>`, `javascript:` links and `onerror` handlers reached the output.
 * It now shows plain text only. React escapes the text, so no markup can pass through.
 */
export function htmlToPlainParagraphs(content: unknown): string[] {
  if (typeof content !== "string" || !content) return [];

  // Block ends become line breaks, then every tag is removed. Loop until stable so that
  // nested forms such as "<scr<script>ipt>" cannot rebuild a tag.
  let text = content.replace(
    /<\/(p|div|h[1-6]|li|blockquote)>|<br\s*\/?>/gi,
    "\n"
  );
  let previous: string;
  do {
    previous = text;
    text = text.replace(/<[^>]*>?/g, "");
  } while (text !== previous);

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function RichTextRenderFallback({ content }: { content: string }) {
  return (
    <div className={getClassName()}>
      <div className="rich-text">
        {htmlToPlainParagraphs(content).map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
