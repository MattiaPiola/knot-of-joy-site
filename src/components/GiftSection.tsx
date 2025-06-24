
import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GiftSection = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const bankDetails = {
    accountName: "Sarah & Michael Wedding Fund",
    bankName: "First National Bank",
    accountNumber: "1234567890",
    routingNumber: "987654321",
    iban: "GB12 ABCD 1234 5678 9012 34"
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <section id="gifts" className="py-20 bg-wedding-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Wedding Gifts
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
            we would be grateful for contributions toward our new home together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-wedding-gold/20">
            <div className="text-center mb-8">
              <div className="bg-wedding-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="w-8 h-8 text-wedding-gold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                Bank Transfer Details
              </h3>
              <p className="font-inter text-gray-600">
                For your convenience, you can transfer gifts directly to our wedding fund
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(bankDetails).map(([key, value]) => (
                <div key={key} className="bg-wedding-cream/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <label className="font-inter font-medium text-gray-700 text-sm uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <p className="font-inter text-gray-900 font-mono text-lg">
                        {value}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(value, key)}
                      className="ml-4 p-2 text-wedding-gold hover:bg-wedding-gold/10 rounded-full transition-colors duration-200"
                      title="Copy to clipboard"
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
                <strong>Note:</strong> Please include your name in the transfer reference so we can properly thank you. 
                All gifts are deeply appreciated and will help us start our new life together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
