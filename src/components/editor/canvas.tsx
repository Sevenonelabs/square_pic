"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import { renderToCanvas, type EditorState } from "@/lib/editor-renderer";
import { DropZone } from "./drop-zone";

interface Props {
  state: EditorState;
  onStateChange: (update: Partial<EditorState>) => void;
}

export interface EditorCanvasHandle {
  exportToBlob: (mime: string, maxSize?: number) => Promise<Blob | null>;
}

const MAX_SIZE_MB = 20;

function computeDisplaySize(
  targetW: number,
  targetH: number,
  image: HTMLImageElement,
  containerW: number,
  containerH: number,
) {
  const nativeW = targetW > 0 ? targetW : Math.max(image.width, image.height);
  const nativeH = targetH > 0 ? targetH : nativeW;
  const scale = Math.min(containerW / nativeW, containerH / nativeH, 1);
  return { w: Math.round(Math.max(1, nativeW * scale)), h: Math.round(Math.max(1, nativeH * scale)) };
}

const EditorCanvasInner = forwardRef<EditorCanvasHandle, Props>(
  function EditorCanvasInner({ state, onStateChange }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasImage = state.image !== null;
    const renderScheduled = useRef(false);
    const [loading, setLoading] = useState(false);
    const renderState = useRef(state);
    renderState.current = state;
    const firstImageRef = useRef(true);

    const doRender = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const container = containerRef.current;
      const s = renderState.current;
      if (!ctx || !canvas || !s.image || !container) return;

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (cw <= 0 || ch <= 0) return;

      const { w: dispW, h: dispH } = computeDisplaySize(
        s.targetWidth,
        s.targetHeight,
        s.image,
        cw,
        ch,
      );

      if (canvas.width !== dispW || canvas.height !== dispH) {
        canvas.width = dispW;
        canvas.height = dispH;
      }

      try {
        renderToCanvas(ctx, canvas, s, dispW, dispH);
      } catch (e) {
        console.error("Canvas render error:", e);
      }
    }, []);

    const scheduleRender = useCallback(() => {
      if (renderScheduled.current) return;
      renderScheduled.current = true;
      requestAnimationFrame(() => {
        renderScheduled.current = false;
        doRender();
      });
    }, [doRender]);

    useLayoutEffect(() => {
      if (hasImage) {
        if (firstImageRef.current) {
          firstImageRef.current = false;
          doRender();
        }
      } else {
        firstImageRef.current = true;
      }
    }, [hasImage, doRender]);

    useEffect(() => {
      if (hasImage && !firstImageRef.current) {
        scheduleRender();
      }
    }, [hasImage, scheduleRender, state]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const ro = new ResizeObserver(() => {
        if (renderState.current.image) scheduleRender();
      });
      ro.observe(container);
      return () => ro.disconnect();
    }, [scheduleRender]);

    const getExportSize = useCallback((s: EditorState, maxSize?: number) => {
      const img = s.image!;
      let w = s.targetWidth > 0 ? s.targetWidth : Math.max(img.width, img.height);
      let h = s.targetHeight > 0 ? s.targetHeight : w;
      const longest = Math.max(w, h);
      const cap = maxSize ?? 4096;
      if (longest > cap) {
        const scale = cap / longest;
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }
      return { w, h };
    }, []);

    const exportToBlob = useCallback(
      async (mime: string, maxSize?: number): Promise<Blob | null> => {
        const s = renderState.current;
        const img = s.image;
        if (!img) return null;

        const { w: outW, h: outH } = getExportSize(s, maxSize);

        const offscreen = document.createElement("canvas");
        offscreen.width = outW;
        offscreen.height = outH;
        const ctx = offscreen.getContext("2d");
        if (!ctx) return null;

        renderToCanvas(ctx, offscreen, s, outW, outH);

        return new Promise((resolve) => offscreen.toBlob((b) => resolve(b), mime));
      },
      [getExportSize],
    );

    useImperativeHandle(ref, () => ({ exportToBlob }), [exportToBlob]);

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
      [onStateChange],
    );

    const handleReset = useCallback(() => {
      const s = renderState.current;
      if (s.image) {
        URL.revokeObjectURL(s.image.src);
      }
      onStateChange({ image: null });
    }, [onStateChange]);

    return (
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-2.5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-md border border-[rgba(255,255,255,0.10)] relative overflow-hidden max-h-full min-w-0 will-change-transform"
      >
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
  },
);

export const EditorCanvas = memo(EditorCanvasInner);
