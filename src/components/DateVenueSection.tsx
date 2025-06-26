
import { MapPin, Clock, Calendar } from "lucide-react";

const DateVenueSection = () => {
  return (
    <section id="date-venue" className="py-20 bg-gradient-to-br from-wedding-dust/90 to-wedding-brick/80">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Quando e Dove
          </h2>
          <div className="w-24 h-px bg-wedding-cream mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center bg-wedding-cream p-8 rounded-lg shadow-xl border-2 border-wedding-brick/20">
            <Calendar className="w-12 h-12 text-wedding-brick mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-wedding-brick mb-4">
              Cerimonia Religiosa
            </h3>
            
            <div className="space-y-3 font-inter text-wedding-dust">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Sabato, 25 Ottobre 2025</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>10:30</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Basilica di San Magno</span>
              </div>
              
              <p className="text-sm font-medium">
                Legnano
              </p>
            </div>
          </div>

          <div className="text-center bg-wedding-cream p-8 rounded-lg shadow-xl border-2 border-wedding-dust/20">
            <MapPin className="w-12 h-12 text-wedding-dust mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-wedding-dust mb-4">
              Ricevimento
            </h3>
            
            <div className="space-y-3 font-inter text-wedding-brick">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>13:30 - 23:00</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Cascina Galizia</span>
              </div>
              
              <p className="text-sm font-medium">
                Cuggiono
              </p>
              
              <p className="text-xs mt-4 bg-wedding-light/50 p-3 rounded">
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
