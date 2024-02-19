"use client"

import Bounded from "@/components/bounded";
import Heading from "@/components/heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * Props for `Skills`.
 */
export type SkillsProps = SliceComponentProps<Content.SkillsSlice>;

/**
 * Component for "Skills" Slices.
 */
const Skills = ({ slice }: SkillsProps): JSX.Element => {

  const iconRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      iconRef.current.forEach((icon) => {
        gsap.timeline({ repeat: -1, yoyo: true }).
          to(icon, {
            duration: 2,
            y: 20,
            ease: 'power1.inOut',
          })
      }) 
    },iconRef)

    return () => ctx.revert()
  },[])
  
  return (
    <Bounded as="div">
      {/* <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading> */}
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {slice.items.map((item, i) => (
          <div key={i} className="flex flex-col justify-center backdrop-blur-md">
            <div
              ref={(el) => iconRef.current[i] = el}
              className="h-[100px] w-[100px] p-5 rounded-full  object-contain">
              <PrismicNextImage field={item.icon} className="m-auto shadow-lg mix-blend-multiply"/>
            </div>
            <p className="text-center">{item.name}</p>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Skills;
