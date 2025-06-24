
import { useState } from "react";
import { Search, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RsvpSection = () => {
  const [guestName, setGuestName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!guestName.trim()) {
      toast({
        title: "Inserisci il tuo nome",
        description: "Abbiamo bisogno del tuo nome per trovare i dettagli del tuo invito.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call - this will be replaced with actual Supabase integration
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Connessione Supabase Richiesta",
        description: "Collega Supabase per abilitare la funzionalità RSVP.",
        variant: "destructive",
      });
    }, 1000);
  };

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            RSVP
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Vi preghiamo di farci sapere se potete unirvi a noi nel nostro giorno speciale. Non vediamo l'ora di festeggiare con voi!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-wedding-cream/50 p-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="bg-wedding-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-wedding-gold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                Trova il Tuo Invito
              </h3>
              <p className="font-inter text-gray-600">
                Inserisci il tuo nome per visualizzare i dettagli del tuo invito e confermare la partecipazione
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="font-inter font-medium text-gray-700 block mb-2">
                  Il Tuo Nome
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Inserisci nome e cognome"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent font-inter"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-wedding-gold text-white font-inter font-medium py-3 px-6 rounded-lg hover:bg-wedding-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "Cercando..." : "Trova il Mio Invito"}
              </button>
            </div>

            <div className="mt-8 p-4 bg-white rounded-lg border border-wedding-gold/20">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-wedding-gold" />
                <span className="font-inter font-medium text-gray-800">
                  Scadenza RSVP: 10 Ottobre 2024
                </span>
              </div>
              <p className="font-inter text-sm text-gray-600">
                Vi preghiamo di rispondere entro il 10 ottobre per aiutarci a finalizzare il conteggio degli ospiti. 
                Se avete restrizioni alimentari o richieste speciali, includetele nella vostra risposta.
              </p>
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-inter text-sm text-red-700">
                <strong>Configurazione Richiesta:</strong> La funzionalità RSVP richiede l'integrazione con Supabase. 
                Collega Supabase per abilitare la ricerca degli ospiti e le funzioni di conferma RSVP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
