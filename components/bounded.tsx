import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface BoundedProps {
    as?: React.ElementType
    className?: string
    children: React.ReactNode
}

const Bounded = forwardRef<HTMLDivElement, BoundedProps>(({
    as: Component = "section", className, children, ...props
},ref) => {
  return (
      <Component
          ref={ref}
          className={cn("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
          {...props}
      >
          <div className="mx-auto w-full max-w-7xl">{children}</div>
    </Component>
  )
})

Bounded.displayName = "Bounded"

export default Bounded