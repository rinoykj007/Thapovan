import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: "🪔",
      title: "Daily Poojas",
      description:
        "Experience the divine through our daily rituals performed by experienced priests following ancient Vedic traditions.",
      features: ["Morning Abhishekam", "Evening Aarti", "Special Archana"],
    },
    {
      icon: "🎋",
      title: "Special Ceremonies",
      description:
        "Sacred ceremonies for life's important milestones, conducted with devotion and authenticity.",
      features: ["Weddings", "Naming Ceremonies", "Anniversary Blessings"],
    },
    {
      icon: "🧘",
      title: "Meditation Sessions",
      description:
        "Guided meditation in our serene environment to help you find inner peace and spiritual clarity.",
      features: ["Morning Meditation", "Group Sessions", "Personal Guidance"],
    },
    {
      icon: "📿",
      title: "Spiritual Counseling",
      description:
        "One-on-one sessions with our spiritual guides to help navigate life's challenges with wisdom.",
      features: ["Life Guidance", "Spiritual Direction", "Crisis Support"],
    },
    {
      icon: "📖",
      title: "Scripture Classes",
      description:
        "Learn the profound teachings of ancient texts through our structured educational programs.",
      features: ["Bhagavad Gita", "Upanishads", "Vedic Studies"],
    },
    {
      icon: "🎵",
      title: "Bhajan Sessions",
      description:
        "Join our devotional singing sessions that uplift the soul and create a divine atmosphere.",
      features: ["Weekly Bhajans", "Festival Kirtans", "Music Training"],
    },
  ];

  const specialServices = [
    {
      title: "Temple Visits",
      description: "Guided tours of our sacred grounds with historical insights",
      icon: "🏛️",
    },
    {
      title: "Prasad Distribution",
      description: "Sacred offerings blessed during daily rituals",
      icon: "🍃",
    },
    {
      title: "Festival Celebrations",
      description: "Grand celebrations of Hindu festivals throughout the year",
      icon: "🎉",
    },
    {
      title: "Charity Programs",
      description: "Community service and donation drives for the needy",
      icon: "💝",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Main Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#628141" }}>
            Sacred Offerings
          </h2>
          <p className="text-xl" style={{ color: "#E67E22" }}>
            Discover our range of spiritual services
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 group"
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#8BAE66")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <motion.div
                className="text-6xl mb-6"
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>

              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#E67E22" }}
              >
                {service.title}
              </h3>

              <p className="mb-6" style={{ color: "#718096" }}>
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm"
                    style={{ color: "#628141" }}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Special Services Section */}
      <div className="py-20" style={{ backgroundColor: "#f7fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#628141" }}>
              Additional Offerings
            </h2>
            <p className="text-xl" style={{ color: "#718096" }}>
              More ways to experience our spiritual community
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specialServices.map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer transition-all duration-300"
                style={{
                  borderBottom: "4px solid #E67E22",
                }}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#628141" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm" style={{ color: "#718096" }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#628141" }}>
            How to Book
          </h2>
          <p className="text-xl" style={{ color: "#718096" }}>
            Simple steps to begin your spiritual journey
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Choose Service",
              description:
                "Browse our offerings and select the service that resonates with your spiritual needs.",
            },
            {
              step: "02",
              title: "Book Online",
              description:
                "Schedule your preferred date and time through our simple online booking system.",
            },
            {
              step: "03",
              title: "Experience Divine",
              description:
                "Visit our sacred grounds and immerse yourself in the spiritual experience.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white"
                style={{ backgroundColor: "#E67E22" }}
              >
                {item.step}
              </div>

              {index < 2 && (
                <div
                  className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5"
                  style={{ backgroundColor: "#8BAE66" }}
                ></div>
              )}

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "#628141" }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#718096" }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
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
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl mb-8" style={{ color: "#EBD5AB" }}>
              Book your service today and experience the divine blessings that
              await you at our sacred temple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate("/booking")}
                className="px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
                style={{ backgroundColor: "#E67E22", color: "white" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
              <motion.button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 text-lg font-semibold rounded-full border-2"
                style={{ borderColor: "#EBD5AB", color: "#EBD5AB" }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(235, 213, 171, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
