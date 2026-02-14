import { useEffect, useRef, useState } from 'react';
import { BookOpen, Gamepad2, Film, Code, ExternalLink, Terminal, Cpu, Sparkles, ShoppingBag } from 'lucide-react';

interface TransmediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  image: string;
  link: string;
  features: string[];
  color: string;
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  color: string;
}

const transmediaItems: TransmediaItem[] = [
  {
    id: 'syntax-error',
    title: 'SYNTAX_ERROR: The Jess Damaged Archives',
    category: 'Cyberpunk eBook Trilogy',
    description: 'The definitive literary entry point into the ROOT_ACCESS universe. Documents the tactical and psychological collapse of digital sovereignty within the Echo Protocol framework.',
    icon: BookOpen,
    image: 'https://img.itch.zone/aW1nLzI1MzE1OTYxLnBuZw==/original/ku9Q4J.png',
    link: 'https://id01t.itch.io/root-access-ebook',
    features: ['NeoShanghai Setting', 'Jessica Chen / "Damaged" Protagonist', 'Sound Architect Character', 'High-Stakes Storytelling'],
    color: 'cyan'
  },
  {
    id: 'system-override',
    title: 'SYSTEM OVERRIDE',
    category: 'Visual Project',
    description: 'Morphic AI cinematic project demonstrating visual-to-rhythm synchronization. The Future Is Not a Choice. It Is a Command.',
    icon: Film,
    image: 'https://img.itch.zone/aW1nLzI1Mjk4MjcxLmpwZw==/original/WKf1cY.jpg',
    link: 'https://id01t.itch.io/',
    features: ['AI-Native Production', 'Cybernetic Study', 'Binary Heart', 'Visual Glitch Synchronization'],
    color: 'purple'
  },
  {
    id: 'project-neuro-glitch',
    title: 'PROJECT NEURO_GLITCH',
    category: 'Interactive Experience',
    description: 'Playable breach into the ROOT_ACCESS universe. Merging game design with high-fidelity industrial noise.',
    icon: Gamepad2,
    image: 'https://img.itch.zone/aW1nLzI1Mjk4MjcxLmpwZw==/original/WKf1cY.jpg',
    link: 'https://id01t.itch.io/',
    features: ['Interactive Narrative', 'Immersive Gameplay', 'ROOT_ACCESS Universe', 'Industrial Sound Design'],
    color: 'pink'
  },
  {
    id: 'ra7-creator',
    title: 'RA 7 Conscious Creator System',
    category: 'Software',
    description: 'AI-native creative tools that enable the musical output. Production infrastructure for the future of creativity.',
    icon: Code,
    image: 'https://source.boomplaymusic.com/group10/M00/03/27/0b7743ced3714a4c839832108f918d7cH3000W3000_320_320.jpg',
    link: '#',
    features: ['AI Co-Director', 'Generative Workflows', 'Creative Empowerment', 'Windows Utilities'],
    color: 'green'
  }
];

const jessDamagedBooks: Book[] = [
  {
    id: 'syntax-error-book',
    title: 'SYNTAX_ERROR',
    subtitle: 'The Jess Damaged Archives - Volume 1',
    description: 'The definitive literary entry point into the ROOT_ACCESS universe.',
    link: 'https://play.google.com/store/books/details/Guillaume_Lessard_SYNTAX_ERROR?id=DfG4EQAAQBAJ&hl=en',
    color: 'cyan'
  },
  {
    id: 'brute-force-book',
    title: 'BRUTE_FORCE',
    subtitle: 'The Jess Damaged Archives - Volume 2',
    description: 'The tactical and psychological collapse of digital sovereignty continues.',
    link: 'https://play.google.com/store/books/details/Guillaume_Lessard_BRUTE_FORCE?id=5Gu6EQAAQBAJ',
    color: 'pink'
  },
  {
    id: 'root-access-book',
    title: 'ROOT_ACCESS',
    subtitle: 'The Jess Damaged Archives - Volume 3',
    description: 'The culmination of the Echo Protocol framework.',
    link: 'https://play.google.com/store/books/details/Guillaume_Lessard_ROOT_ACCESS?id=PG26EQAAQBAJ',
    color: 'gold'
  }
];

const TransmediaCard = ({ item, index }: { item: TransmediaItem; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string; gradient: string }> = {
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/20',
      gradient: 'from-cyan-500 to-blue-500'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/20',
      gradient: 'from-purple-500 to-pink-500'
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      glow: 'shadow-pink-500/20',
      gradient: 'from-pink-500 to-rose-500'
    },
    green: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
      gradient: 'from-emerald-500 to-teal-500'
    }
  };

  const colors = colorClasses[item.color];

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${colors.glow} h-full`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${colors.bg} ${colors.border} border`}>
            <span className={`text-xs font-medium ${colors.text}`}>{item.category}</span>
          </div>

          {/* Icon */}
          <div className={`absolute bottom-4 right-4 w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {item.features.map((feature, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded text-xs ${colors.bg} ${colors.text}`}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm ${colors.text} hover:underline`}
          >
            Explore
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

const BookCard = ({ book, index }: { book: Book; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
    gold: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
  };

  const colors = colorClasses[book.color];

  return (
    <a
      ref={cardRef}
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`glass-panel rounded-xl p-5 transition-all duration-300 hover:shadow-lg ${colors.glow} ${colors.border} border h-full`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
            <BookOpen className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className="flex-1">
            <h4 className={`font-bold text-white font-['Orbitron'] group-hover:${colors.text} transition-colors`}>
              {book.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1">{book.subtitle}</p>
            <p className="text-sm text-slate-500 mt-2">{book.description}</p>
            <div className={`inline-flex items-center gap-1 mt-3 text-xs ${colors.text}`}>
              <ExternalLink className="w-3 h-3" />
              <span>Google Play Books</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const Transmedia = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="transmedia"
      className="relative py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0f123d] to-[#0a0a0f]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Beyond Music</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Orbitron']">
            The <span className="text-gradient-cyber">Transmedia</span> Universe
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            The ROOT_ACCESS universe extends far beyond musical composition into a fully realized 
            transmedia ecosystem—where music, fiction, software, and visual art converge.
          </p>
        </div>

        {/* Ecosystem Diagram */}
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="glass-panel rounded-2xl p-8">
            <div className="grid md:grid-cols-5 gap-6 items-center">
              {/* Center: Music */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Terminal className="w-10 h-10 text-white" />
                </div>
                <span className="mt-3 text-white font-semibold font-['Orbitron']">Music</span>
                <span className="text-xs text-slate-500">9 Albums</span>
              </div>

              {/* Connections */}
              <div className="hidden md:flex md:col-span-3 justify-center">
                <div className="relative w-full max-w-md">
                  {/* Connection Lines */}
                  <svg className="w-full h-32" viewBox="0 0 400 100">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                    {/* Center to top */}
                    <path d="M200 50 L200 10" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" />
                    {/* Center to left */}
                    <path d="M200 50 L50 50" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" />
                    {/* Center to right */}
                    <path d="M200 50 L350 50" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" />
                    {/* Center to bottom */}
                    <path d="M200 50 L200 90" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" />
                    
                    {/* Nodes */}
                    <circle cx="200" cy="50" r="8" fill="#8b5cf6" />
                    <circle cx="200" cy="10" r="6" fill="#06b6d4" />
                    <circle cx="50" cy="50" r="6" fill="#ec4899" />
                    <circle cx="350" cy="50" r="6" fill="#10b981" />
                    <circle cx="200" cy="90" r="6" fill="#f59e0b" />
                  </svg>
                  
                  {/* Labels */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-center">
                    <span className="text-xs text-cyan-400">Visuals</span>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-center">
                    <span className="text-xs text-pink-400">Fiction</span>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-center">
                    <span className="text-xs text-emerald-400">Software</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                    <span className="text-xs text-amber-400">Games</span>
                  </div>
                </div>
              </div>

              {/* Right side placeholder for mobile */}
              <div className="md:col-span-1" />
            </div>

            {/* Ecosystem Description */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                The transmedia architecture is constitutive rather than promotional: 
                the ROOT_ACCESS album cannot be fully understood without reference to the 
                SYNTAX_ERROR fiction and SYSTEM_OVERRIDE visuals with which it is explicitly associated.
              </p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {transmediaItems.map((item, index) => (
            <TransmediaCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Jess Damaged Archives - Google Books */}
        <div 
          className={`mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white font-['Orbitron']">
              The Jess Damaged Archives
            </h3>
          </div>
          <p className="text-slate-400 mb-6 max-w-2xl">
            The definitive cyberpunk eBook trilogy that serves as the literary entry point into the ROOT_ACCESS universe. 
            Available on Google Play Books.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {jessDamagedBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>

        {/* iD01t Itch.io Apps */}
        <div 
          className={`mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold text-white font-['Orbitron']">
              iD01t Apps & Games
            </h3>
          </div>
          <p className="text-slate-400 mb-6 max-w-2xl">
            Explore the complete collection of iD01t Productions software, games, and digital experiences on itch.io.
          </p>
          
          {/* itch.io Embed */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://id01t.itch.io/"
                title="iD01t Productions on itch.io"
                className="w-full h-full border-0"
                allow="fullscreen"
              />
            </div>
            <div className="p-4 bg-[#0a0a0f]/50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">iD01t Productions</h4>
                <p className="text-sm text-slate-400">Games, software, and digital experiences</p>
              </div>
              <a
                href="https://id01t.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Store
              </a>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div 
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <blockquote className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <Cpu className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-xl text-slate-300 italic leading-relaxed">
              "A Canadian creative technology studio uniting software engineering, 
              artificial intelligence, music, and publishing into a single ecosystem 
              designed to empower creators worldwide."
            </p>
            <footer className="mt-4 text-sm text-slate-500">
              — iD01t Productions Mission Statement
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Transmedia;
