
import { useState } from "react";
import { Search, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RsvpSection = () => {
  const [guestName, setGuestName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!guestName.trim()) {
      toast({
        title: "Please enter your name",
        description: "We need your name to find your invitation details.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call - this will be replaced with actual Supabase integration
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Supabase Connection Required",
        description: "Please connect to Supabase to enable RSVP functionality.",
        variant: "destructive",
      });
    }, 1000);
  };

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            RSVP
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Please let us know if you can join us for our special day. We can't wait to celebrate with you!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-wedding-cream/50 p-8 rounded-lg">
            <div className="text-center mb-8">
              <div className="bg-wedding-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-wedding-gold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                Find Your Invitation
              </h3>
              <p className="font-inter text-gray-600">
                Enter your name to view your invitation details and RSVP for your party
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="font-inter font-medium text-gray-700 block mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your first and last name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent font-inter"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-wedding-gold text-white font-inter font-medium py-3 px-6 rounded-lg hover:bg-wedding-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "Searching..." : "Find My Invitation"}
              </button>
            </div>

            <div className="mt-8 p-4 bg-white rounded-lg border border-wedding-gold/20">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-wedding-gold" />
                <span className="font-inter font-medium text-gray-800">
                  RSVP Deadline: May 15th, 2024
                </span>
              </div>
              <p className="font-inter text-sm text-gray-600">
                Please respond by May 15th to help us finalize our headcount. 
                If you have any dietary restrictions or special requests, please include them in your response.
              </p>
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-inter text-sm text-red-700">
                <strong>Setup Required:</strong> The RSVP functionality requires Supabase integration. 
                Please connect to Supabase to enable guest lookup and RSVP confirmation features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
