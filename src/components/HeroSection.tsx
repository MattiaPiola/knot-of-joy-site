
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-wedding-dust/20 to-wedding-light/30"
      style={{
        backgroundImage: `url('/hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 text-center text-white px-6 animate-fade-in">
        <div className="mb-8 animate-float">
          <img 
            src="/lovable-uploads/00d32cd5-ca9b-4909-87c9-4d3347ba1089.png" 
            alt="Francesca & Mattia" 
            className="mx-auto max-w-md w-full h-auto"
          />
        </div>
        
        <div className="w-24 h-px bg-wedding-brick mx-auto mb-6"></div>
        
        <p className="font-inter text-xl md:text-2xl font-light mb-8">
          Insieme alle nostre famiglie, vi invitiamo a celebrare il nostro matrimonio
        </p>
        
        <div className="font-playfair text-2xl md:text-3xl font-medium mb-8">
          25 Ottobre 2024
        </div>
        
        <button
          onClick={() => document.getElementById('date-venue')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center font-inter font-medium text-lg bg-wedding-brick/20 backdrop-blur-sm border border-wedding-brick text-white px-8 py-3 rounded-full hover:bg-wedding-brick hover:text-white transition-all duration-300"
        >
          Scopri di più
          <span className="ml-2">↓</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
