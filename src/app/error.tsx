"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-[680px] w-full mx-auto px-5 py-20 text-center">
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)]">
        <svg aria-hidden="true" className="w-6 h-6 text-[#f43f5e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h1 className="text-[1.5rem] font-extrabold tracking-tight mb-2">Something went wrong</h1>
      <p className="text-[0.9rem] text-[#8d9aaa] max-w-[400px] mx-auto mb-6 leading-relaxed">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-[var(--accent)] text-black border-none px-5 py-2 rounded-lg font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 active:brightness-125 shadow-[0_4px_16px_var(--accent-glow)]"
      >
        Try Again
      </button>
    </div>
  );
}
