
import { MapPin, Clock, Calendar } from "lucide-react";

const DateVenueSection = () => {
  return (
    <section id="date-venue" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            When & Where
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center bg-wedding-cream/50 p-8 rounded-lg">
            <Calendar className="w-12 h-12 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
              Wedding Ceremony
            </h3>
            
            <div className="space-y-3 font-inter text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Saturday, June 15th, 2024</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>2:00 PM</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>St. Mary's Church</span>
              </div>
              
              <p className="text-sm">
                123 Church Street<br />
                Downtown, City 12345
              </p>
            </div>
          </div>

          <div className="text-center bg-wedding-sage/20 p-8 rounded-lg">
            <MapPin className="w-12 h-12 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
              Reception
            </h3>
            
            <div className="space-y-3 font-inter text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>5:00 PM - 11:00 PM</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Grand Ballroom</span>
              </div>
              
              <p className="text-sm">
                456 Reception Avenue<br />
                Celebration Hall, City 12345
              </p>
              
              <p className="text-xs text-gray-500 mt-4">
                Cocktail hour begins at 5:00 PM<br />
                Dinner served at 6:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateVenueSection;
