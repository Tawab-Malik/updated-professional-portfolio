import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Pricing", id: "pricing" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // GSAP animation for nav on scroll
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isScrolled ? 0 : -100,
        opacity: isScrolled ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative !backdrop-blur-xl rounded-2xl border transition-all duration-300 ${isScrolled
              ? "bg-card/80 border-primary/20 shadow-lg shadow-primary/5"
              : "bg-card/50 border-primary/10"
              }`}
          >
            <div className="px-6 py-4 flex items-center justify-between relative z-20">
              {/* Logo */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <h3 className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Abdul Tawab
                  </h3>
                  <p className="text-xs text-white">Web Developer</p>
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden xl:!flex items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-white hover:text-primary transition-colors relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden xl:!block">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white transition-opacity"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:!hidden w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-primary" />
                ) : (
                  <Menu className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            </div>

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 !z-60 xl:!hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute !inset-0 bg-background/80 !backdrop-blur-xl"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm  border-l border-primary/20 p-8"
            >
              <div className="flex flex-col gap-6 -20">
                <div className="flex justify-between">
                  {/* CTA Button */}
                  {/* Logo */}
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center gap-3 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="">
                      <h3 className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Abdul Tawab
                      </h3>
                      <p className="text-xs text-white">Web Developer</p>
                    </div>
                  </motion.button>

                  {/* Mobile Menu Button */}
                  <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="xl:!hidden w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-primary" />
                  </motion.button>
                </div>
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-left p-4 rounded-xl border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-lg font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all">
                      {link.label}
                    </span>
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-gradient-to-r from-primary h-auto !text-lg !py-3 to-secondary hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}