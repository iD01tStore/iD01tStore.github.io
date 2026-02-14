import { useEffect, useRef, useState } from 'react';
import { Play, ChevronDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const musicStyles = [
    { name: 'Cinematic Psytrance', description: 'Immersive, story-driven electronic' },
    { name: 'Bass Music', description: 'Heavy low-frequency energy' },
    { name: 'Industrial', description: 'Gritty, mechanical textures' },
    { name: 'Dubstep', description: 'Glitchy, wobble basslines' },
    { name: 'EBM', description: 'Electronic Body Music' },
    { name: 'Cyberpunk Electronic', description: 'Tech-noir soundscapes' },
    { name: 'Techno', description: 'Driving, dance-floor ready' },
    { name: 'Cinematic', description: 'Film-score influenced' }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Character animation for the title
  const titleChars = "DJ iD01t".split('');

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Animated Gradient Orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          right: '15%',
          bottom: '10%',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Data Stream Effect */}
      <div className="data-stream" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">AI-Native Production</span>
            </div>

            {/* Title with Character Animation */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              {titleChars.map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${200 + index * 80}ms`,
                    color: char === 'i' || char === 'D' || char === '0' || char === '1' || char === 't' 
                      ? '#00f5ff' 
                      : 'white',
                    textShadow: char === 'i' || char === 'D' || char === '0' || char === '1' || char === 't'
                      ? '0 0 20px rgba(0, 245, 255, 0.5)'
                      : 'none'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Subtitle with Music Styles */}
            <div 
              className={`relative transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A multi-faceted sound that evolves from heavy industrial dubstep and technical glitch into a cinematic fusion of cyberpunk-themed bass, rhythmic noise, and industrial techno.
              </p>
              
              {/* Music Styles Pills */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                {musicStyles.slice(0, 6).map((style) => (
                  <span 
                    key={style.name}
                    className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium"
                  >
                    {style.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p 
              className={`text-slate-400 max-w-xl mx-auto lg:mx-0 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              Immersive electronic music that tells stories through sound. 
              Experience the journey from AI awakening to system override across 
              nine albums of cyberpunk sonic architecture.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <a 
                href="https://open.spotify.com/artist/0EihiI3hgiPfIiyb154dgB"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber flex items-center justify-center gap-2 group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Stream on Spotify</span>
              </a>
              <a 
                href="#albums"
                className="px-8 py-4 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all text-center"
              >
                Explore Albums
              </a>
            </div>

            {/* Stats */}
            <div 
              className={`flex flex-wrap gap-8 justify-center lg:justify-start pt-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 font-['Orbitron']">9</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Albums</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 font-['Orbitron']">111</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Tracks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 font-['Orbitron']">11</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Months</div>
              </div>
            </div>
          </div>

          {/* Right: 3D Album Art */}
          <div 
            ref={imageRef}
            className={`relative perspective-1000 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ 
              transitionDelay: '600ms',
              transform: `rotateY(${mousePos.x * 15}deg) rotateX(${mousePos.y * -15}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glow Effect Behind Image */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-2xl blur-3xl scale-110"
              style={{
                transform: 'translateZ(-50px)'
              }}
            />
            
            {/* Album Art Container */}
            <div className="relative animate-float">
              <img
                src="https://i.scdn.co/image/ab67616d00001e02161649285321f294f8c754bf"
                alt="DJ iD01t - ROOT_ACCESS Album Cover"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl holographic"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 245, 255, 0.25)'
                }}
              />
              
              {/* Floating Badge */}
              <div 
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm font-medium shadow-lg"
                style={{
                  transform: 'translateZ(30px)'
                }}
              >
                ROOT_ACCESS LP
              </div>
            </div>

            {/* Decorative Elements */}
            <div 
              className="absolute -top-8 -left-8 w-24 h-24 border border-cyan-500/30 rounded-lg"
              style={{
                transform: 'translateZ(-30px) rotate(12deg)'
              }}
            />
            <div 
              className="absolute -bottom-8 -right-8 w-32 h-32 border border-purple-500/30 rounded-full"
              style={{
                transform: 'translateZ(-40px)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1600ms' }}
      >
        <a 
          href="#featured"
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-4 w-px h-32 bg-gradient-to-b from-cyan-500/50 to-transparent" />
      <div className="absolute top-20 left-4 h-px w-32 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      <div className="absolute bottom-20 right-4 w-px h-32 bg-gradient-to-t from-purple-500/50 to-transparent" />
      <div className="absolute bottom-20 right-4 h-px w-32 bg-gradient-to-l from-purple-500/50 to-transparent" />
    </section>
  );
};

export default Hero;
