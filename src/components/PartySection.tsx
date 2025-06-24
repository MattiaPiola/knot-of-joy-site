
import { Clock, Music, Utensils, Cake } from "lucide-react";

const PartySection = () => {
  const timeline = [
    {
      time: "13:30",
      event: "Pranzo",
      description: "Menu completo di tre portate",
      icon: <Utensils className="w-5 h-5" />,
      color: "wedding-brick"
    },
    {
      time: "16:30",
      event: "Taglio della Torta",
      description: "Il momento più dolce della giornata",
      icon: <Cake className="w-5 h-5" />,
      color: "wedding-dust"
    },
    {
      time: "17:00",
      event: "Musica e Balli",
      description: "Intrattenimento musicale e pista da ballo",
      icon: <Music className="w-5 h-5" />,
      color: "wedding-brick"
    },
    {
      time: "23:00",
      event: "Saluti",
      description: "Ultimi balli e arrivederci",
      icon: <Music className="w-5 h-5" />,
      color: "wedding-dust"
    }
  ];

  return (
    <section id="party" className="py-20 bg-gradient-to-br from-wedding-brick/90 to-wedding-dust/80">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Dettagli del Ricevimento
          </h2>
          <div className="w-24 h-px bg-wedding-cream mx-auto mb-6"></div>
          <p className="font-inter text-lg text-wedding-cream max-w-2xl mx-auto">
            Unitevi a noi per una giornata di celebrazione, cibo delizioso e musica alla Cascina Galizia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-wedding-cream p-8 rounded-lg shadow-xl">
            <h3 className="font-playfair text-2xl font-bold text-wedding-brick mb-8">
              Programma della Giornata
            </h3>
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`bg-${item.color} p-3 rounded-full text-white`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className={`font-inter font-bold text-${item.color}`}>
                        {item.time}
                      </span>
                      <span className="font-playfair text-lg font-medium text-wedding-dust">
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
            <div className="bg-wedding-cream p-6 rounded-lg shadow-xl border-2 border-wedding-dust/20">
              <h3 className="font-playfair text-2xl font-bold text-wedding-dust mb-4">
                Informazioni sulla Location
              </h3>
              
              <div className="space-y-4 font-inter text-wedding-brick">
                <div>
                  <strong className="text-wedding-dust">Dove:</strong><br />
                  Cascina Galizia<br />
                  Cuggiono
                </div>
                
                <div>
                  <strong className="text-wedding-dust">Parcheggio:</strong><br />
                  Parcheggio disponibile in loco
                </div>
              </div>
            </div>

            <div className="bg-wedding-cream p-6 rounded-lg shadow-xl border-2 border-wedding-brick/20">
              <h3 className="font-playfair text-xl font-bold text-wedding-brick mb-4">
                Mappa
              </h3>
              <div className="bg-wedding-light h-32 rounded-lg flex items-center justify-center border-2 border-wedding-dust/20">
                <p className="font-inter text-wedding-dust text-center">
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
