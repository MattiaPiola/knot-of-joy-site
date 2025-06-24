
import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "date-venue", label: "Quando e Dove" },
    { id: "parking", label: "Parcheggio" },
    { id: "party", label: "Ricevimento" },
    { id: "gifts", label: "Regali" },
    { id: "rsvp", label: "RSVP" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
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
                className={`font-inter font-medium transition-all duration-300 hover:text-wedding-brick ${
                  activeSection === item.id
                    ? "text-wedding-brick"
                    : isScrolled
                    ? "text-gray-700"
                    : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button className={`text-2xl ${isScrolled ? "text-gray-700" : "text-white"}`}>
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
