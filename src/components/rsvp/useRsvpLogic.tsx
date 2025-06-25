import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Guest {
  id: number; // Keep as number - Supabase JS converts bigint to number automatically
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
    console.log('=== HARDCODED SEARCH TEST ===');
    console.log('User input received:', { firstName, lastName });
    
    // HARDCODE VALUES FOR TESTING
    const hardcodedFirstName = "Prova";
    const hardcodedLastName = "Provoni";
    
    console.log('Using hardcoded values:', { hardcodedFirstName, hardcodedLastName });

    setIsSearching(true);
    
    try {
      console.log('Step 1: About to make Supabase call...');
      
      // Make the Supabase call with hardcoded values
      const supabaseCall = supabase
        .from('guests')
        .select('*')
        .eq('name', hardcodedFirstName)
        .eq('surname', hardcodedLastName);
      
      console.log('Step 2: Supabase query constructed, executing...');
      
      const { data: results, error } = await supabaseCall;
      
      console.log('Step 3: Supabase response received');
      console.log('Results:', results);
      console.log('Error:', error);
      console.log('Results type:', typeof results);
      console.log('Results length:', results?.length);
      console.log('Is results array?', Array.isArray(results));
      
      if (error) {
        console.error('Step 4: Error detected:', error);
        throw error;
      }

      console.log('Step 5: No error, checking results...');
      
      if (results) {
        console.log('Step 6: Results exist, length:', results.length);
        
        if (results.length > 0) {
          console.log('Step 7: Found guests, processing...');
          const mainGuest = results[0];
          console.log('Main guest:', mainGuest);
          
          // Get all family members
          console.log('Step 8: Getting family members for family_id:', mainGuest.family_id);
          
          const { data: familyGuests, error: familyError } = await supabase
            .from('guests')
            .select('*')
            .eq('family_id', mainGuest.family_id);

          console.log('Step 9: Family search complete');
          console.log('Family guests:', familyGuests);
          console.log('Family error:', familyError);

          if (familyError) {
            console.error('Step 10: Family search error:', familyError);
            throw familyError;
          }

          console.log('Step 11: Setting state with found guests');
          
          // Set the found guests
          setFoundGuests(familyGuests || []);
          setInviteType(mainGuest.invite_type || '');
          
          // Initialize notes state
          const notesMap: {[key: number]: string} = {};
          familyGuests?.forEach(guest => {
            notesMap[guest.id] = guest.notes || '';
          });
          setGuestNotes(notesMap);
          
          console.log('Step 12: State updated successfully');
          
          toast({
            title: "Invito trovato!",
            description: `Ciao ${mainGuest.name}! Ecco i dettagli del tuo invito.`,
          });
          
          return;
        } else {
          console.log('Step 7: Results array is empty');
        }
      } else {
        console.log('Step 6: Results is null/undefined');
      }

      // No matches found
      console.log('Step 13: No guests found, setting empty array');
      setFoundGuests([]);
      toast({
        title: "Ospite non trovato",
        description: `Non riusciamo a trovare "${hardcodedFirstName} ${hardcodedLastName}" nella lista degli invitati. Verifica l'ortografia o contattaci.`,
        variant: "destructive",
      });

    } catch (error) {
      console.error('Step ERROR: Exception caught:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la ricerca. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      console.log('Step FINAL: Setting isSearching to false');
      setIsSearching(false);
    }
  };

  const handleConfirmation = async (guestId: number, confirmed: boolean) => {
    try {
      const notes = guestNotes[guestId] || '';
      
      console.log('Updating guest confirmation:', { guestId, confirmed, notes });
      
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
