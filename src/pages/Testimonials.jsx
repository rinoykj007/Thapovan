import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Chennai",
      category: "pooja",
      rating: 5,
      text: "The morning abhishekam was a divine experience. The priests performed the rituals with such devotion and authenticity. I felt a deep spiritual connection throughout the ceremony.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Bangalore",
      category: "meditation",
      rating: 5,
      text: "The meditation sessions at Tapovan have transformed my life. The serene environment and expert guidance helped me find inner peace I never knew existed.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Anand Krishnan",
      location: "Kochi",
      category: "ceremony",
      rating: 5,
      text: "We had our daughter's naming ceremony here. The entire experience was beautifully organized, and the blessings we received felt truly special. Highly recommended!",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "Lakshmi Venkatesh",
      location: "Coimbatore",
      category: "pooja",
      rating: 5,
      text: "I've been attending the evening aarti for years. The spiritual energy here is unmatched. Every visit fills my heart with gratitude and peace.",
      date: "1 week ago",
    },
    {
      id: 5,
      name: "Suresh Iyer",
      location: "Mumbai",
      category: "classes",
      rating: 5,
      text: "The Bhagavad Gita classes have deepened my understanding of our scriptures. The teachers explain complex concepts with clarity and patience.",
      date: "2 months ago",
    },
    {
      id: 6,
      name: "Meena Rajan",
      location: "Hyderabad",
      category: "meditation",
      rating: 5,
      text: "A sacred space that truly lives up to its legacy. The guided meditation sessions are exceptional, and the peaceful atmosphere makes it easy to disconnect from worldly stress.",
      date: "1 month ago",
    },
  ];

  const categories = [
    { id: "all", label: "All Reviews" },
    { id: "pooja", label: "Poojas" },
    { id: "meditation", label: "Meditation" },
    { id: "ceremony", label: "Ceremonies" },
    { id: "classes", label: "Classes" },
  ];

  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  const stats = [
    { number: "1000+", label: "Happy Devotees" },
    { number: "500+", label: "Ceremonies Performed" },
    { number: "4.9", label: "Average Rating" },
    { number: "15+", label: "Years of Service" },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Main Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#628141" }}>
            What Devotees Say
          </h2>
          <p className="text-xl" style={{ color: "#718096" }}>
            Experiences shared by our spiritual community
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="px-5 py-2 rounded-full font-medium transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === category.id ? "#628141" : "#f7fafc",
                color: activeCategory === category.id ? "white" : "#718096",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-2 transition-colors duration-300"
                style={{ borderColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#8BAE66")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "transparent")
                }
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg
                    className="w-10 h-10"
                    style={{ color: "#E67E22" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      style={{ color: "#E67E22" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p className="mb-6 leading-relaxed" style={{ color: "#4a5568" }}>
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: "#628141" }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4
                        className="font-bold"
                        style={{ color: "#628141" }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-sm" style={{ color: "#718096" }}>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: "#a0aec0" }}>
                    {testimonial.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl" style={{ color: "#718096" }}>
              No testimonials found for this category.
            </p>
          </motion.div>
        )}
      </div>

      {/* Stats Section */}
      <div className="py-20" style={{ backgroundColor: "#f7fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#628141" }}>
              Our Impact
            </h2>
            <p className="text-xl" style={{ color: "#718096" }}>
              Numbers that reflect our dedication
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
                style={{ borderBottom: "4px solid #E67E22" }}
              >
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#E67E22" }}
                >
                  {stat.number}
                </div>
                <div className="font-medium" style={{ color: "#628141" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Testimonial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 w-full h-2"
            style={{ backgroundColor: "#628141" }}
          ></div>

          <div className="p-12 md:p-16 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-8"
              style={{ color: "#E67E22", opacity: 0.3 }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p
              className="text-2xl md:text-3xl leading-relaxed mb-8 font-light"
              style={{ color: "#4a5568" }}
            >
              "Tapovan is not just a temple; it's a spiritual home. Every visit reconnects me with my roots and fills my soul with divine energy. The priests, the atmosphere, the traditions - everything here speaks of authenticity and devotion."
            </p>

            <div className="flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: "#628141" }}
              >
                V
              </div>
              <div className="ml-4 text-left">
                <h4
                  className="text-xl font-bold"
                  style={{ color: "#628141" }}
                >
                  Dr. Venkataraman Pillai
                </h4>
                <p style={{ color: "#718096" }}>
                  Devotee since 1995 • Trivandrum
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="py-20" style={{ backgroundColor: "#628141" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Share Your Experience
            </h2>
            <p className="text-xl mb-8" style={{ color: "#EBD5AB" }}>
              We'd love to hear about your spiritual journey with us.
              Your story can inspire others on their path to enlightenment.
            </p>
            <motion.button
              className="px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
              style={{ backgroundColor: "#E67E22", color: "white" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Write a Review
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
