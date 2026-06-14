/** Renders a JSON-LD <script> for structured data (SEO).
 *  Escapes "<" so live review text containing "</script>" can't break out
 *  of the script tag (XSS-safe). */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
