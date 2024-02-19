"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Content, asImageSrc, isFilled } from "@prismicio/client"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { MdArrowOutward } from "react-icons/md"


gsap.registerPlugin(ScrollTrigger)

interface ContentListProps {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[]
  contentType: Content.ContentIndexSlice["primary"]["content_type"]
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"]
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"]
}

export const ContentList: React.FC<ContentListProps> = ({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState<null | number>(null)

  const component = useRef(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const itemsRef = useRef<Array<HTMLLIElement | null>>([])

  const baseUrl = contentType === "Blog" ? "/blog" : "/projects"


  const images = items.map((item) => {
    const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage

    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      height: 320,
      exp: -10
    })
  })


  const onMouseEnter = (index: number) => {
    setCurrentItemIndex(index)
  }

  const onMouseLeave = () => {
    setCurrentItemIndex(null)
  }

  useEffect(() => {
    images.forEach((url) => {
      if (!url) return
      const img = new Image()
      img.src = url
    })
  }, [images])

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach(item => {
        gsap.fromTo(item, {
          opacity: 0, y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "elastic.out(1,0,3)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none none"
          }
        })
      });
    }, component)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY }

      // calculate speed and direction using Euclidean distance between two points
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2) + Math.pow(mousePos.y - lastMousePos.current.y, 2))

      let ctx = gsap.context(() => {
        if (currentItemIndex !== null) {
          const maxY = window.scrollY + window.innerHeight - 350
          const maxX = window.innerWidth - 250

          gsap.to(".hover-reveal", {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotatation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
            opacity: 1,
          })
        }
        lastMousePos.current = mousePos
        return () => ctx.revert()
      }, component)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [currentItemIndex])


  return (
    <div ref={component}>
      <ul
        className="grid border-b border-slate-100"
        onMouseLeave={onMouseLeave}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {
              isFilled.keyText(item.data.title) &&
              <li
                className="list-item opacity-0f"
                ref={(el) => itemsRef.current[index] = el}
                onMouseEnter={() => onMouseEnter(index)}
              >
                <Link href={`${baseUrl}/${item.uid}`} className="flex flex-col justify-between  border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
                  aria-label={item.data.title}
                >
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold">{item.data.title}</span>
                    <div className="flex gap-3 text-yellow-400">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="text-sm font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                    {viewMoreText}
                    <MdArrowOutward />
                  </span>
                </Link>
              </li>}
          </React.Fragment>
        ))}
      </ul>
      {/* Hover element */}
      <div
        className="hover-reveal  pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage: currentItemIndex === null ? "" : `url(${images[currentItemIndex]})`
        }}
      />
    </div>
  )
}
