import { cn } from "@/lib/utils";
import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { IconType } from "react-icons";
import { MdArrowOutward } from "react-icons/md";

interface ButtonProps {
    linkField: LinkField
    label: KeyTextField
    showIcon?: boolean
    icon?: React.ReactNode 
    className?: string
}

export const Button: React.FC<ButtonProps> = ({ linkField, label, showIcon=true, icon, className }) => {
    return (
        <PrismicNextLink
            field={linkField}
            className={cn("group relative text-slate-800 flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105", className)}
        >
            <span className="absolute inset-0 z-0 h-full translate-y-9  bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
            <span className="relative flex items-center justify-center gap-x-2">
                {icon && icon}
                {label}{showIcon && <MdArrowOutward className="inline-block"/>}
            </span>
        </PrismicNextLink>
    )
}