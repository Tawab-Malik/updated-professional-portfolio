import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "./utils";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const wordsArray = words.split(" ");

  return (
    <div ref={ref} className={cn("", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.5,
            delay: idx * 0.08,
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      {words.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.split("").map((char, index) => (
            <motion.span
              key={`char-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.5 + index * 0.05,
              }}
              className={cn("", word.className)}
            >
              {char}
            </motion.span>
          ))}
          &nbsp;
        </div>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-8 w-1 rounded-sm bg-primary",
          cursorClassName
        )}
      />
    </div>
  );
}
