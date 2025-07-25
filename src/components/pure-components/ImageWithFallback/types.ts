import { ImageProps, StaticImageData } from "next/image";

export interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
  fallback?: string | StaticImageData;
  className?: string;
  showLoadingState?: boolean;
}
