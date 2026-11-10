import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm/5 text-gray-700 font-medium select-none",
        className
      )}
      {...props}
    />
  )
}

export { Label }
