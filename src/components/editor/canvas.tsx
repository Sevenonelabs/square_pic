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
import { canvasBlob } from "@/lib/image-export";
import { isImageFile } from "@/lib/image-input";
import { useImageLoader } from "@/lib/use-image-loader";
import { trackToolEvent } from "@/lib/analytics";
import { getExportDimensions, renderToCanvas, type EditorState } from "@/lib/editor-renderer";
import { DropZone } from "./drop-zone";

interface Props {
  state: EditorState;
  onStateChange: (update: Partial<EditorState>) => void;
  onError: (message: string | null) => void;
  toolName?: "square" | "resizer";
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
  function EditorCanvasInner({ state, onStateChange, onError, toolName = "square" }, ref) {
    const { loadImage, clearImage } = useImageLoader();
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

      const padding = getComputedStyle(container);
      const cw = container.clientWidth - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight);
      const ch = container.clientHeight - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom);
      if (cw <= 0 || ch <= 0) return;

      const { w: dispW, h: dispH } = computeDisplaySize(
        s.targetWidth,
        s.targetHeight,
        s.image,
        cw,
        ch,
      );

      canvas.style.width = `${dispW}px`;
      canvas.style.height = `${dispH}px`;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const bufferW = Math.round(dispW * pixelRatio);
      const bufferH = Math.round(dispH * pixelRatio);
      if (canvas.width !== bufferW || canvas.height !== bufferH) {
        canvas.width = bufferW;
        canvas.height = bufferH;
      }

      try {
        renderToCanvas(ctx, canvas, s, bufferW, bufferH);
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

    const exportToBlob = useCallback(
      async (mime: string, maxSize?: number): Promise<Blob | null> => {
        const s = renderState.current;
        const img = s.image;
        if (!img) return null;

        const { width: outW, height: outH } = getExportDimensions(s, maxSize);

        const offscreen = document.createElement("canvas");
        offscreen.width = outW;
        offscreen.height = outH;
        const ctx = offscreen.getContext("2d");
        if (!ctx) return null;

        renderToCanvas(ctx, offscreen, s, outW, outH);
        if (mime === "image/jpeg") {
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, outW, outH);
        }

        return canvasBlob(offscreen, mime);
      },
      [],
    );

    useImperativeHandle(ref, () => ({ exportToBlob }), [exportToBlob]);

    const handleFile = useCallback(
      (file: File) => {
        if (!isImageFile(file)) {
          onError("Choose an image file, such as PNG, JPEG or WebP.");
          return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          onError(`Choose an image under ${MAX_SIZE_MB} MB and try again.`);
          return;
        }
        setLoading(true);
        onError(null);
        loadImage(file, (img) => {
          setLoading(false);
          trackToolEvent("upload_accepted", toolName);
          onStateChange({ image: img });
        }, () => {
          setLoading(false);
          trackToolEvent("processing_error", toolName);
          onError("This image could not be opened. Choose another image and try again.");
        });
      },
      [onStateChange, onError, toolName, loadImage],
    );

    const handleReset = useCallback(() => {
      clearImage();
      const s = renderState.current;
      if (s.image) {
        URL.revokeObjectURL(s.image.src);
      }
      onError(null);
      onStateChange({ image: null });
    }, [onStateChange, onError, clearImage]);

    return (
      <div
        ref={containerRef}
        className="editor-canvas-container w-full h-full min-h-0 flex-1 flex items-center justify-center p-2.5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-md border border-[rgba(255,255,255,0.10)] relative overflow-hidden max-h-full min-w-0 will-change-transform"
      >
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(3,4,6,0.85)]">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            <span className="text-[0.875rem] text-[#8d9aaa] font-semibold">Loading image...</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{ display: hasImage ? "block" : "none" }}
          className={`max-w-full max-h-full object-contain shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] ${state.mode === "transparent" ? "transparency-grid" : ""}`}
        />
        {!hasImage && !loading && <DropZone onFile={handleFile} />}
        {hasImage && (
          <button
            onClick={handleReset}
            className="absolute top-2 right-2 bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold px-3 py-1.5 rounded-sm cursor-pointer transition-colors hover:bg-[rgba(0,0,0,0.7)]"
          >
            New Image
          </button>
        )}
      </div>
    );
  },
);

export const EditorCanvas = memo(EditorCanvasInner);
