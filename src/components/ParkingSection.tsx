
import { Car, MapPin } from "lucide-react";

const ParkingSection = () => {
  const parkingSpots = [
    {
      name: "Parcheggio Basilica",
      description: "Parcheggio principale della Basilica di San Magno",
      spaces: "30 posti",
      distance: "0 min a piedi",
      note: "Riservato agli ospiti della cerimonia"
    },
    {
      name: "Parcheggio Via Volta",
      description: "Via Alessandro Volta, 2 isolati dalla basilica",
      spaces: "50 posti",
      distance: "3 min a piedi",
      note: "Gratuito nei giorni festivi"
    },
    {
      name: "Parcheggio Strada",
      description: "Via San Magno e strade limitrofe",
      spaces: "Limitato",
      distance: "1-5 min a piedi",
      note: "Controllare la segnaletica per i limiti orari"
    },
    {
      name: "Parcheggio Centro",
      description: "Piazza San Magno, centro di Legnano",
      spaces: "40 posti",
      distance: "5 min a piedi",
      note: "Disponibile dopo le 9:00"
    }
  ];

  return (
    <section id="parking" className="py-20 bg-wedding-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Informazioni Parcheggio
          </h2>
          <div className="w-24 h-px bg-wedding-brick mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Abbiamo organizzato diverse opzioni di parcheggio comode vicino alla Basilica di San Magno.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {parkingSpots.map((spot, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-wedding-brick/20 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-wedding-dust/20 p-3 rounded-full">
                  <Car className="w-6 h-6 text-wedding-brick" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                    {spot.name}
                  </h3>
                  
                  <div className="space-y-2 font-inter text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{spot.description}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Capacità:</span>
                      <span>{spot.spaces}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Tempo a piedi:</span>
                      <span>{spot.distance}</span>
                    </div>
                    
                    {spot.note && (
                      <div className="mt-3 p-2 bg-wedding-light/50 rounded text-xs">
                        <strong>Nota:</strong> {spot.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParkingSection;
