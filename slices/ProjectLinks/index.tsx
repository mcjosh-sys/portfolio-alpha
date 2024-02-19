import Bounded from "@/components/bounded";
import { Button } from "@/components/button";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectLinks`.
 */
export type ProjectLinksProps = SliceComponentProps<Content.ProjectLinksSlice>;

/**
 * Component for "ProjectLinks" Slices.
 */
const ProjectLinks = ({ slice }: ProjectLinksProps): JSX.Element => {
  return (
    <Bounded as="div" className="">
      <div className="flex gap-3">
        {isFilled.link(slice.primary.preview_link) && (
          <Button
            linkField={slice.primary.preview_link}
            label={slice.primary.preview_label}
          />
        )}
        {isFilled.link(slice.primary.github_link) && (
          <Button
            linkField={slice.primary.github_link}
            label={slice.primary.github_label}
          />
        )}
      </div>
    </Bounded>
  );
};

export default ProjectLinks;
