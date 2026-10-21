"use client";

import { useRef, useId, type DragEvent } from "react";

interface Props {
  onFile: (file: File) => void;
  compact?: boolean;
}

export function DropZone({ onFile, compact }: Props) {
  const uploadId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) onFile(file);
  };

  const handleChange = () => {
    const file = inputRef.current?.files?.[0];
    if (file) onFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={`w-full max-w-[520px] mx-auto ${compact ? "py-4" : "py-10"} px-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[rgba(255,255,255,0.04)] border-2 border-dashed border-[rgba(255,255,255,0.15)] rounded-xl transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]/8 group`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-3 cursor-pointer w-full h-full">
        {!compact && (
          <>
            <p className="text-[1.1rem] font-bold text-[#e6edf5]">Free Online Image Resizer & Square Image Maker</p>
            <p className="text-[0.875rem] text-[#8d9aaa] max-w-[90%] text-center leading-relaxed">SquarePic is your free image cropper and online image resizer. Easily resize images for social media without losing quality.</p>
          </>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center min-h-11 gap-2 bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20 px-5 py-2 font-extrabold text-sm cursor-pointer transition-all duration-300 hover:bg-[var(--accent)]/20 shadow-none rounded-md"
        >
          <svg aria-hidden="true" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Your Image
        </button>
        <span className="text-[0.875rem] text-[#8d9aaa] font-semibold tracking-wide">or drag & drop</span>
      </div>
      <input
        ref={inputRef}
        id={uploadId}
        aria-label="Upload your image"
        onChange={handleChange}
        type="file"
        hidden
        accept="image/*"
      />
    </div>
  );
}
