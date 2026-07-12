"use client";

import { useRef, type DragEvent } from "react";

interface Props {
  onFile: (file: File) => void;
  compact?: boolean;
}

const UPLOAD_ID = "dz-upload";

export function DropZone({ onFile, compact }: Props) {
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
      className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer bg-[rgba(255,255,255,0.015)] border-[1.5px] border-dashed border-[rgba(255,255,255,0.06)] rounded-md transition-all duration-300 hover:border-[var(--accent)] hover:bg-[rgba(6,182,212,0.10)]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label htmlFor={UPLOAD_ID} className="flex flex-col items-center justify-center gap-3 cursor-pointer">
        <svg className="w-11 h-11 text-[var(--accent)] opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {!compact && (
          <>
            <h2 className="text-[1.2rem] font-bold text-[#e6edf5]">Free Online Image Resizer & Square Photo Maker</h2>
            <p className="text-[0.85rem] text-[#8d9aaa] max-w-[80%] text-center">SquarePic is your free photo cropper and online image resizer. Easily resize images for social media without losing quality.</p>
          </>
        )}
        <span className="bg-[var(--accent)] text-black px-5 py-2.5 rounded-md font-extrabold text-sm cursor-pointer transition-all duration-300 hover:brightness-110 shadow-[0_4px_16px_var(--accent-glow)]">
          Upload Your Image
        </span>
      </label>
      <input
        ref={inputRef}
        id={UPLOAD_ID}
        onChange={handleChange}
        type="file"
        hidden
        accept="image/*"
      />
    </div>
  );
}
