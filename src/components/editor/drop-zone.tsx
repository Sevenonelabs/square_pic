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
      className="w-full max-w-[250px] mx-auto aspect-[5/4] flex flex-col items-center justify-center gap-2 cursor-pointer bg-[rgba(255,255,255,0.015)] border-[1.5px] border-dashed border-[rgba(255,255,255,0.08)] rounded-lg transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 group"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label htmlFor={UPLOAD_ID} className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full h-full">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/8 transition-all duration-300">
          <svg className="w-4 h-4 text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        {!compact && (
          <>
            <h2 className="text-[0.95rem] font-bold text-[#e6edf5]">Free Online Image Resizer & Square Photo Maker</h2>
            <p className="text-[0.7rem] text-[#8d9aaa] max-w-[90%] text-center leading-relaxed">SquarePic is your free photo cropper and online image resizer. Easily resize images for social media without losing quality.</p>
          </>
        )}
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[var(--accent)] text-white px-6 py-2.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all duration-300 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
        >
          Upload Your Image
        </motion.span>
        <span className="text-[0.6rem] text-[#576675] font-semibold tracking-wide">or drag & drop</span>
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
