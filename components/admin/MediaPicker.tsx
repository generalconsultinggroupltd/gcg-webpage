"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { isUploaded, mediaUrl } from "@/lib/api";
import { ImagesIcon } from "@/components/ui/Icons";

// Same limits as the API (backend/handlers/uploads.go); checked here too so
// a too-large file is refused before a long upload.
const MAX_IMAGE_MB = 10;
const MAX_VIDEO_MB = 100;

const IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/gif";
const VIDEO_TYPES = "video/mp4,video/quicktime,video/webm";

/** Returns an error message for a file the API would refuse, else null. */
export function checkFile(file: File, allowVideo: boolean): string | null {
  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");
  if (!isImage && !(allowVideo && isVideo)) {
    return allowVideo
      ? "Choose a JPG, PNG, WebP or GIF image, or an MP4, MOV or WebM video."
      : "Choose a JPG, PNG, WebP or GIF image.";
  }
  const maxMb = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB;
  if (file.size > maxMb * 1024 * 1024) {
    return `This file is too large (maximum ${maxMb} MB for ${isVideo ? "videos" : "images"}).`;
  }
  return null;
}

/** Media of an existing item, or of a newly picked file. */
export function MediaPreview({
  src,
  type,
  alt,
  contain = false,
}: {
  /** A stored path ("/uploads/…", "/gallery/…") or an object URL. */
  src: string;
  type: "image" | "video";
  alt: string;
  contain?: boolean;
}) {
  const local = src.startsWith("blob:");
  const url = local ? src : mediaUrl(src);
  if (type === "video") {
    return (
      <video
        src={local ? url : `${url}#t=0.1`}
        controls
        preload="metadata"
        className="h-full w-full bg-navy-950 object-contain"
      />
    );
  }
  return (
    <Image
      src={url}
      alt={alt}
      fill
      unoptimized={local || isUploaded(src)}
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
      className={contain ? "object-contain p-4" : "object-cover"}
    />
  );
}

/** File input with a preview of the current media and of the new pick. */
export function MediaPicker({
  label,
  allowVideo,
  current,
  file,
  onChange,
  contain,
}: {
  label: string;
  allowVideo: boolean;
  /** What is stored today (editing), shown until a new file is chosen. */
  current?: { path: string; type: "image" | "video" };
  file: File | null;
  onChange: (file: File | null, error: string | null) => void;
  contain?: boolean;
}) {
  const id = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Object URLs hold the file in memory until revoked: on replace and unmount.
  const urlRef = useRef<string | null>(null);
  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  function pick(picked: File) {
    const error = checkFile(picked, allowVideo);
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = error ? null : URL.createObjectURL(picked);
    setPreviewUrl(urlRef.current);
    onChange(error ? null : picked, error);
  }

  const preview = file && previewUrl
    ? { src: previewUrl, type: file?.type.startsWith("video/") ? ("video" as const) : ("image" as const) }
    : current
      ? { src: current.path, type: current.type }
      : null;

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-cream">
        {preview ? (
          <MediaPreview src={preview.src} type={preview.type} alt="" contain={contain} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
            <ImagesIcon className="h-8 w-8" />
            <span className="text-xs">No file chosen</span>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <label
          htmlFor={id}
          className="cursor-pointer rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600"
        >
          {current || file ? "Choose another file" : "Choose a file"}
        </label>
        <input
          id={id}
          type="file"
          accept={allowVideo ? `${IMAGE_TYPES},${VIDEO_TYPES}` : IMAGE_TYPES}
          className="sr-only"
          onChange={(event) => {
            const picked = event.target.files?.[0] ?? null;
            event.target.value = "";
            if (picked) pick(picked);
          }}
        />
        <span className="min-w-0 truncate text-xs text-muted">
          {file
            ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`
            : allowVideo
              ? `Images up to ${MAX_IMAGE_MB} MB, videos up to ${MAX_VIDEO_MB} MB`
              : `JPG, PNG, WebP or GIF, up to ${MAX_IMAGE_MB} MB`}
        </span>
      </div>
    </div>
  );
}
