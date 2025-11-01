import { Brain, Cog, Globe, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { BorderBeam } from "./ui/moving-border";
import { ParallaxScroll, MouseParallax } from "./ui/parallax-scroll";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    // Animate cards with GSAP stagger
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );
    });

    // Background parallax movement
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: Brain,
      title: "AI Web Apps",
      description:
        "Smart, responsive applications powered by cutting-edge AI technologies like GPT-4, Claude, and custom ML models.",
      features: [
        "Custom AI integrations",
        "Intelligent automation",
        "Real-time processing",
        "Scalable architecture",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Cog,
      title: "Automation Tools",
      description:
        "Save countless hours with Python & JavaScript automation scripts that handle repetitive tasks efficiently.",
      features: [
        "Web scraping",
        "Data processing",
        "Workflow automation",
        "API integrations",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Custom Websites",
      description:
        "Fast, modern, and SEO-optimized business websites built with Next.js and the latest web technologies.",
      features: [
        "Responsive design",
        "Lightning-fast performance",
        "SEO optimization",
        "Analytics integration",
      ],
      gradient: "from-primary to-blue-600",
    },
    {
      icon: MessageSquare,
      title: "Voice Assistants & Chatbots",
      description:
        "Interactive AI-powered conversational interfaces that enhance user engagement and provide 24/7 support.",
      features: [
        "Natural language processing",
        "Multi-language support",
        "Context awareness",
        "Custom training",
      ],
      gradient: "from-secondary to-purple-600",
    },
  ];

  return (
    <section id="services" ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full !blur-2xl" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full !blur-2xl" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto relative z-10"
      >
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
              Services
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:!text-6xl !font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
              What I Can Build
            </span>
            <br />
            <span className="text-white/90">For You</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web development and AI automation services tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CardContainer className="w-full">
                <CardBody className="relative group/card w-full h-full">
                  <div className="relative h-full bg-card border border-primary/10 rounded-2xl p-8 overflow-hidden">
                    {/* Animated Border */}
                    <BorderBeam
                      size={300}
                      duration={12 + index * 2}
                      delay={index * 2}
                      borderWidth={2}
                    />

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover/card:opacity-5 transition-opacity duration-500`} />

                    <CardItem translateZ={50} className="mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                        <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                          <service.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    </CardItem>

                    <CardItem translateZ={60} className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {service.title}
                      </h3>
                    </CardItem>

                    <CardItem translateZ={40} className="mb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardItem>

                    <CardItem translateZ={30}>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                            className="flex items-center text-sm text-muted-foreground group/item"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-3 group-hover/item:scale-150 transition-transform`} />
                            <span className="group-hover/item:text-foreground transition-colors">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardItem>

                    {/* Floating particles */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/50"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-secondary/50"
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}