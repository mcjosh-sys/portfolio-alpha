import { cn } from "@/lib/utils";
import { KeyTextField } from "@prismicio/client";

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "xl" | "lg" | "md" | "sm";
    text?: KeyTextField;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}&({children: React.ReactNode} | {text: KeyTextField});

export default function Heading({
    as: Element = "h1",
    className,
    text,
    description,
    children,
    size = "lg",
}: HeadingProps) {

    const sizes = {
        "xl" :"text-7xl lg:text-9xl",
        "lg" : "text-6xl lg:text-8xl",
        "md" : "text-5xl lg:text-6xl",
        "sm" : "text-3xl lg:text-4xl",
    }

    return (
        <Element
            className={cn(
                "font-bold leading-tight tracking-tight  text-slate-300",
                sizes[size],
                className,
            )}
        >
            {children ? children : text}
        </Element>
    );
}