import Bounded from "@/components/bounded";
import Heading from "@/components/heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ContentList } from "./components/content-list";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {

  const client = createClient()
  const blogPosts = await client.getAllByType("blog_post")
  const projects = await client.getAllByType("project")

  const contentType = slice.primary.content_type

  if (!contentType) return <></>

  const items = contentType === "Blog" ? blogPosts : projects

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading text={slice.primary.heading} size="xl" className="mb-5" />
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-6 text-slate-400">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;
