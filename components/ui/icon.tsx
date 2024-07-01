import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "bg-transparent text-primary-foreground hover:bg-primary/90",
    },
    size: {
      sm: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export interface iconProps
  extends React.ComponentProps<typeof Slot>,
    VariantProps<typeof iconVariants> {
  asChild?: boolean;
}

const Icon = ({ className, variant, size, asChild = false, ...props }: iconProps) => {
  const Comp = (asChild ? Slot : "button") as React.ElementType;
  return (
    <Comp
      className={cn(iconVariants({ variant, size, className }))}
      {...props}
    />
  );
};
Icon.displayName = "Icon";

export { Icon, iconVariants };
