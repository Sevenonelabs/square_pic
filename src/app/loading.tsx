export default function Loading() {
  return (
    <div className="max-w-[680px] w-full mx-auto px-5 py-20 text-center">
      <div className="w-8 h-8 mx-auto border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      <p className="text-[0.85rem] text-[#8d9aaa] mt-4 font-semibold">Loading...</p>
    </div>
  );
}
