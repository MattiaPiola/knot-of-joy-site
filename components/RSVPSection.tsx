import React from 'react';

type RSVPSectionProps = {
  confirmation_status: string | null;
  // ...other props...
};

const RSVPSection: React.FC<RSVPSectionProps> = ({ confirmation_status /*, ...other props */ }) => {
  let statusMessage;
  if (confirmation_status === null) {
    statusMessage = "Non hai ancora risposto";
  } else {
    statusMessage = confirmation_status; // or your existing mapping
  }

  return (
    <div>
      {/* ...existing code... */}
      <p>{statusMessage}</p>
      {/* ...existing code... */}
    </div>
  );
};

export default RSVPSection;