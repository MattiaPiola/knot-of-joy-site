
import { MapPin, Clock, Calendar } from "lucide-react";

const DateVenueSection = () => {
  return (
    <section id="date-venue" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Quando e Dove
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center bg-wedding-cream/50 p-8 rounded-lg">
            <Calendar className="w-12 h-12 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
              Cerimonia Religiosa
            </h3>
            
            <div className="space-y-3 font-inter text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Venerdì, 25 Ottobre 2024</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>10:30</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Basilica di San Magno</span>
              </div>
              
              <p className="text-sm">
                Legnano
              </p>
            </div>
          </div>

          <div className="text-center bg-wedding-sage/20 p-8 rounded-lg">
            <MapPin className="w-12 h-12 text-wedding-gold mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
              Ricevimento
            </h3>
            
            <div className="space-y-3 font-inter text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>13:30 - 23:00</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Cascina Galizia</span>
              </div>
              
              <p className="text-sm">
                Cuggiono
              </p>
              
              <p className="text-xs text-gray-500 mt-4">
                Pranzo ore 13:30<br />
                Taglio torta ore 16:30<br />
                Musica e balli a seguire
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateVenueSection;
