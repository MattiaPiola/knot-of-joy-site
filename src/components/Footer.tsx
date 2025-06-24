
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <h3 className="font-playfair text-2xl font-bold text-wedding-gold mb-2">
            Sarah & Michael
          </h3>
          <p className="font-inter text-gray-300">
            June 15th, 2024
          </p>
        </div>

        <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>

        <p className="font-inter text-gray-400 text-sm mb-4">
          We can't wait to celebrate with you!
        </p>

        <p className="font-inter text-gray-500 text-xs">
          For questions about the wedding, please contact us at{" "}
          <a href="mailto:sarah.michael.wedding@email.com" className="text-wedding-gold hover:underline">
            sarah.michael.wedding@email.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
