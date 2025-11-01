import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({ children, speed = 0.5, className = "" }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface MouseParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({ children, strength = 20, className = "" }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * strength;
      const yPos = (clientY / innerHeight - 0.5) * strength;

      gsap.to(element, {
        x: xPos,
        y: yPos,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const updateScroll = () => {
      targetScroll = window.scrollY;
    };

    const smoothScrollAnimation = () => {
      currentScroll = lerp(currentScroll, targetScroll, 0.1);
      
      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        requestAnimationFrame(smoothScrollAnimation);
      }
    };

    window.addEventListener("scroll", updateScroll);
    smoothScrollAnimation();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return <>{children}</>;
}
