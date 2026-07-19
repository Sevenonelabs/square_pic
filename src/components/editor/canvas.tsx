"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { renderToCanvas, type EditorState } from "@/lib/editor-renderer";
import { DropZone } from "./drop-zone";

interface Props {
  state: EditorState;
  onStateChange: (update: Partial<EditorState>) => void;
}

const MAX_SIZE_MB = 20;

export function EditorCanvas({ state, onStateChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasImage = state.image !== null;
  const renderScheduled = useRef(false);
  const [loading, setLoading] = useState(false);

  const scheduleRender = useCallback(() => {
    if (!renderScheduled.current) {
      renderScheduled.current = true;
      requestAnimationFrame(() => {
        renderScheduled.current = false;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx && canvas) {
          try {
            renderToCanvas(ctx, canvas, state);
          } catch (e) {
            console.error("Canvas render error:", e);
          }
        }
      });
    }
  }, [state]);

  useEffect(() => {
    if (hasImage) scheduleRender();
  }, [hasImage, scheduleRender, state]);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Invalid file type. Please upload an image.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`File is too large. Please upload an image under ${MAX_SIZE_MB} MB.`);
        return;
      }
      setLoading(true);
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setLoading(false);
        onStateChange({ image: img });
      };
      img.onerror = () => {
        setLoading(false);
        URL.revokeObjectURL(url);
        alert("Could not load the image. The file may be corrupted.");
      };
      img.src = url;
    },
    [onStateChange]
  );

  const handleReset = useCallback(() => {
    if (state.image) {
      URL.revokeObjectURL(state.image.src);
    }
    onStateChange({ image: null });
  }, [state.image, onStateChange]);

  return (
    <div className="flex-1 flex items-center justify-center p-2.5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-md border border-[rgba(255,255,255,0.10)] relative overflow-hidden max-h-full min-w-0">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(3,4,6,0.85)]">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <span className="text-[0.75rem] text-[#8d9aaa] font-semibold">Loading image...</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ display: hasImage ? "block" : "none" }}
        className="max-w-full max-h-full object-contain shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]"
      />
      {!hasImage && !loading && <DropZone onFile={handleFile} />}
      {hasImage && (
        <button
          onClick={handleReset}
          className="absolute top-2 right-2 bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] text-white text-xs font-semibold px-3 py-1.5 rounded-sm cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.7)]"
        >
          New Image
        </button>
      )}
    </div>
  );
}
