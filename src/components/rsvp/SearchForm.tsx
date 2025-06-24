
import { useState } from "react";
import { Users } from "lucide-react";

interface SearchFormProps {
  onSearch: (firstName: string, lastName: string) => void;
  isSearching: boolean;
}

const SearchForm = ({ onSearch, isSearching }: SearchFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSearch = () => {
    onSearch(firstName, lastName);
  };

  return (
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
    </div>
  );
};

export default SearchForm;
