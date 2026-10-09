import Link from "next/link";

export function GuideEditions({ slug, year }: { slug: string; year: 2026 | 2027 }) {
  return <aside aria-label="Guide editions" className="my-6 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/5 p-4 text-base leading-relaxed text-[#abb8c7]">
    <nav aria-label="Choose guide year" className="flex flex-wrap items-center gap-4 mb-2">
      <span className="font-semibold text-[#e6edf5]">Guide editions</span>
      {([2027, 2026] as const).map((edition) => <Link key={edition} href={`/guides/${slug}-${edition}`} aria-current={year === edition ? "page" : undefined} className="inline-flex min-h-11 items-center font-semibold text-[var(--accent)] hover:underline">{edition}{edition === 2027 ? " planning guide" : " guide"}</Link>)}
    </nav>
    {year === 2027 ? <p>This 2027 planning edition uses documentation available on October 9, 2026. Platforms may change their specifications before or during 2027. Check the linked sources and upload preview before publishing.</p> : <p>Using this guide to plan next year&apos;s content? The 2027 edition is also available. The 2026 edition remains here for reference.</p>}
  </aside>;
}
