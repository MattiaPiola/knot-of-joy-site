import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.clientHeight : 0;
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "date-venue", label: "Quando e Dove" },
    { id: "parking", label: "Parcheggio" },
    { id: "party", label: "Ricevimento" },
    { id: "gifts", label: "Regalo" },
    { id: "rsvp", label: "RSVP" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div
            className="cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img
              src="/lovable-uploads/d7cda7b5-b1ec-4669-aeeb-043e88557d72.png"
              alt="F & M"
              className="h-12 w-auto"
            />
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-inter font-medium transition-all duration-300 hover:text-wedding-dust ${
                  activeSection === item.id
                    ? "text-wedding-dust"
                    : isScrolled
                    ? "text-gray-700"
                    : "text-white drop-shadow-lg"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              className={`text-2xl ${
                isScrolled ? "text-gray-700" : "text-white drop-shadow-lg"
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Apri menu"
            >
              ☰
            </button>
            {mobileMenuOpen && (
              <>
                {/* Overlay (semi-transparent, covers page) */}
                <div
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Chiudi menu"
                />
                {/* Sidebar (solid background) */}
                <div className="fixed top-0 right-0 h-full w-72 z-50 bg-white opacity-100 shadow-lg flex flex-col items-center pt-24">
                  <button
                    className="absolute top-6 right-6 text-3xl text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Chiudi menu"
                  >
                    ×
                  </button>
                  <nav className="flex flex-col gap-8 w-full items-center">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-2xl font-inter font-medium w-full text-left px-8 py-2 ${
                          activeSection === item.id
                            ? "text-wedding-dust"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
