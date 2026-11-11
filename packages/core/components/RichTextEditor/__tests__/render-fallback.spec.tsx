import { renderToStaticMarkup } from "react-dom/server.node";
import { RichTextRenderFallback } from "../components/RenderFallback";

const render = (content: string) =>
  renderToStaticMarkup(<RichTextRenderFallback content={content} />);

describe("RichTextRenderFallback", () => {
  it("shows the text of a paragraph", () => {
    expect(render("<p>Welcome home</p>")).toContain("<p>Welcome home</p>");
  });

  it("keeps separate paragraphs", () => {
    const out = render("<p>One</p><p>Two</p>");
    expect(out).toContain("<p>One</p>");
    expect(out).toContain("<p>Two</p>");
  });

  it.each([
    ["script tag", "<p>hi</p><script>alert(1)</script>"],
    ["javascript link", '<a href="javascript:alert(1)">x</a>'],
    ["onerror image", '<img src=x onerror="alert(1)">'],
    ["split tag", "<scr<script>ipt>alert(1)</scr</script>ipt>"],
  ])("never outputs markup for a %s", (_name, html) => {
    const out = render(html);
    expect(out).not.toMatch(/<script/i);
    expect(out).not.toMatch(/javascript:/i);
    expect(out).not.toMatch(/onerror/i);
    expect(out).not.toMatch(/<img/i);
    expect(out).not.toMatch(/<a /i);
  });

  it("handles empty and non-string content", () => {
    expect(render("")).not.toContain("<p>");
    expect(
      renderToStaticMarkup(
        <RichTextRenderFallback content={undefined as any} />
      )
    ).not.toContain("<p>");
  });
});
