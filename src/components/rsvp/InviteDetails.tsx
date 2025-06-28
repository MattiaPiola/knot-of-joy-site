import { Check, X, MessageSquare, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Guest {
  id: number;
  name: string;
  surname: string;
  family_id: number;
  invite_type: string;
  confirmation_status: boolean | null;
  notes: string | null;
}

interface InviteDetailsProps {
  guests: Guest[];
  inviteType: string;
  searchedName?: string;
  guestNotes: {[key: number]: string};
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onConfirmation: (guestId: number, confirmed: boolean) => void;
  onNotesChange: (guestId: number, notes: string) => void;
  onSubmit: () => void;
}

const InviteDetails = ({ 
  guests, 
  inviteType,
  searchedName,
  guestNotes, 
  hasUnsavedChanges,
  isSaving,
  onConfirmation, 
  onNotesChange,
  onSubmit
}: InviteDetailsProps) => {
  const getInviteTypeMessage = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'not_found':
        return {
          title: '💕 Ti aspettiamo comunque!',
          message: `Caro/a ${searchedName}, ci dispiace tanto ma non ti troviamo nella lista degli invitati per il ricevimento. Tuttavia, saremo felicissimi di averti alla cerimonia religiosa! Il tuo affetto per noi vale più di qualsiasi invito formale. 🤗✨`,
          color: 'bg-rose-50 border-rose-300 text-rose-800'
        };
      case 'pranzo':
        return {
          title: 'Pranzo di Nozze',
          message: 'Siete invitati al pranzo di nozze! Vi aspettiamo alle ore 13:00 presso Villa dei Fiori per festeggiare insieme questo giorno speciale. 🍽️✨',
          color: 'bg-wedding-brick/10 border-wedding-brick/30 text-wedding-brick'
        };
      case 'torta':
        return {
          title: 'Taglio della Torta',  
          message: 'Siete invitati al taglio della torta! Vi aspettiamo alle ore 17:00 presso Villa dei Fiori per il momento più dolce della giornata. 🍰💕',
          color: 'bg-wedding-dust/10 border-wedding-dust/30 text-wedding-dust'
        };
      default:
        return {
          title: 'Invito Speciale',
          message: 'Grazie per essere parte della nostra vita! 💕',
          color: 'bg-wedding-dust/20 border-wedding-dust/30 text-wedding-brick'
        };
    }
  };

  const inviteInfo = getInviteTypeMessage(inviteType);

  return (
    <div className="mt-8 p-6 bg-wedding-cream/50 rounded-lg border-2 border-wedding-dust/20 shadow-lg animate-fade-in">
      <div className="mb-6">
        <h4 className="font-playfair text-xl font-bold text-wedding-brick mb-4">
          Dettagli Invito
        </h4>
        <div className={`p-4 rounded-lg border-2 ${inviteInfo.color} animate-scale-in`}>
          <h5 className="font-inter font-bold text-lg mb-2">
            {inviteInfo.title}
          </h5>
          <p className="font-inter">
            {inviteInfo.message}
          </p>
        </div>
      </div>

      {/* Only show RSVP form if guests were found */}
      {guests.length > 0 && (
        <>
          <div className="space-y-4">
            <h5 className="font-inter font-medium text-wedding-dust">
              Conferma partecipazione per:
            </h5>
            {guests.map((guest, index) => (
              <div 
                key={guest.id} 
                className="p-4 bg-white border border-wedding-brick/20 rounded-lg animate-fade-in hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-inter font-medium text-wedding-brick">
                    {guest.name} {guest.surname}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onConfirmation(guest.id, true)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        guest.confirmation_status === true
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-600 hover:bg-green-100 hover:scale-110'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onConfirmation(guest.id, false)}
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
                {/* Show RSVP status */}
                <div className="mb-2">
                  {guest.confirmation_status === null && (
                    <span className="text-sm text-gray-500 italic">Non hai ancora risposto</span>
                  )}
                  {guest.confirmation_status === true && (
                    <span className="text-sm text-green-600">Confermato</span>
                  )}
                  {guest.confirmation_status === false && (
                    <span className="text-sm text-red-600">Non parteciperò</span>
                  )}
                </div>
                
                <div className="mt-3">
                  <label className="font-inter text-sm font-medium text-wedding-dust flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Note aggiuntive</span>
                  </label>
                  <Textarea
                    value={guestNotes[guest.id] || ''}
                    onChange={(e) => onNotesChange(guest.id, e.target.value)}
                    placeholder="Allergie alimentari, intolleranze, esigenze speciali, seggiolino per bambini, menu vegetariano, accompagnatori, richieste particolari, ecc..."
                    className="w-full text-sm border-wedding-dust/30 focus:border-wedding-brick focus:ring-wedding-brick/20"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-wedding-dust/20">
            <Button
              onClick={onSubmit}
              disabled={!hasUnsavedChanges || isSaving}
              className={`w-full font-inter font-medium py-3 px-6 rounded-lg transition-all duration-200 ${
                hasUnsavedChanges 
                  ? 'bg-wedding-brick text-white hover:bg-wedding-brick/90 hover:scale-105 shadow-lg' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Salvando...' : hasUnsavedChanges ? 'Salva Modifiche' : 'Modifiche Salvate'}
            </Button>
            {hasUnsavedChanges && (
              <p className="text-sm text-orange-600 mt-2 text-center animate-fade-in">
                Hai modifiche non salvate. Clicca "Salva Modifiche" per confermare.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InviteDetails;
