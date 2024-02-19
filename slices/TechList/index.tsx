"use client"
import Bounded from "@/components/bounded";
import Heading from "@/components/heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger)

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {

  const component = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      })
      tl.fromTo(".tech-row", {
        x: (index) => !(index % 2) ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)
      }, {
        x: (index) => !(index % 2) ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400),
        ease: "power1.inOut"
      })
    })

    return () => ctx.revert()
  },)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading text={slice.primary.heading} size="md" as="h2" />
      </Bounded>
      {slice.items.map(({ tech_name, tech_color }, i) => (
        <div key={i}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <React.Fragment key={i}>
              <span
                className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: i === 7 && tech_color ? tech_color : "inherit"
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl" style={{
                color: (i === 6 || i === 7) && tech_color ? tech_color : "inherit"
              }}>
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
