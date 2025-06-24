
import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GiftSection = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const bankDetails = {
    accountName: "Francesca & Mattia Fondo Matrimonio",
    bankName: "Banca Nazionale",
    accountNumber: "1234567890",
    routingNumber: "987654321",
    iban: "IT12 A123 4567 8901 2345 678901"
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast({
        title: "Copiato!",
        description: `${field} copiato negli appunti`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <section id="gifts" className="py-20 bg-wedding-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lista Nozze
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            La vostra presenza al nostro matrimonio è il regalo più grande. Tuttavia, se desiderate onorarci con un dono, 
            saremmo grati per un contributo verso la nostra nuova casa insieme.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-wedding-gold/20">
            <div className="text-center mb-8">
              <div className="bg-wedding-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="w-8 h-8 text-wedding-gold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                Dettagli Bonifico Bancario
              </h3>
              <p className="font-inter text-gray-600">
                Per vostra comodità, potete trasferire i regali direttamente al nostro fondo matrimonio
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(bankDetails).map(([key, value]) => (
                <div key={key} className="bg-wedding-cream/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <label className="font-inter font-medium text-gray-700 text-sm uppercase tracking-wide">
                        {key === 'accountName' ? 'Intestatario' : 
                         key === 'bankName' ? 'Banca' :
                         key === 'accountNumber' ? 'Numero Conto' :
                         key === 'routingNumber' ? 'Codice ABI' :
                         key === 'iban' ? 'IBAN' : key}
                      </label>
                      <p className="font-inter text-gray-900 font-mono text-lg">
                        {value}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(value, key)}
                      className="ml-4 p-2 text-wedding-gold hover:bg-wedding-gold/10 rounded-full transition-colors duration-200"
                      title="Copia negli appunti"
                    >
                      {copiedField === key ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-wedding-sage/20 rounded-lg">
              <p className="font-inter text-sm text-gray-600 text-center">
                <strong>Nota:</strong> Vi preghiamo di includere il vostro nome nella causale del bonifico così potremo ringraziarvi adeguatamente. 
                Tutti i regali sono molto apprezzati e ci aiuteranno a iniziare la nostra nuova vita insieme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
