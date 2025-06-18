import { useEffect, useState } from "react";

/**
 * Navbar component for the website.
 *
 * This component renders the navigation menu for the website. It includes
 * links to the different sections of the website, as well as a toggle button
 * for the dark mode.
 *
 * The component uses the `useState` hook to keep track of the current section
 * and whether the menu is open or not. It also uses the `useEffect` hook to
 * update the current section when the URL hash changes.
 *
 * The component renders a desktop menu and a mobile menu. The desktop menu
 * is displayed when the window is wider than 768px, and the mobile menu is
 * displayed when the window is narrower than 768px. The mobile menu is
 * displayed as a dropdown menu when the toggle button is clicked.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the current hash from the URL (without the #)
  const getCurrentSection = () => {
    return window.location.hash.substring(1) || "about";
  };

  const [activeSection, setActiveSection] = useState(getCurrentSection());

  // Update active section when URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(getCurrentSection());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle smooth scrolling and update active section when clicking a link
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setIsMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL without page reload
      window.history.pushState(null, "", `#${sectionId}`);

      // Smooth scroll to the section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to determine active link
  const isActive = (section) => {
    return activeSection === section
      ? "bg-blue-100/80 text-blue-800"
      : "text-blue-700 hover:bg-blue-100/60 hover:text-blue-900";
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-5xl z-50 bg-white rounded-2xl shadow-lg flex items-center justify-between px-6 py-3">
      <div className="flex items-center">
        <a
          href="#"
          className="text-2xl font-signature font-bold text-blue-700 tracking-tight drop-shadow-md"
        >
          Ayman
        </a>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex md:items-center md:space-x-6">
        <a
          href="#about"
          className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive(
            "about"
          )}`}
        >
          About
        </a>
        <a
          href="#portfolio"
          className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive(
            "portfolio"
          )}`}
        >
          Portfolio
        </a>
        <a
          href="#nonprofit"
          className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive(
            "nonprofit"
          )}`}
        >
          Nonprofit
        </a>
        <a
          href="#books"
          className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive(
            "books"
          )}`}
        >
          Books
        </a>
        <a
          href="#awards"
          className={`px-3 py-2 text-sm font-medium rounded-md transition ${isActive(
            "awards"
          )}`}
        >
          Awards
        </a>
        <a
          href="#contact"
          className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg hover:from-blue-700 hover:to-blue-500 border-2 border-blue-400 transition-all"
        >
          Contact
        </a>
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-blue-700 hover:text-blue-900 hover:bg-blue-100/40 focus:outline-none"
        >
          <svg
            className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white/80 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg flex flex-col items-center py-4 z-50">
          <a
            href="#about"
            className={`block px-3 py-2 text-base font-medium rounded-md transition ${isActive(
              "about"
            )}`}
            onClick={(e) => handleNavClick("about", e)}
          >
            About
          </a>
          <a
            href="#portfolio"
            className={`block px-3 py-2 text-base font-medium rounded-md transition ${isActive(
              "portfolio"
            )}`}
            onClick={(e) => handleNavClick("portfolio", e)}
          >
            Portfolio
          </a>
          <a
            href="#nonprofit"
            className={`block px-3 py-2 text-base font-medium rounded-md transition ${isActive(
              "nonprofit"
            )}`}
            onClick={(e) => handleNavClick("nonprofit", e)}
          >
            Nonprofit
          </a>
          <a
            href="#books"
            className={`block px-3 py-2 text-base font-medium rounded-md transition ${isActive(
              "books"
            )}`}
            onClick={(e) => handleNavClick("books", e)}
          >
            Books
          </a>
          <a
            href="#awards"
            className={`block px-3 py-2 text-base font-medium rounded-md transition ${isActive(
              "awards"
            )}`}
            onClick={(e) => handleNavClick("awards", e)}
          >
            Awards
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 text-base font-semibold rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg border-2 border-blue-400 mt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
