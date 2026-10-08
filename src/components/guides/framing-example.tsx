import { SquareOutputExample } from "./square-output-example";

export function FramingExample({ vertical = false }: { vertical?: boolean }) {
  if (!vertical) return <SquareOutputExample />;
  return <figure className="my-6 border border-white/10 rounded-lg p-4">
    <svg viewBox={vertical ? "0 0 480 350" : "0 0 600 220"} role="img" aria-label={vertical ? "A vertical canvas with central artwork, sample interface overlays and a shorter cover preview" : "The same landscape scene fitted into a square with padding and cropped to a square"} className="w-full h-auto">
      {vertical ? <>
        <rect x="35" y="10" width="180" height="320" fill="#183746" stroke="#8d9aaa" />
        <image href="/examples/portrait-source.webp" x="35" y="10" width="180" height="320" preserveAspectRatio="xMidYMid slice" />
        <rect x="35" y="10" width="180" height="38" fill="#7f3d3d" />
        <rect x="35" y="275" width="180" height="55" fill="#7f3d3d" />
        <rect x="188" y="100" width="27" height="150" fill="#7f3d3d" />
        <rect x="65" y="115" width="110" height="100" fill="none" stroke="#bef264" strokeDasharray="5 4" />
        <text x="75" y="170" fill="white" fontSize="15">Main message</text>
        <rect x="265" y="80" width="180" height="180" fill="#183746" stroke="#8d9aaa" />
        <image href="/examples/portrait-source.webp" x="265" y="80" width="180" height="180" preserveAspectRatio="xMidYMid slice" />
        <text x="282" y="173" fill="white" fontSize="15">Main message</text>
        <text x="40" y="348" fill="#8d9aaa" fontSize="13">1080 x 1920 artwork</text>
        <text x="270" y="285" fill="#8d9aaa" fontSize="13">Example shorter preview</text>
      </> : <>
        <rect x="10" y="10" width="180" height="180" fill="#304354" />
        <rect x="10" y="40" width="180" height="120" fill="#408c91" />
        <circle cx="25" cy="100" r="10" fill="#f9d86a" /><circle cx="175" cy="100" r="10" fill="#f9d86a" />
        <path d="M60 140L100 65L140 140Z" fill="#c9e7c8" />
        <rect x="240" y="10" width="180" height="180" fill="#408c91" />
        <path d="M270 170L330 57L390 170Z" fill="#c9e7c8" />
        <text x="12" y="214" fill="#8d9aaa" fontSize="13">Fit: both edge markers retained</text>
        <text x="242" y="214" fill="#8d9aaa" fontSize="13">Crop: edge markers removed</text>
      </>}
    </svg>
    <figcaption className="text-sm text-[#8d9aaa] mt-2">Illustrative composition with a real portrait. Red areas show possible controls, not official pixel margins. The shorter preview is an example crop, not a fixed Instagram specification. Check the current placement preview. Photo by <a className="underline" href="https://unsplash.com/photos/man-wearing-white-v-neck-shirt-iFgRcqHznqg">Joseph Gonzalez on Unsplash</a>.</figcaption>
  </figure>;
}
