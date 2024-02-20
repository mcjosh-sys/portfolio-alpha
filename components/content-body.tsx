import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/bounded";
import Heading from "@/components/heading";
import { Content, DateField, isFilled } from "@prismicio/client";
import Bubbles from "./bubbles/bubbles";
import { Button } from "./button";
import { DiGithub } from "react-icons/di";


export default function ContentBody(
    { page }:
        { page: Content.BlogPostDocument | Content.ProjectDocument }
) {

    const formatDate = (date: DateField) => {
        if (isFilled.date(date)) {
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }

            return Intl.DateTimeFormat("en-US", options).format(new Date(date))
        }
    }

    return (
        <Bounded as="article">
            <div className="rounded-2xl border-2 border-slate-800 overflow-hidden relative">
                <Bubbles />
                <div className="backdrop-blur-md px-4 py-10 md:px-8 md:py-20">
                    <Heading as="h1" text={page.data.title} />
                    <div className="flex gap-2 text-yellow-400 text-lg font-bold">
                        {page.tags.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                    <p className="mt-8 border-b border-slate-600 text-xl font-mediumtext-slate-300">
                        {formatDate(page.data.date)}
                    </p>
                    <div className="prose prose-invert prose-lg mt-12 w-full max-w-none md:mt-20">
                        <SliceZone slices={page.data.slices.filter(slice => slice.slice_type !== "project_links")} components={components} />
                    </div>
                        <SliceZone slices={page.data.slices.filter(slice => slice.slice_type === "project_links")} components={components} />
                </div>
            </div>
        </Bounded>
    )
}