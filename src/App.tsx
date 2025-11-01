import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { CustomCursor } from "./components/ui/custom-cursor";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth scroll setup
    gsap.config({
      force3D: true,
    });

    // Kill all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}