import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <div className="w-full max-w-prose object-contain">
      <PrismicNextImage
        field={slice.primary.image}
        imgixParams={{w: 600, exp: -10}}
      />
    </div>
  );
};

export default ImageBlock;
