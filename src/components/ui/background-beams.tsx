import React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

export function BackgroundBeams({ className }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 overflow-hidden",
        className
      )}
    >
      <svg
        className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <motion.path
            key={`path-${index}`}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
        ))}
        <defs>
          {paths.map((_, index) => (
            <motion.linearGradient
              key={`gradient-${index}`}
              id={`linearGradient-${index}`}
              initial={{
                x1: "0%",
                x2: "0%",
                y1: "0%",
                y2: "0%",
              }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + index * 1}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <stop stopColor="#38bdf8" stopOpacity="0"></stop>
              <stop stopColor="#38bdf8"></stop>
              <stop offset="32.5%" stopColor="#9333ea"></stop>
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0"></stop>
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
