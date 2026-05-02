"use client";

import { useEffect, useRef } from "react";
import mediumZoom, { Zoom } from "medium-zoom";
import Image, { ImageProps } from "next/image";

interface ZoomImageProps extends ImageProps {
  alt: string;
}

export default function ZoomImage({ alt, ...props }: ZoomImageProps) {
  const zoomRef = useRef<Zoom | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!zoomRef.current) {
      zoomRef.current = mediumZoom({
        background: "rgba(0,0,0,0.8)",
        margin: 24,
      });
    }

    const zoom = zoomRef.current;
    const img = imgRef.current;

    if (img) {
      zoom.attach(img);
    }

    return () => {
      zoom.detach();
    };
  }, []);

  return (
    <div className="zoom-image-container relative h-full w-full">
      <Image
        ref={imgRef}
        alt={alt}
        {...props}
        className={`${props.className || ""} cursor-zoom-in`}
      />
    </div>
  );
}
