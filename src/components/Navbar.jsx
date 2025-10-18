import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-all duration-200 block md:inline-block"
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-all duration-200 block md:inline-block"
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        to="/services"
        className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-all duration-200 block md:inline-block"
        onClick={closeMenu}
      >
        Services
      </Link>
      <Link
        to="/testimonials"
        className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 text-sm font-medium rounded-full hover:bg-white transition-all duration-200 block md:inline-block"
        onClick={closeMenu}
      >
        Testimonials
      </Link>
      <Link
        to="/contact"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 mt-2 md:mt-0 md:ml-2 block md:inline-block text-center shadow-sm hover:shadow-md"
        onClick={closeMenu}
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <nav className="fixed top-2 sm:top-4 left-2 right-2 sm:left-4 sm:right-4 bg-white rounded-2xl sm:rounded-full shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gray-900 rounded-full px-3 sm:px-4 lg:px-6 py-2 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Thapovan
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-full px-2 lg:px-4 py-1">
            {navLinks}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 transition-all duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 sm:px-4 pt-2 pb-3">
          <div className="flex flex-col space-y-1 p-3 sm:p-4 bg-gray-50 rounded-xl">
            {navLinks}
          </div>
        </div>
      </div>
    </nav>
  );
}
