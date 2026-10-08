import Image from "next/image";

export function UpscaleOutputExample() {
  return (
    <figure className="my-6 rounded-xl border border-white/10 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { file: "square-source", label: "Original", width: 600, height: 400 },
          { file: "upscale-2x", label: "2x PNG", width: 1200, height: 800 },
          { file: "upscale-4x", label: "4x PNG", width: 2400, height: 1600 },
        ].map(({ file, label, width, height }) => (
          <div key={file}>
            <div className="aspect-[3/2] overflow-hidden rounded-lg bg-[#18212c]"
              style={{ backgroundImage: "conic-gradient(#304354 25%, #18212c 0 50%, #304354 0 75%, #18212c 0)", backgroundSize: "20px 20px" }}>
              <Image src={`/examples/${file}.png`} alt={`${label} of test artwork with red and blue edges, a green center and transparent areas`}
                width={width} height={height} sizes="(max-width: 639px) 100vw, 33vw" className="w-full h-full object-contain" />
            </div>
            <p className="text-sm text-[#e6edf5] mt-2">{label}: {width} × {height}</p>
            <a href={`/examples/${file}.png`} download className="text-sm text-[var(--accent)] hover:underline">Download {label.toLowerCase()} example</a>
          </div>
        ))}
      </div>
      <figcaption className="text-sm text-[#8d9aaa] mt-4">
        Actual SquarePic PNG downloads from the same transparent test artwork, with Smart Sharpen enabled.
        Both enlargements retain transparent areas; the checkerboard belongs to this preview.
        The images appear at the same display size here. Open the downloads at 100% to inspect edge smoothing.
        More output pixels do not restore missing source detail. Browser results can vary.
      </figcaption>
    </figure>
  );
}
