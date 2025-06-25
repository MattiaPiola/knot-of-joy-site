
import SearchForm from "./rsvp/SearchForm";
import InviteDetails from "./rsvp/InviteDetails";
import DeadlineNotice from "./rsvp/DeadlineNotice";
import { useRsvpLogic } from "./rsvp/useRsvpLogic";

const RsvpSection = () => {
  const {
    isSearching,
    foundGuests,
    inviteType,
    guestNotes,
    hasUnsavedChanges,
    isSaving,
    handleSearch,
    handleConfirmation,
    handleNotesChange,
    handleSubmit
  } = useRsvpLogic();

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
          <SearchForm onSearch={handleSearch} isSearching={isSearching} />

          {foundGuests.length > 0 && (
            <InviteDetails
              guests={foundGuests}
              inviteType={inviteType}
              guestNotes={guestNotes}
              hasUnsavedChanges={hasUnsavedChanges}
              isSaving={isSaving}
              onConfirmation={handleConfirmation}
              onNotesChange={handleNotesChange}
              onSubmit={handleSubmit}
            />
          )}

          <DeadlineNotice />
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
