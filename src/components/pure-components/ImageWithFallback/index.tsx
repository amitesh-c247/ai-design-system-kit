"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import type { ImageWithFallbackProps } from "./types";
import styles from "./styles.module.scss";

const ImageWithFallback = ({
  fallback = "",
  alt,
  src,
  className,
  showLoadingState = false,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`${styles.imageWrapper} ${className || ""}`}>
      <Image
        alt={alt}
        onError={() => setError(true)}
        onLoad={handleLoad}
        src={error ? fallback : src}
        className={`${styles.fadeIn} ${
          isLoading && showLoadingState ? styles.loading : ""
        }`}
        {...props}
        unoptimized
      />
    </div>
  );
};

export default ImageWithFallback;
