
import { useState } from "react";
import { Search, Users, Calendar, Check, X, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

interface Guest {
  id: number;
  name: string;
  surname: string;
  family_id: number;
  invite_type: string;
  confirmation_status: boolean;
  notes: string;
}

const RsvpSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundGuests, setFoundGuests] = useState<Guest[]>([]);
  const [inviteType, setInviteType] = useState<string>("");
  const [guestNotes, setGuestNotes] = useState<{[key: number]: string}>({});
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Inserisci nome e cognome",
        description: "Abbiamo bisogno del tuo nome e cognome completi per trovare i dettagli del tuo invito.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      
      console.log('Searching for:', { firstName: trimmedFirstName, lastName: trimmedLastName });
      
      // Try exact match first
      let { data: results, error } = await supabase
        .from('guests')
        .select('*')
        .eq('name', trimmedFirstName)
        .eq('surname', trimmedLastName);

      console.log('Exact search results:', results);

      // If no exact match, try case-insensitive search
      if (!results || results.length === 0) {
        console.log('Trying case-insensitive search...');
        
        ({ data: results, error } = await supabase
          .from('guests')
          .select('*')
          .ilike('name', trimmedFirstName)
          .ilike('surname', trimmedLastName));
        
        console.log('Case-insensitive search results:', results);
      }

      if (error) {
        console.error('Search error:', error);
        throw error;
      }

      if (results && results.length > 0) {
        const mainGuest = results[0];
        console.log('Main guest found:', mainGuest);
        
        // Get family members
        const { data: familyGuests, error: familyError } = await supabase
          .from('guests')
          .select('*')
          .eq('family_id', mainGuest.family_id);

        if (familyError) {
          console.error('Family search error:', familyError);
          throw familyError;
        }

        console.log('Family guests:', familyGuests);

        setFoundGuests(familyGuests || []);
        setInviteType(mainGuest.invite_type || '');
        
        // Initialize notes state
        const notesMap: {[key: number]: string} = {};
        familyGuests?.forEach(guest => {
          notesMap[guest.id] = guest.notes || '';
        });
        setGuestNotes(notesMap);
        
        toast({
          title: "Invito trovato!",
          description: `Ciao ${mainGuest.name}! Ecco i dettagli del tuo invito.`,
        });
        
        return;
      }

      // No matches found
      console.log('No matches found');
      toast({
        title: "Ospite non trovato",
        description: `Non riusciamo a trovare "${trimmedFirstName} ${trimmedLastName}" nella lista degli invitati. Verifica l'ortografia o contattaci.`,
        variant: "destructive",
      });
      setFoundGuests([]);

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
      const notes = guestNotes[guestId] || '';
      
      console.log('Updating guest:', { guestId, confirmed, notes });
      
      const { error } = await supabase
        .from('guests')
        .update({ 
          confirmation_status: confirmed,
          notes: notes
        })
        .eq('id', guestId);

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      // Update local state
      setFoundGuests(prev => 
        prev.map(guest => 
          guest.id === guestId 
            ? { ...guest, confirmation_status: confirmed, notes: notes }
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

  const handleNotesChange = (guestId: number, notes: string) => {
    setGuestNotes(prev => ({
      ...prev,
      [guestId]: notes
    }));
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
    <section id="rsvp" className="py-20 bg-gradient-to-br from-wedding-brick/20 via-wedding-dust/30 to-wedding-brick/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-wedding-brick mb-4">
            RSVP
          </h2>
          <div className="w-24 h-px bg-wedding-brick mx-auto mb-6"></div>
          <p className="font-inter text-lg text-wedding-dust max-w-2xl mx-auto">
            Vi preghiamo di farci sapere se potete unirvi a noi nel nostro giorno speciale. Non vediamo l'ora di festeggiare con voi!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-wedding-brick/20">
            <div className="text-center mb-8">
              <div className="bg-wedding-brick p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-wedding-brick mb-2">
                Trova il Tuo Invito
              </h3>
              <p className="font-inter text-wedding-dust">
                Inserisci il tuo nome e cognome per visualizzare i dettagli del tuo invito e confermare la partecipazione
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-inter font-medium text-wedding-dust block mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Il tuo nome"
                    className="w-full px-4 py-3 border border-wedding-dust/30 rounded-lg focus:ring-2 focus:ring-wedding-brick focus:border-transparent font-inter"
                  />
                </div>
                
                <div>
                  <label className="font-inter font-medium text-wedding-dust block mb-2">
                    Cognome
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Il tuo cognome"
                    className="w-full px-4 py-3 border border-wedding-dust/30 rounded-lg focus:ring-2 focus:ring-wedding-brick focus:border-transparent font-inter"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-wedding-brick text-white font-inter font-medium py-3 px-6 rounded-lg hover:bg-wedding-brick/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSearching ? "Cercando..." : "Trova il Mio Invito"}
              </button>
            </div>

            {foundGuests.length > 0 && (
              <div className="mt-8 p-6 bg-wedding-cream/50 rounded-lg border-2 border-wedding-dust/20 shadow-lg">
                <div className="mb-4">
                  <h4 className="font-playfair text-xl font-bold text-wedding-brick mb-2">
                    Dettagli Invito
                  </h4>
                  <div className="bg-wedding-dust/20 p-3 rounded-lg border border-wedding-dust/30">
                    <p className="font-inter font-medium text-wedding-brick">
                      Tipo di invito: {getInviteTypeLabel(inviteType)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-inter font-medium text-wedding-dust">
                    Conferma partecipazione per:
                  </h5>
                  {foundGuests.map((guest) => (
                    <div key={guest.id} className="p-4 bg-white border border-wedding-brick/20 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-inter font-medium text-wedding-brick">
                          {guest.name} {guest.surname}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleConfirmation(guest.id, true)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              guest.confirmation_status === true
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-600 hover:bg-green-100 hover:scale-110'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleConfirmation(guest.id, false)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              guest.confirmation_status === false
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-600 hover:bg-red-100 hover:scale-110'
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="font-inter text-sm font-medium text-wedding-dust flex items-center space-x-2 mb-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>Note aggiuntive</span>
                        </label>
                        <Textarea
                          value={guestNotes[guest.id] || ''}
                          onChange={(e) => handleNotesChange(guest.id, e.target.value)}
                          placeholder="Allergie alimentari, esigenze speciali, seggiolino bambini, ecc..."
                          className="w-full text-sm border-wedding-dust/30 focus:border-wedding-brick focus:ring-wedding-brick/20"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-wedding-dust/10 rounded-lg border-2 border-wedding-brick/20 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-wedding-brick" />
                <span className="font-inter font-medium text-wedding-brick">
                  Scadenza RSVP: 10 Ottobre 2024
                </span>
              </div>
              <p className="font-inter text-sm text-wedding-dust">
                Vi preghiamo di rispondere entro il 10 ottobre per aiutarci a finalizzare il conteggio degli ospiti. 
                Se avete restrizioni alimentari o richieste speciali, includetele nelle note.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
