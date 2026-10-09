import reference from "@/data/social-image-reference.json";

export function PlatformReference({ platform }: { platform: (typeof reference.platforms)[number] }) {
  return <>
    <div className="overflow-x-auto my-4"><table className="w-full text-sm text-left border-collapse">
      <caption className="text-left text-[#abb8c7] mb-3">Dimensions in pixels, width x height. Recommendations and working canvases are labeled separately.</caption>
      <thead><tr className="border-b border-white/15">{['Placement', 'Dimensions', 'Ratio', 'Basis'].map((label) => <th key={label} scope="col" className="py-3 pr-4 text-[#e6edf5]">{label}</th>)}</tr></thead>
      <tbody>{platform.rows.map((row) => <tr key={row.placement} className="border-b border-white/10">
        <th scope="row" className="py-3 pr-4 font-medium text-[#e6edf5]">{row.placement}</th>
        <td className="py-3 pr-4 whitespace-nowrap text-[#abb8c7]">{row.size}</td>
        <td className="py-3 pr-4 text-[#abb8c7]">{row.ratio}</td>
        <td className="py-3 pr-4 text-[#abb8c7]">{row.basis}</td>
      </tr>)}</tbody>
    </table></div>
    <p className="text-base leading-relaxed text-[#abb8c7] mb-3">{platform.note}</p>
    <ul className="text-sm space-y-2 mb-4">{platform.sources.map((source) => <li key={source.url}>
      <a href={source.url} className="text-[var(--accent)] underline break-words">{source.label}</a>
      <span className="text-[#abb8c7]"> · {source.status} October 9, 2026</span>
    </li>)}</ul>
  </>;
}
