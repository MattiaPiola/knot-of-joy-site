
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <h3 className="font-playfair text-2xl font-bold text-wedding-brick mb-2">
            Francesca & Mattia
          </h3>
          <p className="font-inter text-gray-300">
            25 Ottobre 2024
          </p>
        </div>

        <div className="w-24 h-px bg-wedding-brick mx-auto mb-6"></div>

        <p className="font-inter text-gray-400 text-sm mb-4">
          Non vediamo l'ora di festeggiare con voi!
        </p>

        <p className="font-inter text-gray-500 text-xs">
          Per domande sul matrimonio, contattateci a{" "}
          <a href="mailto:francesca.mattia.matrimonio@email.com" className="text-wedding-brick hover:underline">
            francesca.mattia.matrimonio@email.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
