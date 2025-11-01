import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Zap, Rocket, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxScroll } from "./ui/parallax-scroll";

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  id: string;
  name: string;
  icon: any;
  price: number;
  period: string;
  description: string;
  badge?: string;
  features: string[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: 999,
    period: "project",
    description: "Perfect for small businesses and startups",
    features: [
      "5-Page Responsive Website",
      "Modern UI/UX Design",
      "Mobile Optimization",
      "Contact Form Integration",
      "Basic SEO Setup",
      "2 Weeks Delivery",
      "1 Month Support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    icon: Rocket,
    price: 2499,
    period: "project",
    description: "Ideal for growing businesses with advanced needs",
    badge: "Popular",
    highlighted: true,
    features: [
      "10-Page Custom Website",
      "AI-Powered Features",
      "Advanced Animations",
      "CMS Integration",
      "E-commerce Ready",
      "Advanced SEO & Analytics",
      "API Integration",
      "3 Weeks Delivery",
      "3 Months Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Crown,
    price: 4999,
    period: "project",
    description: "Complete solution for enterprise-level projects",
    badge: "Best Value",
    features: [
      "Unlimited Pages",
      "Full AI Automation",
      "Custom Chatbot/Voice Assistant",
      "Advanced Backend Development",
      "Custom CMS Dashboard",
      "Payment Gateway Integration",
      "Multi-language Support",
      "Premium SEO Package",
      "4-6 Weeks Delivery",
      "6 Months Priority Support",
    ],
  },
];

export function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("professional");
  const ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  useEffect(() => {
    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: index === 1 ? 1.05 : 1, // Center card is slightly bigger initially
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

    // Animate numbers with counting effect
    numbersRef.current.forEach((number, index) => {
      if (!number) return;

      const targetValue = pricingTiers[index].price;
      const obj = { value: 0 };

      gsap.to(obj, {
        value: targetValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: number,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (number) {
            number.textContent = Math.round(obj.value).toLocaleString();
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCardHover = (cardId: string) => {
    setHoveredCard(cardId);
    
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const isHovered = pricingTiers[index].id === cardId;
      const isCenter = index === 1;
      
      gsap.to(card, {
        scale: isHovered ? 1.08 : isCenter && !cardId ? 1.05 : 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
    
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const isCenter = index === 1;
      
      gsap.to(card, {
        scale: isCenter ? 1.05 : 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="pricing" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <ParallaxScroll speed={0.3}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.08),transparent_50%)]" />
        </ParallaxScroll>
        <ParallaxScroll speed={0.2}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.08),transparent_50%)]" />
        </ParallaxScroll>
      </div>

      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Pricing Plans
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transparent pricing for world-class web development. No hidden fees, just exceptional value.
            </p>
          </motion.div>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden xl:!grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            const isHovered = hoveredCard === tier.id;
            const isCenter = index === 1;

            return (
              <div
                key={tier.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                onMouseEnter={() => handleCardHover(tier.id)}
                onMouseLeave={handleCardLeave}
                className={`relative ${isCenter ? "md:-mt-4" : ""}`}
              >
                <Card
                  className={`relative overflow-hidden border-2 transition-all duration-300 h-full ${
                    tier.highlighted
                      ? "border-primary/50 bg-card/80"
                      : "border-primary/20 bg-card/60"
                  } !backdrop-blur-xl hover:border-primary/70`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : ""
                    }`}
                  />

                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute !z-10 -right-12 top-8 rotate-45 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold py-1 px-12 shadow-lg">
                      {tier.badge}
                    </div>
                  )}

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          tier.highlighted
                            ? "bg-gradient-to-br from-primary to-secondary"
                            : "bg-primary/10"
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon
                          className={`w-7 h-7 ${
                            tier.highlighted ? "text-white" : "text-primary"
                          }`}
                        />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    {/* Price with animated numbers */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          $
                          <span
                            ref={(el) => {
                              if (el) numbersRef.current[index] = el;
                            }}
                          >
                            0
                          </span>
                        </span>
                        <span className="text-muted-foreground">/{tier.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10">
                    <Button
                      onClick={scrollToContact}
                      className={`w-full ${
                        tier.highlighted
                          ? "bg-gradient-to-r text-white from-primary to-secondary hover:opacity-90"
                          : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                      }`}
                    >
                      Get Started
                    </Button>
                  </CardFooter>

                  {/* Animated border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: isHovered ? ["0% 0%", "200% 0%"] : "0% 0%",
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "linear",
                    }}
                  />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Mobile View - Tabs */}
        <div className="xl:!hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/60 !backdrop-blur-xl border border-primary/20 !h-auto">
              {pricingTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <TabsTrigger
                    key={tier.id}
                    value={tier.id}
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary flex flex-col gap-1 py-3"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{tier.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {pricingTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <TabsContent key={tier.id} value={tier.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-2 border-primary/20 !backdrop-blur-xl relative overflow-hidden bg-nonw">
                      {tier.badge && (
                        <div className="absolute !z-20 -right-12 top-8 rotate-45 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold py-1 px-12 shadow-lg">
                          {tier.badge}
                        </div>
                      )}
                       {/* Animated border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    
                  />
                      <CardHeader className="!z-20">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              tier.highlighted
                                ? "bg-gradient-to-br from-primary to-secondary"
                                : "bg-primary/10"
                            }`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                tier.highlighted ? "text-white" : "text-primary"
                              }`}
                            />
                          </motion.div>
                          
                        </div>
                        <CardTitle className="text-xl">{tier.name}</CardTitle>
                        <CardDescription>{tier.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="!z-20">
                        <div className="mb-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              ${tier.price.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              /{tier.period}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {tier.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="!z-20">
                        <Button
                          onClick={scrollToContact}
                          className={`w-full ${
                            tier.highlighted
                              ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                              : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                          }`}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Need a custom solution?{" "}
            <button
              onClick={scrollToContact}
              className="text-primary hover:underline font-medium"
            >
              Let's talk about your project
            </button>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Free revisions included</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Ongoing support</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
