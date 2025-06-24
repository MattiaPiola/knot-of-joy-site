
import { Calendar } from "lucide-react";

const DeadlineNotice = () => {
  return (
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
  );
};

export default DeadlineNotice;
