
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DateVenueSection from "@/components/DateVenueSection";
import ParkingSection from "@/components/ParkingSection";
import PartySection from "@/components/PartySection";
import GiftSection from "@/components/GiftSection";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

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

  return (
    <div className="min-h-screen bg-wedding-cream">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <DateVenueSection />
      <ParkingSection />
      <PartySection />
      <GiftSection />
      <RsvpSection />
      <Footer />
    </div>
  );
};

export default Index;
