import type { ImgHTMLAttributes } from 'react';
import type { ImageAsset } from '../data';

type ActivityImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'className' | 'loading' | 'fetchPriority'
> & {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
};

export default function ActivityImage({
  image,
  className,
  priority = false,
  style,
  ...imageProps
}: ActivityImageProps) {
  return (
    <img
      {...imageProps}
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      style={{ objectPosition: image.position ?? 'center', ...style }}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
