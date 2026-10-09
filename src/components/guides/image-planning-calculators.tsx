"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { printPlan, squarePlan } from "@/lib/image-planning";

const inputStyle = "w-full min-h-11 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-base text-[#e6edf5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const linkStyle = "text-[var(--accent)] hover:underline";
const format = (value: number) => Number(value.toFixed(2)).toLocaleString("en-US");
const formatScale = (value: number) => value.toLocaleString("en-US", { maximumSignificantDigits: 4 });

function NumberField({ label, value, onChange, min, max, step = "1" }: {
  label: string; value: string; onChange: (value: string) => void; min: number; max: number; step?: string;
}) {
  const id = useId();
  return <div className="min-w-0"><label htmlFor={id} className="block text-sm font-semibold mb-2">{label}</label><input id={id} type="number" inputMode={step === "1" ? "numeric" : "decimal"} min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} className={inputStyle} /></div>;
}

export function SquareSizePlanner() {
  const [width, setWidth] = useState("1200");
  const [height, setHeight] = useState("800");
  const [edge, setEdge] = useState("1080");
  const plan = squarePlan(Number(width), Number(height), Number(edge));
  return (
    <section aria-label="Square size planner" className="my-6 rounded-xl border border-white/15 bg-white/[0.025] p-5">
      <p className="mb-4">Enter your photo dimensions to compare padding and a centered crop. Calculations use 100% Zoom and 0% Outer Border.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NumberField label="Photo width (px)" value={width} onChange={setWidth} min={1} max={100000} />
        <NumberField label="Photo height (px)" value={height} onChange={setHeight} min={1} max={100000} />
        <NumberField label="Square edge (px)" value={edge} onChange={setEdge} min={1} max={4096} />
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-5">
        {plan ? <>
          <p className="font-bold text-[#e6edf5]">Output: {format(Number(edge))} × {format(Number(edge))} px</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-white/10 p-4">
              <h3 className="font-bold text-[#e6edf5] mb-2">Keep the whole photo</h3>
              <p>Photo area: {format(plan.fitWidth)} × {format(plan.fitHeight)} px.</p>
              <p className="mt-2">Padding on each side: {format(plan.horizontalPadding)} px left/right, {format(plan.verticalPadding)} px top/bottom.</p>
              <p className="mt-2">Photo scale: {formatScale(plan.fitScale)}x. {plan.fitScale > 1 ? "This enlarges the source photo." : "No enlargement is needed."}</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <h3 className="font-bold text-[#e6edf5] mb-2">Fill with a centered crop</h3>
              <p>Retained source: {format(plan.cropEdge)} × {format(plan.cropEdge)} px.</p>
              <p className="mt-2">Remove from each source edge: {format(plan.cropLeftRight)} px left/right, {format(plan.cropTopBottom)} px top/bottom.</p>
              <p className="mt-2">Crop scale: {formatScale(plan.cropScale)}x. {plan.cropScale > 1 ? "The cropped region needs enlargement." : "No enlargement is needed."}</p>
            </div>
          </div>
          <p className="text-sm mt-4">Values are rounded to two decimals. Photo placement can use fractional pixels; the exported canvas has whole-pixel dimensions.</p>
        </> : <p>Enter whole photo dimensions from 1 to 100,000 pixels and a square edge from 1 to 4096 pixels.</p>}
      </div>
      <Link href="/" className={`inline-flex min-h-11 items-center mt-3 font-semibold ${linkStyle}`}>Open the square editor &rarr;</Link>
    </section>
  );
}

export function PrintSizePlanner() {
  const [width, setWidth] = useState("1200");
  const [height, setHeight] = useState("800");
  const [inchesWide, setInchesWide] = useState("10");
  const [inchesHigh, setInchesHigh] = useState("8");
  const [ppi, setPpi] = useState("300");
  const plan = printPlan(Number(width), Number(height), Number(inchesWide), Number(inchesHigh), Number(ppi));
  return (
    <section aria-label="Print enlargement planner" className="my-6 rounded-xl border border-white/15 bg-white/[0.025] p-5">
      <p className="mb-4">Find the pixels needed to fill a print, the source resolution after cropping, and an enlargement that fits SquarePic&apos;s limits. No photo upload is needed.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberField label="Source width (px)" value={width} onChange={setWidth} min={1} max={100000} />
        <NumberField label="Source height (px)" value={height} onChange={setHeight} min={1} max={100000} />
        <NumberField label="Print width (inches)" value={inchesWide} onChange={setInchesWide} min={0.01} max={100} step="0.01" />
        <NumberField label="Print height (inches)" value={inchesHigh} onChange={setInchesHigh} min={0.01} max={100} step="0.01" />
        <NumberField label="Target pixels per inch" value={ppi} onChange={setPpi} min={1} max={1200} />
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-5 space-y-3">
        {plan ? <>
          <p className="font-bold text-[#e6edf5]">Print target: {format(plan.targetWidth)} × {format(plan.targetHeight)} px.</p>
          <p>Source resolution when filling this print: {format(plan.sourcePpi)} PPI.</p>
          <p>{plan.needsCrop ? "The shapes differ. Fill the print by cropping, or keep the full photo with borders. This calculation assumes a filled print." : "Your source and print have the same proportions."}</p>
          {plan.status === "source-sufficient" ? <p>Your source already has enough pixels for this target. Enlargement is unnecessary.</p>
            : plan.status === "supported" ? <p>Required enlargement: {formatScale(plan.scale)}x. Use {plan.multiplier}x in SquarePic, then crop and size the result to the print target.</p>
            : <p>The full source cannot reach this target with SquarePic&apos;s available 2x, 3x or 4x settings and output limits. Try a better source, a smaller print, or a lower PPI approved by your printer. Cropping first may reduce the output pixel count.</p>}
          <p className="text-sm">The recommendation checks the full source against 40 million output pixels and 16,384 pixels per edge. Enlarged output PPI describes pixel density, not recovered detail. Pixel targets are rounded to the nearest whole pixel.</p>
        </> : <p>Enter whole source dimensions from 1 to 100,000 pixels, print edges above 0 and up to 100 inches, and a whole PPI from 1 to 1200.</p>}
      </div>
      <Link href="/upscaler" className={`inline-flex min-h-11 items-center mt-3 font-semibold ${linkStyle}`}>Open the image upscaler &rarr;</Link>
    </section>
  );
}
