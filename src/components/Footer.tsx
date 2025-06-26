
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-wedding-brick to-wedding-dust text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <h3 className="font-playfair text-2xl font-bold text-wedding-cream mb-2">
            Francesca & Mattia
          </h3>
          <p className="font-inter text-wedding-light">
            25 Ottobre 2025
          </p>
        </div>

        <div className="w-24 h-px bg-wedding-cream mx-auto mb-6"></div>

        <p className="font-inter text-wedding-light text-sm mb-4">
          Non vediamo l'ora di festeggiare con voi!
        </p>

        <p className="font-inter text-wedding-cream/80 text-xs">
          Per domande sul matrimonio, contattateci a{" "}
          <a href="mailto:francesca.mattia.matrimonio@email.com" className="text-wedding-cream hover:underline transition-all duration-200">
            francesca.mattia.matrimonio@email.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
