
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-wedding-brick/30 to-wedding-dust/40"
      style={{
        backgroundImage: `url('/hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-wedding-brick/20 via-black/40 to-wedding-dust/30"></div>
      
      <div className="relative z-10 text-center text-white px-6 animate-fade-in">
        <div className="mb-8 animate-float">
          <img 
            src="/lovable-uploads/00d32cd5-ca9b-4909-87c9-4d3347ba1089.png" 
            alt="Francesca & Mattia" 
            className="mx-auto max-w-md w-full h-auto"
          />
        </div>
        
        <div className="w-24 h-px bg-wedding-cream mx-auto mb-6"></div>
        
        <p className="font-inter text-xl md:text-2xl font-light mb-8 bg-wedding-dust/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-wedding-cream/30">
          Insieme alle nostre famiglie, vi invitiamo a celebrare il nostro matrimonio
        </p>
        
        <div className="font-playfair text-2xl md:text-3xl font-medium mb-8 bg-wedding-brick/30 backdrop-blur-sm px-8 py-4 rounded-lg border border-wedding-cream/30">
          25 Ottobre 2024
        </div>
        
        <button
          onClick={() => document.getElementById('date-venue')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center font-inter font-medium text-lg bg-wedding-cream text-wedding-brick px-8 py-3 rounded-full hover:bg-wedding-light hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Scopri di più
          <span className="ml-2">↓</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
