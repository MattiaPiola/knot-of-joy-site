
import { useState } from "react";
import { Search, Users, Calendar, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Guest {
  id: number;
  name: string;
  surname: string;
  family_id: number;
  invite_type: string;
  confirmation_status: boolean;
}

const RsvpSection = () => {
  const [guestName, setGuestName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundGuests, setFoundGuests] = useState<Guest[]>([]);
  const [inviteType, setInviteType] = useState<string>("");
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
    
    try {
      const nameParts = guestName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      // Search for the guest
      let query = supabase
        .from('guests')
        .select('*');

      if (lastName) {
        query = query.or(`name.ilike.%${firstName}%,surname.ilike.%${lastName}%`);
      } else {
        query = query.or(`name.ilike.%${firstName}%,surname.ilike.%${firstName}%`);
      }

      const { data: searchResults, error: searchError } = await query;

      if (searchError) {
        throw searchError;
      }

      if (!searchResults || searchResults.length === 0) {
        toast({
          title: "Ospite non trovato",
          description: "Non riusciamo a trovare il tuo nome nella lista degli invitati. Verifica l'ortografia o contattaci.",
          variant: "destructive",
        });
        setFoundGuests([]);
        return;
      }

      // Get the first match and find all family members
      const mainGuest = searchResults[0];
      const { data: familyGuests, error: familyError } = await supabase
        .from('guests')
        .select('*')
        .eq('family_id', mainGuest.family_id);

      if (familyError) {
        throw familyError;
      }

      setFoundGuests(familyGuests || []);
      setInviteType(mainGuest.invite_type || '');
      
      toast({
        title: "Invito trovato!",
        description: `Ciao ${mainGuest.name}! Ecco i dettagli del tuo invito.`,
      });

    } catch (error) {
      console.error('Error searching for guest:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la ricerca. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmation = async (guestId: number, confirmed: boolean) => {
    try {
      const { error } = await supabase
        .from('guests')
        .update({ confirmation_status: confirmed })
        .eq('id', guestId);

      if (error) {
        throw error;
      }

      // Update local state
      setFoundGuests(prev => 
        prev.map(guest => 
          guest.id === guestId 
            ? { ...guest, confirmation_status: confirmed }
            : guest
        )
      );

      toast({
        title: confirmed ? "Partecipazione confermata!" : "Partecipazione rifiutata",
        description: confirmed 
          ? "Grazie per la conferma! Non vediamo l'ora di festeggiare con te." 
          : "Grazie per aver risposto. Ci dispiace che non potrai essere con noi.",
      });

    } catch (error) {
      console.error('Error updating confirmation:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiornamento. Riprova più tardi.",
        variant: "destructive",
      });
    }
  };

  const getInviteTypeLabel = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'lunch':
        return 'Pranzo completo';
      case 'cake':
        return 'Solo taglio torta';
      default:
        return 'Invito speciale';
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            RSVP
          </h2>
          <div className="w-24 h-px bg-wedding-brick mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Vi preghiamo di farci sapere se potete unirvi a noi nel nostro giorno speciale. Non vediamo l'ora di festeggiare con voi!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-wedding-cream/50 p-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="bg-wedding-brick/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-wedding-brick" />
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-brick focus:border-transparent font-inter"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-wedding-brick text-white font-inter font-medium py-3 px-6 rounded-lg hover:bg-wedding-brick/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "Cercando..." : "Trova il Mio Invito"}
              </button>
            </div>

            {foundGuests.length > 0 && (
              <div className="mt-8 p-6 bg-white rounded-lg border border-wedding-brick/20">
                <div className="mb-4">
                  <h4 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                    Dettagli Invito
                  </h4>
                  <div className="bg-wedding-dust/20 p-3 rounded-lg">
                    <p className="font-inter font-medium text-wedding-dust">
                      Tipo di invito: {getInviteTypeLabel(inviteType)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-inter font-medium text-gray-700">
                    Conferma partecipazione per:
                  </h5>
                  {foundGuests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-inter text-gray-800">
                        {guest.name} {guest.surname}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleConfirmation(guest.id, true)}
                          className={`p-2 rounded-full transition-colors ${
                            guest.confirmation_status === true
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleConfirmation(guest.id, false)}
                          className={`p-2 rounded-full transition-colors ${
                            guest.confirmation_status === false
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-white rounded-lg border border-wedding-brick/20">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-wedding-brick" />
                <span className="font-inter font-medium text-gray-800">
                  Scadenza RSVP: 10 Ottobre 2024
                </span>
              </div>
              <p className="font-inter text-sm text-gray-600">
                Vi preghiamo di rispondere entro il 10 ottobre per aiutarci a finalizzare il conteggio degli ospiti. 
                Se avete restrizioni alimentari o richieste speciali, includetele nella vostra risposta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
