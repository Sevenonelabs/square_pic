import { GUIDES } from "@/data/guides";

const SITE_URL = process.env.SITE_URL || "https://www.squarepic.io";

export function GET(): Response {
  const items = GUIDES.map(
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
    <title>SquarePic Guides &amp; Tutorials</title>
    <description>Step-by-step image editing guides, social media size cheat sheets, and how-to tutorials for resizing, cropping, converting, and optimizing images.</description>
    <link>${SITE_URL}/guides</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/images/logo-icon.svg</url>
      <title>SquarePic Guides &amp; Tutorials</title>
      <link>${SITE_URL}/guides</link>
    </image>
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
