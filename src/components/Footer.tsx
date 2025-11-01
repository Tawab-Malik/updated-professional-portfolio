import { Sparkles, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative border-t border-border/50 py-12 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Abdul Tawab
                </h3>
                <p className="text-xs text-muted-foreground"> Web Developer</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Building intelligent web solutions that transform businesses with cutting-edge AI and
              modern technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1"
          >
            <h4 className="mb-4 font-medium">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() =>
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })
                  }
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  whileHover={{ x: 5, color: "#38BDF8" }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <h4 className="mb-4 font-medium">Ready to Get Started?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Let's discuss your project and build something amazing together.
            </p>
            <motion.button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 hover:border-primary/50 transition-all text-sm font-medium"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Abdul Tawab. All rights reserved.
            
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
            className="w-10 h-10 rounded-full bg-card border border-primary/20 hover:border-primary/50 flex items-center justify-center group transition-all"
          >
            <ArrowUp className="w-5 h-5 text-primary group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div
        className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-primary/50"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-10 right-20 w-1.5 h-1.5 rounded-full bg-secondary/50"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </footer>
  );
}
