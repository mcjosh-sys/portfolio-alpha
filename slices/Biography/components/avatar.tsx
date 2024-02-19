"use client"
import { cn } from "@/lib/utils";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface AvatarProps {
    image: ImageField
    className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ image, className }) => {

    const component = useRef(null)

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".avatar", {
                opacity:0, scale:1.4
            }, {
                scale: 1,
                opacity: 1,
                duration: 1.3,
                ease:"power3.inOut"
            })
        }, component)

        if (component.current) {
            const element = component.current as HTMLDivElement
            element.addEventListener("mousemove", (e) => {
                const rect = element.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                let percent = {
                    x: (e.clientX - centerX) / rect.width / 2
                }
                let distFromCenter = 1 - Math.abs(percent.x)
                
                gsap.timeline({
                    defaults: { duration: .5, overwrite: "auto", ease: "power3.inOut"}
                }).to(".avatar", {
                    rotation: gsap.utils.clamp(-2, 2, 5 * percent.x),
                    duration: .5
                }, 0).to(".highlight", {
                    opacity: distFromCenter - .7,
                    x: -10 + 20 * percent.x,
                    duration: .5
                })
            })
        }

        return () => ctx.revert()
    },[])

    return (
        <div ref={component} className={cn("relative h-full w-full", className)}>
            <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
                <PrismicNextImage
                    field={image}
                    className="avatar-image h-full w-full object-fill"
                    imgixParams={{ q: 90 }}
                />
                <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block" />
            </div>
        </div>
    )
}