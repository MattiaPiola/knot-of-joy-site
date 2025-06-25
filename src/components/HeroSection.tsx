
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-wedding-cream"
      style={{
        backgroundImage: `url('/hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-wedding-cream/30 via-wedding-cream/50 to-wedding-cream/70"></div>
      
      <div className="relative z-10 text-center text-wedding-brick px-6 animate-fade-in">
        <div className="mb-12 animate-float">
          <img 
            src="/lovable-uploads/00d32cd5-ca9b-4909-87c9-4d3347ba1089.png" 
            alt="Francesca & Mattia" 
            className="mx-auto max-w-md w-full h-auto"
          />
        </div>
        
        <div className="w-32 h-px bg-wedding-brick mx-auto mb-8 opacity-60"></div>
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="font-inter text-xl md:text-2xl font-light leading-relaxed text-wedding-brick/90 mb-8">
            Insieme alle nostre famiglie,<br />
            vi invitiamo a celebrare il nostro matrimonio
          </p>
          
          <div className="font-playfair text-3xl md:text-4xl font-medium text-wedding-brick mb-2">
            25 Ottobre 2024
          </div>
          
          <div className="w-16 h-px bg-wedding-brick mx-auto opacity-40"></div>
        </div>
        
        <button
          onClick={() => document.getElementById('date-venue')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center font-inter font-medium text-lg bg-wedding-brick text-wedding-cream px-8 py-3 rounded-full hover:bg-wedding-brick/90 hover:scale-105 transition-all duration-300 shadow-lg mt-8"
        >
          Scopri di più
          <span className="ml-2">↓</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
