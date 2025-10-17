import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
        alt="Cleaning"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay for darken effect */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Gradient Card */}
      <div
        className="relative z-20 mt-24 ml-12 rounded-2xl p-8 max-w-md shadow-xl"
        style={{
          background: "linear-gradient(90deg, #e0ff57 0%, #00ffb2 100%)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
          Bringing Brilliance to Every Home
        </h2>
        <button
          onClick={() => navigate("/booking")}
          className="mt-4 px-6 py-3 bg-black/70 text-white font-medium rounded-lg shadow hover:bg-black transition"
        >
          Book Your Today <span className="ml-2">→</span>
        </button>
      </div>

      {/* Large text overlay */}
      <div className="absolute left-0 bottom-0 z-10 w-full select-none pointer-events-none">
        <span
          className="text-[8vw] font-extrabold text-white/80 leading-none pl-8"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.2)" }}
        >
          Sevabhav
        </span>
      </div>
    </div>
  );
}
