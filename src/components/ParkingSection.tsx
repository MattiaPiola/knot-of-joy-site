
import { Car, MapPin } from "lucide-react";

const ParkingSection = () => {
  const parkingSpots = [
    {
      name: "Piazza San Magno",
      description: "Sagrato della Basilica di San Magno",
      spaces: "1 posto",
      distance: "0 min a piedi",
      note: "Riservato alla sposa 😁"
    },
    {
      name: "Parcheggio Via Girardelli",
      description: "Via Girardelli, dietro la Polizia",
      spaces: "350 posti",
      distance: "2 min a piedi",
      note: "A pagamento"
    }
  ];

  return (
    <section id="parking" className="py-20 bg-gradient-to-br from-wedding-cream to-wedding-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-wedding-brick mb-4">
            Informazioni Parcheggio
          </h2>
          <div className="w-24 h-px bg-wedding-dust mx-auto mb-6"></div>
          <p className="font-inter text-lg text-wedding-dust max-w-2xl mx-auto">
            Abbiamo organizzato diverse opzioni di parcheggio comode vicino alla Basilica di San Magno.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {parkingSpots.map((spot, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-wedding-brick hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-wedding-dust p-3 rounded-full">
                  <Car className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-playfair text-xl font-bold text-wedding-brick mb-2">
                    {spot.name}
                  </h3>
                  
                  <div className="space-y-2 font-inter text-sm text-wedding-dust">
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
                      <div className="mt-3 p-2 bg-wedding-brick/10 border border-wedding-brick/20 rounded text-xs">
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
