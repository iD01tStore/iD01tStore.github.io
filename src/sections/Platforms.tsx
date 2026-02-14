import { useEffect, useRef, useState } from 'react';
import { 
  Music2, 
  Youtube, 
  Twitter, 
  Video,
  ExternalLink,
  Headphones,
  Radio
} from 'lucide-react';

interface Platform {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
  bgColor: string;
  description: string;
}

const platforms: Platform[] = [
  {
    name: 'Spotify',
    icon: Music2,
    url: 'https://open.spotify.com/artist/0EihiI3hgiPfIiyb154dgB',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20 hover:bg-green-500/30',
    description: 'Stream all 9 albums'
  },
  {
    name: 'Apple Music',
    icon: Headphones,
    url: 'https://music.apple.com/us/artist/dj-id01t/1803964475',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20 hover:bg-pink-500/30',
    description: 'High-quality audio'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/@djid01t',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20 hover:bg-red-500/30',
    description: 'Music videos & more'
  },
  {
    name: 'Deezer',
    icon: Radio,
    url: 'https://www.deezer.com/en/artist/312085201',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20 hover:bg-orange-500/30',
    description: 'Global streaming'
  },
  {
    name: 'X (Twitter)',
    icon: Twitter,
    url: 'https://twitter.com/DJiD01T',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20 hover:bg-blue-500/30',
    description: 'Latest updates'
  },
  {
    name: 'TikTok',
    icon: Video,
    url: 'https://www.tiktok.com/@dj_id01t',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20 hover:bg-cyan-500/30',
    description: 'Short clips'
  }
];

const PlatformCard = ({ platform, index }: { platform: Platform; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Icon = platform.icon;

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

  return (
    <a
      ref={cardRef}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${platform.bgColor} border border-white/5 hover:border-white/20`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${platform.bgColor} flex items-center justify-center transition-colors`}>
              <Icon className={`w-7 h-7 ${platform.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Orbitron'] group-hover:text-cyan-400 transition-colors">
                {platform.name}
              </h3>
              <p className="text-sm text-slate-400">{platform.description}</p>
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </a>
  );
};

const Platforms = () => {
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
      id="platforms"
      className="relative py-24 bg-[#0a0a0f]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Orbitron']">
            Follow <span className="text-gradient-cyber">DJ iD01t</span> Everywhere
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Stream, follow, and connect across all major platforms. 
            The signal is broadcasting on all frequencies.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <PlatformCard key={platform.name} platform={platform} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-['Orbitron']">
              Join the Protocol
            </h3>
            <p className="text-slate-400 mb-6">
              Be the first to know about new releases, exclusive content, and behind-the-scenes 
              access to the ROOT_ACCESS universe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://open.spotify.com/artist/0EihiI3hgiPfIiyb154dgB"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber flex items-center justify-center gap-2"
              >
                <Music2 className="w-5 h-5" />
                Follow on Spotify
              </a>
              <a
                href="https://www.youtube.com/@djid01t"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg border border-slate-600 text-slate-300 hover:border-red-400 hover:text-red-400 transition-all flex items-center justify-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div 
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
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
            <div className="text-3xl font-bold text-pink-400 font-['Orbitron']">6+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 font-['Orbitron']">∞</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platforms;
