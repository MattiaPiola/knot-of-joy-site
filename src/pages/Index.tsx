
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DateVenueSection from "@/components/DateVenueSection";
import ParkingSection from "@/components/ParkingSection";
import PartySection from "@/components/PartySection";
import GiftSection from "@/components/GiftSection";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const visibleSections = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "date-venue", "parking", "party", "gifts", "rsvp"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSectionClasses = (sectionId: string) => {
    const baseClasses = "transition-all duration-1000 ease-out transform";
    const isVisible = visibleSections.has(sectionId);
    
    return `${baseClasses} ${
      isVisible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-16"
    }`;
  };

  return (
    <div className="min-h-screen bg-wedding-cream">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <section id="date-venue" className={getSectionClasses("date-venue")}>
        <DateVenueSection />
      </section>
      <section id="parking" className={getSectionClasses("parking")}>
        <ParkingSection />
      </section>
      <section id="party" className={getSectionClasses("party")}>
        <PartySection />
      </section>
      <section id="gifts" className={getSectionClasses("gifts")}>
        <GiftSection />
      </section>
      <section id="rsvp" className={getSectionClasses("rsvp")}>
        <RsvpSection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
