import { guidesForCategory } from "@/data/guides";

const SITE_URL = process.env.SITE_URL || "https://www.squarepic.io";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const filtered = guidesForCategory(category);

  const items = filtered.map(
    (g) => `    <item>
      <title><![CDATA[${g.title}]]></title>
      <description><![CDATA[${g.description}]]></description>
      <link>${SITE_URL}${g.path}</link>
      <guid isPermaLink="true">${SITE_URL}${g.path}</guid>
      <pubDate>${new Date(g.date).toUTCString()}</pubDate>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SquarePic Guides: ${categoryLabel}</title>
    <description>${categoryLabel} image editing guides and tutorials from SquarePic.</description>
    <link>${SITE_URL}/guides?category=${category}</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/guides/${category}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
