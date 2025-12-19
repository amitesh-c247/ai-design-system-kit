"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import type { ImageWithFallbackProps } from "./types";
import classNames from "classnames";

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
    <div className={classNames("position-relative", className)}>
      <Image
        alt={alt}
        onError={() => setError(true)}
        onLoad={handleLoad}
        src={error ? fallback : src}
        className={classNames({
          "opacity-50": isLoading && showLoadingState,
        })}
        style={{ transition: "opacity 0.3s ease" }}
        {...props}
        unoptimized
      />
    </div>
  );
};

export default ImageWithFallback;
