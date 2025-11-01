import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { BackgroundBeams } from "./ui/background-beams";
import { Meteors } from "./ui/meteor";
import { ParallaxScroll, MouseParallax } from "./ui/parallax-scroll";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    if (!contentRef.current) return;

    // GSAP scroll-triggered animations
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Mouse parallax for orbs
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 100;
      const yPos = (clientY / innerHeight - 0.5) * 100;

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 2,
          ease: "power2.out",
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -xPos * 0.3,
          y: -yPos * 0.3,
          duration: 2.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-start md:!items-center justify-center overflow-hidden"
    >
      {/* Spotlight Effect */}
      <ParallaxScroll speed={0.3}>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#38bdf8"
        />
      </ParallaxScroll>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <ParallaxScroll speed={0.2}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        </ParallaxScroll>
        
        <ParallaxScroll speed={0.4}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15),transparent_50%)]" />
        </ParallaxScroll>
        
        {/* Grid */}
        <ParallaxScroll speed={0.1}>
          <div
            className="absolute inset-0 bg-grid-white bg-[size:50px_50px]"
            style={{
              maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
            }}
          />
        </ParallaxScroll>
        
        <BackgroundBeams className="opacity-40" />
        <Meteors number={30} />
      </div>

      {/* Animated orbs with mouse parallax */}
      <MouseParallax strength={30}>
        <div
          ref={orb1Ref}
          className="absolute !top-1/4 !left-1/4 w-72 h-72 bg-primary/30 rounded-full !blur-3xl pointer-events-none"
        />
      </MouseParallax>
      
      <MouseParallax strength={40}>
        <div
          ref={orb2Ref}
          className="absolute !bottom-1/4 !right-1/4 w-96 h-96 bg-secondary/30 rounded-full !blur-2xl pointer-events-none"
        />
      </MouseParallax>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:!py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8 group hover:bg-primary/20 transition-all cursor-default"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI-Powered Web Development
          </span>
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <div className="space-y-6 mb-12">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Build Smarter
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[var(--animate-gradient)]">
              Websites with AI
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text text-transparent">
              & Next.js
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <TextGenerateEffect
              words="I help startups and businesses automate their workflows and boost performance with AI-driven web solutions."
              className="text-xl md:text-2xl text-muted-foreground"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="relative text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity group px-8 py-6 text-lg overflow-hidden"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 flex items-center">
                Book Free Audit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg backdrop-blur-sm group relative overflow-hidden"
              onClick={() =>
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10">View Portfolio</span>
              <motion.div
                className="absolute inset-0 bg-primary/5"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg !blur-xl group-hover:!blur-2xl !duration-400" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}