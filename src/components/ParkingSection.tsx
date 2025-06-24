
import { Car, MapPin } from "lucide-react";

const ParkingSection = () => {
  const parkingSpots = [
    {
      name: "Church Parking Lot",
      description: "Main parking area behind St. Mary's Church",
      spaces: "50 spaces",
      distance: "0 min walk",
      note: "Reserved for elderly and disabled guests"
    },
    {
      name: "Municipal Parking Garage",
      description: "123 Main Street, 2 blocks east of church",
      spaces: "200 spaces",
      distance: "3 min walk",
      note: "Free on weekends"
    },
    {
      name: "Street Parking",
      description: "Church Street and surrounding blocks",
      spaces: "Limited",
      distance: "1-5 min walk",
      note: "Check posted signs for time limits"
    },
    {
      name: "Community Center Lot",
      description: "789 Community Drive, 1 block north",
      spaces: "75 spaces",
      distance: "4 min walk",
      note: "Available after 1:00 PM"
    }
  ];

  return (
    <section id="parking" className="py-20 bg-wedding-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Parking Information
          </h2>
          <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            We've arranged several convenient parking options near St. Mary's Church for your comfort.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {parkingSpots.map((spot, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-wedding-gold/20 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-wedding-sage/20 p-3 rounded-full">
                  <Car className="w-6 h-6 text-wedding-gold" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                    {spot.name}
                  </h3>
                  
                  <div className="space-y-2 font-inter text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{spot.description}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Capacity:</span>
                      <span>{spot.spaces}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Walking Time:</span>
                      <span>{spot.distance}</span>
                    </div>
                    
                    {spot.note && (
                      <div className="mt-3 p-2 bg-wedding-blush/50 rounded text-xs">
                        <strong>Note:</strong> {spot.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParkingSection;
