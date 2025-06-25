
import { Check, X, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
  guestNotes: {[key: number]: string};
  onConfirmation: (guestId: number, confirmed: boolean) => void;
  onNotesChange: (guestId: number, notes: string) => void;
}

const InviteDetails = ({ 
  guests, 
  inviteType, 
  guestNotes, 
  onConfirmation, 
  onNotesChange 
}: InviteDetailsProps) => {
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
        {guests.map((guest) => (
          <div key={guest.id} className="p-4 bg-white border border-wedding-brick/20 rounded-lg">
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
            
            <div className="mt-3">
              <label className="font-inter text-sm font-medium text-wedding-dust flex items-center space-x-2 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Note aggiuntive</span>
              </label>
              <Textarea
                value={guestNotes[guest.id] || ''}
                onChange={(e) => onNotesChange(guest.id, e.target.value)}
                placeholder="Allergie alimentari, esigenze speciali, seggiolino bambini, ecc..."
                className="w-full text-sm border-wedding-dust/30 focus:border-wedding-brick focus:ring-wedding-brick/20"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteDetails;
