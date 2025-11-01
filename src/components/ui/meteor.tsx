import { cn } from "./utils";

export function Meteors({ number = 20 }: { number?: number }) {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute left-1/2 top-0 h-0.5 w-0.5 rotate-[215deg] animate-[var(--animate-meteor)] rounded-full bg-primary shadow-[0_0_0_1px_#38bdf8]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-primary before:to-transparent before:content-['']"
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * 400) + "px",
            animationDelay: Math.random() * 0.6 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
          }}
        />
      ))}
    </>
  );
}
