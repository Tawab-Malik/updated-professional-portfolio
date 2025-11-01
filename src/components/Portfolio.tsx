import { Badge } from "./ui/badge";
import { ExternalLink, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ParallaxScroll } from "./ui/parallax-scroll";
import { useState, useRef, MouseEvent, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div className="relative h-full bg-card border border-primary/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(56, 189, 248, 0.1), transparent 40%)`,
          }}
        />

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Floating icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/20 !backdrop-blur-md border border-primary/30 flex items-center justify-center"
          >
            <ExternalLink className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4" style={{ transform: "translateZ(50px)" }}>
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, idx: number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
            {project.metrics.map((metric: string, idx: number) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                className="text-center"
              >
                <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{metric}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: isHovered ? ["0%", "200%"] : "0%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const projects = [
    {
      title: "AI Content Generator Platform",
      description:
        "A comprehensive SaaS platform that generates blog posts, social media content, and marketing copy using GPT-4. Features include multi-language support, SEO optimization, and content scheduling.",
      image:
        "https://images.unsplash.com/photo-1645839078449-124db8a049fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MTIyOTA0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind"],
      metrics: ["40% faster", "500+ users", "99.9% uptime"],
    },
    {
      title: "Smart Analytics Dashboard",
      description:
        "Real-time business intelligence dashboard with AI-powered insights and predictions. Integrates with multiple data sources to provide actionable recommendations for business growth.",
      image:
        "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxMjcwMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["React", "Python", "AI/ML", "D3.js"],
      metrics: ["Real-time", "15+ sources", "Predictions"],
    },
    {
      title: "Workflow Automation Suite",
      description:
        "Custom automation tools that streamline business processes, including data entry, email marketing, and customer onboarding. Reduced manual work by 70% for the client.",
      image:
        "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjEyODkyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Python", "Node.js", "Zapier", "APIs"],
      metrics: ["70% saved", "Zero errors", "24/7 active"],
    },
    {
      title: "AI Customer Support Chatbot",
      description:
        "Intelligent chatbot with natural language understanding, trained on company-specific data to provide accurate customer support. Handles 80% of customer inquiries automatically.",
      image:
        "https://images.unsplash.com/photo-1757310998648-f8aaa5572e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MTI3Nzg0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["ChatGPT", "React", "WebSocket", "NLP"],
      metrics: ["80% auto", "2s response", "95% happy"],
    },
  ];

  return (
    <section id="portfolio" className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-secondary/10 rounded-full !blur-2xl" />
      </div>

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
            <span className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-sm text-secondary !backdrop-blur-sm">
              Portfolio
            </span>
          </motion.div>

          <h2 className="text-4xl md:!text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-secondary to-primary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions that delivered measurable results for businesses around the globe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}