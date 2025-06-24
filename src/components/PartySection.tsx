
import { Clock, Music, Utensils, Camera } from "lucide-react";

const PartySection = () => {
  const timeline = [
    {
      time: "5:00 PM",
      event: "Cocktail Hour",
      description: "Welcome drinks and hors d'oeuvres",
      icon: <Clock className="w-5 h-5" />
    },
    {
      time: "6:30 PM",
      event: "Dinner Service",
      description: "Three-course plated dinner",
      icon: <Utensils className="w-5 h-5" />
    },
    {
      time: "8:00 PM",
      event: "First Dance",
      description: "Sarah & Michael's special moment",
      icon: <Music className="w-5 h-5" />
    },
    {
      time: "8:30 PM",
      event: "Dancing & Celebration",
      description: "Open bar and DJ entertainment",
      icon: <Music className="w-5 h-5" />
    },
    {
      time: "10:30 PM",
      event: "Last Call",
      description: "Final songs and farewell",
      icon: <Camera className="w-5 h-5" />
    }
  ];

  return (
    <section id="party" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Reception Details
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for an evening of celebration, delicious food, and dancing at the Grand Ballroom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-8">
              Evening Timeline
            </h3>
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-wedding-gold/20 p-3 rounded-full">
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-inter font-bold text-wedding-gold">
                        {item.time}
                      </span>
                      <span className="font-playfair text-lg font-medium text-gray-800">
                        {item.event}
                      </span>
                    </div>
                    <p className="font-inter text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-wedding-cream/50 p-6 rounded-lg">
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
                Venue Information
              </h3>
              
              <div className="space-y-4 font-inter text-gray-600">
                <div>
                  <strong className="text-gray-800">Location:</strong><br />
                  Grand Ballroom<br />
                  456 Reception Avenue<br />
                  Celebration Hall, City 12345
                </div>
                
                <div>
                  <strong className="text-gray-800">Capacity:</strong><br />
                  150 guests in elegant ballroom setting
                </div>
                
                <div>
                  <strong className="text-gray-800">Amenities:</strong><br />
                  • Full bar service<br />
                  • Professional DJ and sound system<br />
                  • Dance floor with mood lighting<br />
                  • Photo booth area<br />
                  • Coat check available
                </div>
              </div>
            </div>

            <div className="bg-wedding-sage/20 p-6 rounded-lg">
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                Dress Code
              </h3>
              <p className="font-inter text-gray-600">
                Cocktail attire requested. We encourage guests to dress in celebration colors - 
                think warm earth tones, sage green, and gold accents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartySection;
