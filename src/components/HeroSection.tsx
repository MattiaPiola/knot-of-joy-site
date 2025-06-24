
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-wedding-sage/20 to-wedding-blush/30"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 text-center text-white px-6 animate-fade-in">
        <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 animate-float">
          Sarah & Michael
        </h1>
        
        <div className="w-24 h-px bg-wedding-gold mx-auto mb-6"></div>
        
        <p className="font-inter text-xl md:text-2xl font-light mb-8">
          Together with our families, we invite you to celebrate our wedding
        </p>
        
        <div className="font-playfair text-2xl md:text-3xl font-medium mb-8">
          June 15th, 2024
        </div>
        
        <button
          onClick={() => document.getElementById('date-venue')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center font-inter font-medium text-lg bg-wedding-gold/20 backdrop-blur-sm border border-wedding-gold text-white px-8 py-3 rounded-full hover:bg-wedding-gold hover:text-black transition-all duration-300"
        >
          Learn More
          <span className="ml-2">↓</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
