import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
      staggerChildren: 0.2,
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

export default function About() {
  const features = [
    {
      icon: "🕉️",
      title: "Ancient Heritage",
      description:
        "Over 1000 years of spiritual legacy, dating back to 1025 AD, preserving sacred traditions and wisdom.",
    },
    {
      icon: "🌿",
      title: "Sacred Grounds",
      description:
        "Nestled in serene natural surroundings, our temple offers a peaceful sanctuary for meditation and reflection.",
    },
    {
      icon: "✨",
      title: "Divine Energy",
      description:
        "Experience the powerful spiritual vibrations that have attracted seekers and devotees for centuries.",
    },
    {
      icon: "📜",
      title: "Eternal Wisdom",
      description:
        "Learn from ancient scriptures and teachings passed down through generations of spiritual masters.",
    },
  ];

  const milestones = [
    { year: "1025 AD", event: "Temple Foundation" },
    { year: "1450 AD", event: "Major Renovation" },
    { year: "1875 AD", event: "Cultural Heritage Site" },
    { year: "2020 AD", event: "Digital Preservation" },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#628141' }}>
                Our Story
              </h2>
              <div className="space-y-4" style={{ color: '#4a5568' }}>
                <p className="text-lg leading-relaxed">
                  Tapovan stands as a testament to centuries of spiritual devotion and cultural heritage.
                  Founded in 1025 AD, our sacred temple has been a beacon of light for seekers of truth
                  and divine wisdom.
                </p>
                <p className="text-lg leading-relaxed">
                  Through the ages, this hallowed ground has witnessed countless prayers, meditations,
                  and spiritual awakenings. The ancient walls echo with the chants of devotees and the
                  profound silence of deep meditation.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we continue this timeless tradition, welcoming all who seek peace, enlightenment,
                  and connection with the divine.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://api.imghippo.com/files/hZvg8626PEg.jpg"
                  alt="Temple"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(230, 126, 34, 0.2), rgba(98, 129, 65, 0.2))' }}></div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      {/* Features Section */}
      <div className="py-20" style={{ backgroundColor: '#f7fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#628141' }}>
              What Makes Us Special
            </h2>
            <p className="text-xl" style={{ color: '#718096' }}>
              Discover the pillars of our spiritual heritage
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center border-2 transition-all duration-300"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8BAE66'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <motion.div
                  className="text-6xl mb-4"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#E67E22' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#718096' }}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#628141' }}>
            Our Journey Through Time
          </h2>
          <p className="text-xl" style={{ color: '#718096' }}>
            Milestones in our spiritual legacy
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
            style={{ backgroundColor: '#8BAE66' }}
          ></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col`}
              >
                <div className="flex-1 md:text-right md:pr-8 md:pl-0 text-center mb-4 md:mb-0">
                  {index % 2 === 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: '#E67E22' }}>
                        {milestone.year}
                      </h3>
                      <p className="text-lg" style={{ color: '#718096' }}>
                        {milestone.event}
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: '#628141' }}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </motion.div>
                </div>

                <div className="flex-1 md:text-left md:pl-8 md:pr-0 text-center mt-4 md:mt-0">
                  {index % 2 !== 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: '#E67E22' }}>
                        {milestone.year}
                      </h3>
                      <p className="text-lg" style={{ color: '#718096' }}>
                        {milestone.event}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20" style={{ backgroundColor: '#628141' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Begin Your Spiritual Journey
            </h2>
            <p className="text-xl mb-8" style={{ color: '#EBD5AB' }}>
              Join us in experiencing the divine presence and ancient wisdom that has
              guided countless souls to enlightenment.
            </p>
            <motion.button
              className="px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
              style={{ backgroundColor: '#E67E22', color: 'white' }}
              whileHover={{ scale: 1.05, backgroundColor: '#d67118' }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Us Today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
