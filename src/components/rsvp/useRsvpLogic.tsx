
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Guest {
  id: number;
  name: string;
  surname: string;
  family_id: number;
  invite_type: string;
  confirmation_status: boolean | null;
  notes: string | null;
}

export const useRsvpLogic = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [foundGuests, setFoundGuests] = useState<Guest[]>([]);
  const [inviteType, setInviteType] = useState<string>("");
  const [guestNotes, setGuestNotes] = useState<{[key: number]: string}>({});
  const { toast } = useToast();

  const handleSearch = async (firstName: string, lastName: string) => {
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
      
      console.log('Searching for guest with exact parameters:', { 
        firstName: trimmedFirstName, 
        lastName: trimmedLastName,
        firstNameLength: trimmedFirstName.length,
        lastNameLength: trimmedLastName.length
      });
      
      // Try exact match first
      let { data: results, error } = await supabase
        .from('guests')
        .select('*')
        .eq('name', trimmedFirstName)
        .eq('surname', trimmedLastName);

      console.log('Exact search results:', results);
      console.log('Search error (if any):', error);

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

      // If still no results, try partial matches
      if (!results || results.length === 0) {
        console.log('Trying partial match search...');
        
        ({ data: results, error } = await supabase
          .from('guests')
          .select('*')
          .or(`name.ilike.%${trimmedFirstName}%,surname.ilike.%${trimmedLastName}%`));
        
        console.log('Partial match search results:', results);
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
        
        // Initialize notes state, handling null values
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
      console.log('No matches found for:', trimmedFirstName, trimmedLastName);
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

  return {
    isSearching,
    foundGuests,
    inviteType,
    guestNotes,
    handleSearch,
    handleConfirmation,
    handleNotesChange
  };
};
