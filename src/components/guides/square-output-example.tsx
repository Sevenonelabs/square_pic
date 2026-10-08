import Image from "next/image";

const EXAMPLES = [
  { kind: "portrait", title: "Portrait photo", width: 900, height: 1350, edge: 1350,
    subject: "A man in a white shirt against a gray background", fit: "Full portrait with background added on the left and right", crop: "Square crop of the portrait with the top and bottom trimmed",
    credit: "Joseph Gonzalez", link: "https://unsplash.com/photos/man-wearing-white-v-neck-shirt-iFgRcqHznqg" },
  { kind: "product", title: "Product photo", width: 900, height: 600, edge: 900,
    subject: "A coffee cup surrounded by scattered coffee granules on a dark blue table", fit: "Full coffee photo with background added above and below", crop: "Square crop of the coffee photo with the left and right trimmed",
    credit: "Robert Shunev", link: "https://unsplash.com/photos/ceramic-mug-on-table-OmOvMdiaZZ0" },
];

export function SquareOutputExample() {
  return (
    <figure className="my-6 rounded-xl border border-white/10 p-4">
      {EXAMPLES.map((example) => <div key={example.kind} className="mb-6 last:mb-0">
        <p className="font-semibold text-[#e6edf5] mb-3">{example.title}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { file: "source", label: `Original: ${example.width} × ${example.height}`, alt: example.subject, width: example.width, height: example.height },
          { file: "fit", label: `Solid fit: ${example.edge} × ${example.edge}`, alt: example.fit, width: example.edge, height: example.edge },
          { file: "crop", label: `Centered crop: ${example.edge} × ${example.edge}`, alt: example.crop, width: example.edge, height: example.edge },
        ].map(({ file, label, alt, width, height }) => (
          <div key={file}>
            <div className="aspect-square flex items-center bg-[#18212c] rounded-lg overflow-hidden">
              <Image src={`/examples/${example.kind}-${file}.webp`} alt={alt} width={width} height={height}
                sizes="(max-width: 639px) 100vw, 33vw" className="w-full h-full object-contain" />
            </div>
            <p className="text-[0.8rem] text-[#e6edf5] mt-2">{label}</p>
          </div>
        ))}
        </div>
        <p className="text-xs text-[#8d9aaa] mt-2">Photo by <a href={example.link} className="underline">{example.credit} on Unsplash</a>.</p>
      </div>)}
      <figcaption className="text-[0.8rem] text-[#8d9aaa] mt-3 leading-relaxed">
        Actual SquarePic exports with Outer Border at 0% and Zoom at 100%. Solid fit keeps the entire photo and adds background. Crop fills the square by trimming the longer sides. Compare the portrait’s hair and shirt, and the coffee scattered near the edges.
      </figcaption>
    </figure>
  );
}
