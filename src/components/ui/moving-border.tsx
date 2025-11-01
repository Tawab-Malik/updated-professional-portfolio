import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "./utils";

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: any;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-full w-full overflow-hidden p-[1px]",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, transparent, transparent 50%, rgba(56, 189, 248, 0.5) 50%, rgba(56, 189, 248, 0.5)),
            linear-gradient(0deg, transparent, transparent 50%, rgba(147, 51, 234, 0.5) 50%, rgba(147, 51, 234, 0.5))
          `,
          backgroundSize: "200% 200%",
          animation: `border-animation ${duration}ms linear infinite`,
        }}
      />
      <div
        className={cn(
          "relative h-full w-full bg-card !backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = "#38bdf8",
  colorTo = "#9333ea",
  delay = 0,
}: {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        className
      )}
      style={
        {
          "--border-width": borderWidth,
          "--anchor": anchor,
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
        style={{
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          animation: `beam ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}
