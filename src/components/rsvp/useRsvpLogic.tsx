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
  const [searchedName, setSearchedName] = useState<string>("");
  const [guestNotes, setGuestNotes] = useState<{[key: number]: string}>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (firstName: string, lastName: string) => {
    // Trim spaces from names before searching
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    console.log('Searching for:', { firstName: trimmedFirstName, lastName: trimmedLastName });

    setIsSearching(true);
    
    try {
      const { data: results, error } = await supabase
        .from('guests')
        .select('*')
        .ilike('name', trimmedFirstName)
        .ilike('surname', trimmedLastName);
      
      console.log('Search results:', results);
      
      if (error) {
        console.error('Search error:', error);
        throw error;
      }

      if (results && results.length > 0) {
        const mainGuest = results[0];
        console.log('Found guest, getting family members for family_id:', mainGuest.family_id);
        
        // Get all family members
        const { data: familyGuests, error: familyError } = await supabase
          .from('guests')
          .select('*')
          .eq('family_id', mainGuest.family_id);

        if (familyError) {
          console.error('Family search error:', familyError);
          throw familyError;
        }

        // Set the found guests
        setFoundGuests(familyGuests || []);
        setInviteType(mainGuest.invite_type || '');
        setSearchedName('');
        
        // Initialize notes state
        const notesMap: {[key: number]: string} = {};
        familyGuests?.forEach(guest => {
          notesMap[guest.id] = guest.notes || '';
        });
        setGuestNotes(notesMap);
        setHasUnsavedChanges(false);
        
        toast({
          title: "Invito trovato!",
          description: `Ciao ${mainGuest.name}! Ecco i dettagli del tuo invito.`,
        });
      } else {
        // No matches found - show gentle message instead of error
        setFoundGuests([]);
        setInviteType('not_found');
        setSearchedName(`${firstName} ${lastName}`);
        setGuestNotes({});
        setHasUnsavedChanges(false);
      }

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la ricerca. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmation = (guestId: number, confirmed: boolean) => {
    // Update local state
    setFoundGuests(prev => 
      prev.map(guest => 
        guest.id === guestId 
          ? { ...guest, confirmation_status: confirmed }
          : guest
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleNotesChange = (guestId: number, notes: string) => {
    setGuestNotes(prev => ({
      ...prev,
      [guestId]: notes
    }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    
    try {
      // Update all guests with their confirmation status and notes
      const updates = foundGuests.map(guest => ({
        id: guest.id,
        confirmation_status: guest.confirmation_status,
        notes: guestNotes[guest.id] || ''
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('guests')
          .update({ 
            confirmation_status: update.confirmation_status,
            notes: update.notes
          })
          .eq('id', update.id);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
      }

      setHasUnsavedChanges(false);
      
      toast({
        title: "Modifiche salvate!",
        description: "Le tue conferme e note sono state salvate con successo.",
      });

    } catch (error) {
      console.error('Error saving changes:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSearching,
    foundGuests,
    inviteType,
    searchedName,
    guestNotes,
    hasUnsavedChanges,
    isSaving,
    handleSearch,
    handleConfirmation,
    handleNotesChange,
    handleSubmit
  };
};
