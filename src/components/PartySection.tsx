import { Clock, Music, Utensils, Cake } from "lucide-react";

const PartySection = () => {
  const timeline = [
    {
      time: "13:30",
      event: "Pranzo",
      description: "Se magna",
      icon: <Utensils className="w-5 h-5" />,
      color: "wedding-brick"
    },
    {
      time: "16:45",
      event: "Taglio della Torta",
      description: "Se magna di nuovo",
      icon: <Cake className="w-5 h-5" />,
      color: "wedding-dust"
    },
    {
      time: "17:30",
      event: "Festa",
      description: "Intrattenimento musicale a cura del Gerenza Group",
      icon: <Music className="w-5 h-5" />,
      color: "wedding-brick"
    },
    {
      time: "20:00",
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
            Unitevi a noi per fare festa!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Colonna info e mappa */}
          <div className="lg:col-span-3 flex flex-col space-y-8 order-2 lg:order-1">
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
              <div className="bg-wedding-light rounded-lg flex items-center justify-center border-2 border-wedding-dust/20">
                <iframe
                  title="Cascina Galizia Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.073238373889!2d8.81312331556755!3d45.50712397910137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867e7e7e7e7e7e%3A0x1234567890abcdef!2sCascina%20Galizia!5e0!3m2!1sit!2sit!4v1710000000000!5m2!1sit!2sit"
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: "0.5rem", minHeight: "180px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Colonna programma */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-wedding-cream p-6 md:p-8 rounded-lg shadow-xl h-full flex flex-col">
              <h3 className="font-playfair text-2xl font-bold text-wedding-brick mb-6">
                Programma della Giornata
              </h3>
              <div className="space-y-6 flex-1">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartySection;
