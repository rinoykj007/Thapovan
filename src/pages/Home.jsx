import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 h-screen flex items-center">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-block px-4 py-1.5 bg-emerald-500/10 rounded-full mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="text-emerald-400 text-sm font-medium">
                  Sacred Grounds Since 1025 AD
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Discover the{" "}
                <span className="text-emerald-400">Divine Essence</span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-md mx-auto lg:mx-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                A sacred sanctuary where ancient wisdom meets spiritual
                awakening. Walk the paths of sages and seekers who found
                enlightenment.
              </motion.p>

              <motion.div
                className="flex gap-4 justify-center lg:justify-start"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => navigate("/booking")}
                  className="relative px-6 py-3 bg-emerald-500 text-white font-medium rounded-full overflow-hidden group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Begin Your Journey
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>

                <motion.button
                  onClick={() => {}}
                  className="px-6 py-3 text-gray-300 font-medium rounded-full border border-gray-700 hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="relative z-10 w-72 h-72 mx-auto rounded-full overflow-hidden border-4 border-emerald-400/30 shadow-2xl transform rotate-3">
                  <img
                    src="https://api.imghippo.com/files/hZvg8626PEg.jpg"
                    alt="Spiritual Mandala"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: "center",
                      filter: "brightness(1.05) contrast(1.1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-purple-500/10 rounded-full"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 -right-8 w-16 h-1 bg-gradient-to-l from-emerald-400/30 to-transparent rounded-full transform -rotate-45"></div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { number: "1000+", label: "Years of Legacy", icon: "🕉️" },
              { number: "Sacred", label: "Grounds", icon: "🌿" },
              { number: "Divine", label: "Energy", icon: "✨" },
              { number: "Eternal", label: "Wisdom", icon: "📜" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm p-4 rounded-xl text-center border border-white/5 hover:border-emerald-400/20 transition-all duration-300"
                whileHover={{
                  y: -4,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-emerald-400">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
