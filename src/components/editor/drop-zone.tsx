"use client";

import { useRef, type DragEvent } from "react";
import { motion } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="w-full max-w-[520px] mx-auto py-10 px-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[rgba(255,255,255,0.04)] border-2 border-dashed border-[rgba(255,255,255,0.15)] rounded-xl transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]/8 group"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label htmlFor={UPLOAD_ID} className="flex flex-col items-center justify-center gap-3 cursor-pointer w-full h-full">
        <div className="w-14 h-14 flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/12 transition-all duration-300 rounded-full">
          <svg className="w-7 h-7 text-[var(--accent)] opacity-80 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        {!compact && (
          <>
            <h2 className="text-[1.1rem] font-bold text-[#e6edf5]">Free Online Image Resizer & Square Photo Maker</h2>
            <p className="text-[0.8rem] text-[#8d9aaa] max-w-[90%] text-center leading-relaxed">SquarePic is your free photo cropper and online image resizer. Easily resize images for social media without losing quality.</p>
          </>
        )}
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20 px-5 py-2 font-extrabold text-sm cursor-pointer transition-all duration-300 hover:bg-[var(--accent)]/20 shadow-none rounded-md"
        >
          Upload Your Image
        </motion.span>
        <span className="text-[0.7rem] text-[#576675] font-semibold tracking-wide">or drag & drop</span>
      </label>
      <input
        ref={inputRef}
        id={UPLOAD_ID}
        onChange={handleChange}
        type="file"
        hidden
        accept="image/*"
      />
    </motion.div>
  );
}
