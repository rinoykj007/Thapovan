import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 bg-white rounded-full shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          {/* Logo or Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 rounded-full px-6 py-2 hover:bg-gray-50"
            >
              Thapovan
            </Link>
          </div>

          {/* Right-aligned menu items in a rounded container */}
          <div className="flex items-center bg-gray-50 rounded-full px-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-colors"
            >
              Services
            </Link>

            <Link
              to="/testimonials"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-colors"
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors ml-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
