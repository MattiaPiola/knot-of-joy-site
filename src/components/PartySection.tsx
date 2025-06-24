
import { Clock, Music, Utensils, Cake } from "lucide-react";

const PartySection = () => {
  const timeline = [
    {
      time: "13:30",
      event: "Pranzo",
      description: "Menu completo di tre portate",
      icon: <Utensils className="w-5 h-5" />
    },
    {
      time: "16:30",
      event: "Taglio della Torta",
      description: "Il momento più dolce della giornata",
      icon: <Cake className="w-5 h-5" />
    },
    {
      time: "17:00",
      event: "Musica e Balli",
      description: "Intrattenimento musicale e pista da ballo",
      icon: <Music className="w-5 h-5" />
    },
    {
      time: "23:00",
      event: "Saluti",
      description: "Ultimi balli e arrivederci",
      icon: <Music className="w-5 h-5" />
    }
  ];

  return (
    <section id="party" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Dettagli del Ricevimento
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Unitevi a noi per una giornata di celebrazione, cibo delizioso e musica alla Cascina Galizia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-8">
              Programma della Giornata
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
                Informazioni sulla Location
              </h3>
              
              <div className="space-y-4 font-inter text-gray-600">
                <div>
                  <strong className="text-gray-800">Dove:</strong><br />
                  Cascina Galizia<br />
                  Cuggiono
                </div>
                
                <div>
                  <strong className="text-gray-800">Capienza:</strong><br />
                  150 ospiti in un ambiente elegante
                </div>
                
                <div>
                  <strong className="text-gray-800">Servizi:</strong><br />
                  • Servizio bar completo<br />
                  • DJ professionale e impianto audio<br />
                  • Pista da ballo con luci d'atmosfera<br />
                  • Area foto<br />
                  • Guardaroba disponibile
                </div>
              </div>
            </div>

            <div className="bg-wedding-sage/20 p-6 rounded-lg">
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                Mappa
              </h3>
              <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <p className="font-inter text-gray-600 text-center">
                  Mappa di Cascina Galizia, Cuggiono<br />
                  <small>Da implementare con servizio mappe</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartySection;
