import { Badge } from "./ui/badge";
import { Code2, Cpu, Zap, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { ParallaxScroll, MouseParallax } from "./ui/parallax-scroll";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement[]>([]);
  const skillsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    // Animate highlights with GSAP
    highlightsRef.current.forEach((highlight, index) => {
      if (!highlight) return;

      gsap.fromTo(
        highlight,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: highlight,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });

    // Animate skills section
    if (skillsRef.current) {
      const badges = skillsRef.current.querySelectorAll('[data-skill-badge]');
      
      gsap.fromTo(
        badges,
        {
          opacity: 0,
          scale: 0,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const skills = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "AI Integration",
    "OpenAI API",
    "Automation",
    "Web Scraping",
    "REST APIs",
    "Node.js",
  ];

  const highlights = [
    {
      icon: Code2,
      title: "5+ Years Experience",
      description: "Building modern web applications",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Cpu,
      title: "AI Specialist",
      description: "Integrating cutting-edge AI solutions",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Efficient workflows and quick turnaround",
      color: "from-primary to-blue-600",
    },
    {
      icon: Sparkles,
      title: "Client Focused",
      description: "Your success is my priority",
      color: "from-secondary to-purple-600",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-primary/10 rounded-full !blur-2xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full !blur-2xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary backdrop-blur-sm">
              About Me
            </span>
          </motion.div>

          <h2 className="!text-4xl md:!text-6xl !font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
              Abdul Tawab
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            I'm a full-stack developer and AI automation expert based in Pakistan, serving clients
            worldwide. With a passion for innovation and a commitment to excellence, I transform
            ideas into powerful digital solutions that drive real business results.
          </motion.p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl !blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${highlight.color} p-0.5 mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <highlight.icon className="w-7 h-7 text-primary" />
                  </div>
                </motion.div>

                <h3 className="mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {highlight.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">{highlight.description}</p>

                {/* Decorative element */}
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/50"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl mb-8 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Tech Stack & Expertise
          </h3>

          <div className="flex flex-wrap justify-center gap-3" ref={skillsRef}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge
                  variant="outline"
                  className="px-6 py-3 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 cursor-default relative overflow-hidden group"
                  data-skill-badge
                >
                  <span className="relative z-10">{skill}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 !blur-2xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 !blur-2xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}