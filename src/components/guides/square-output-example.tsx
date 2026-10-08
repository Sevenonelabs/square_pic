import Image from "next/image";

const EXAMPLES = [
  { kind: "portrait", asset: "portrait", title: "Portrait photo", width: 900, height: 1350, edge: 1350,
    subject: "A man in a white shirt against a gray background", fit: "Full portrait with background added on the left and right", crop: "Square crop of the portrait with the top and bottom trimmed",
    credit: "Joseph Gonzalez", link: "https://unsplash.com/photos/man-wearing-white-v-neck-shirt-iFgRcqHznqg" },
  { kind: "product", asset: "product-sneaker", title: "Product photo", width: 900, height: 600, edge: 900,
    subject: "A red Nike sneaker photographed against a red background", fit: "Full sneaker photo with a light background added above and below", crop: "Centered square crop of the sneaker photo with the left and right background trimmed",
    credit: "Ryan Waring", link: "https://unsplash.com/photos/unpaired-red-nike-sneaker-164_6wVEHfI" },
];

export function SquareOutputExample({ compact = false, kind }: { compact?: boolean; kind?: "portrait" | "product" }) {
  return (
    <figure className="my-6 rounded-xl border border-white/10 p-4">
      {EXAMPLES.filter((example) => !kind || example.kind === kind).map((example) => <div key={example.kind} className="mb-6 last:mb-0">
        <p className="font-semibold text-[#e6edf5] mb-3">{example.title}</p>
        <div className={compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 sm:grid-cols-3 gap-4"}>
        {[
          { file: "source", label: `Original: ${example.width} × ${example.height}`, alt: example.subject, width: example.width, height: example.height },
          { file: "fit", label: `Solid fit: ${example.edge} × ${example.edge}`, alt: example.fit, width: example.edge, height: example.edge },
          { file: "crop", label: `Centered crop: ${example.edge} × ${example.edge}`, alt: example.crop, width: example.edge, height: example.edge },
        ].filter(({ file }) => !compact || file !== "source").map(({ file, label, alt, width, height }) => (
          <div key={file}>
            <div className="aspect-square flex items-center bg-[#18212c] rounded-lg overflow-hidden">
              <Image src={`/examples/${example.asset}-${file}.webp`} alt={alt} width={width} height={height}
                sizes={compact ? "(max-width: 767px) 45vw, 400px" : "(max-width: 639px) 100vw, 33vw"} className="w-full h-full object-contain" />
            </div>
            <p className="text-[0.875rem] text-[#e6edf5] mt-2">{label}</p>
          </div>
        ))}
        </div>
        <p className="text-sm text-[#8d9aaa] mt-2">Photo by <a href={example.link} className="underline">{example.credit} on Unsplash</a>.</p>
      </div>)}
      <figcaption className="text-[0.875rem] text-[#8d9aaa] mt-3 leading-relaxed">
        Actual SquarePic exports with Outer Border at 0% and Zoom at 100%. Solid fit keeps the entire photo and adds background. Crop fills the square by trimming the longer sides. {kind === "portrait" ? "Compare the hair and shirt near the edges. Centered crop does not follow an off-center subject." : kind === "product" ? "Compare the space around the sneaker. Fitting keeps the full scene; cropping enlarges the shoe and removes background from the sides." : "Compare the portrait's hair and shirt, and the space around the sneaker."}
      </figcaption>
    </figure>
  );
}
