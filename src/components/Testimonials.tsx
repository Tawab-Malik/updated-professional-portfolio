import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      location: "San Francisco, USA",
      content:
        "Tawab delivered an exceptional AI-powered web app that exceeded our expectations. The automation features alone saved us 20+ hours per week. His expertise in Next.js and AI integration is truly impressive.",
      rating: 5,
      avatar: "SJ",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Marcus Weber",
      role: "Product Manager, InnovateLab",
      location: "Berlin, Germany",
      content:
        "Working with Tawab was a game-changer for our business. He transformed our complex requirements into a sleek, fast, and intelligent web application. Communication was excellent throughout the project.",
      rating: 5,
      avatar: "MW",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "James Mitchell",
      role: "Founder, CloudSync Solutions",
      location: "London, UK",
      content:
        "Outstanding work! Tawab built us a custom automation tool that integrates seamlessly with our existing systems. The ROI was immediate, and his ongoing support has been fantastic.",
      rating: 5,
      avatar: "JM",
      color: "from-primary to-secondary",
    },
  ];

  return (
    <section id="testimonials" className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full !blur-2xl" />
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
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary backdrop-blur-sm">
              Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl md:!text-6xl !font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
              Client Success Stories
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it — hear from satisfied clients around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />

              <div className="relative h-full bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300">
                {/* Quote icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className={`absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + 0.4 + i * 0.05,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Star className="w-5 h-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  className="text-muted-foreground mb-6 italic relative"
                >
                  "{testimonial.content}"
                </motion.p>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  className="flex items-center gap-4 pt-4 border-t border-border/50"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary mt-0.5">{testimonial.location}</p>
                  </div>
                </motion.div>

                {/* Decorative dots */}
                <motion.div
                  className="absolute bottom-4 right-4 flex gap-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-primary/50"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
