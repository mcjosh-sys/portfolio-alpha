import Bounded from "@/components/bounded";
import { Button } from "@/components/button";
import Heading from "@/components/heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Avatar } from "./components/avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.body}/>
        </div>
        {isFilled.link(slice.primary.button_link) &&<Button
          linkField={slice.primary.button_link} label={slice.primary.button_text}
        />}
        <Avatar
          image={slice.primary.avatar}
          className="row-start-1 max-w-sm lg:col-start-2 lg:row-end-3"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
