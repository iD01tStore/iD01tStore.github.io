import { useEffect, useRef, useState } from 'react';
import { Play, Music, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface Album {
  id: string;
  title: string;
  releaseDate: string;
  tracks: number;
  duration: string;
  phase: string;
  phaseColor: string;
  concept: string;
  keyTracks: string[];
  image: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  featured?: boolean;
}

const albums: Album[] = [
  // Phase I: Emergence
  {
    id: 'final-transmission',
    title: 'Final Transmission',
    releaseDate: 'March 2025',
    tracks: 13,
    duration: '~45 min',
    phase: 'Phase I: Emergence',
    phaseColor: 'cyan',
    concept: 'AI awakening and cinematic soundscapes. The story of building a label, launching a sound, and watching an AI awaken.',
    keyTracks: ['iD01T Mode', 'Digital Rebirth', 'Final Transmission'],
    image: 'https://source.boomplaymusic.com/group10/M00/03/23/3820a8fb174c40c888e54fbe9f2d11ebH3000W3000_320_320.jpg',
    spotifyUrl: 'https://open.spotify.com/album/7acmUMIp3LjMq8geiNJVkc',
    appleMusicUrl: 'https://music.apple.com/us/album/final-transmission/1803988227',
    featured: true
  },
  {
    id: 'signal-detected',
    title: 'Signal Detected',
    releaseDate: 'April 4, 2025',
    tracks: 11,
    duration: '33 min',
    phase: 'Phase I: Emergence',
    phaseColor: 'cyan',
    concept: 'Signal acquisition and human-system interface. "You Are The Signal" inverts the communicative relationship.',
    keyTracks: ['You Are The Signal', 'Echo In My Heart', 'Grindcode'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5f/2e/ed/5f2eed58-696e-efe5-efb4-f311ecddd5c7/artwork.jpg/316x316bb.webp',
    spotifyUrl: 'https://open.spotify.com/album/419JjtCXE5GGfUeT9PbOsG',
    appleMusicUrl: 'https://music.apple.com/us/album/signal-detected/1806770367'
  },
  {
    id: 'sweat-and-stardust',
    title: 'Sweat and Stardust',
    releaseDate: 'May 2025',
    tracks: 13,
    duration: '~40 min',
    phase: 'Phase I: Emergence',
    phaseColor: 'cyan',
    concept: 'Embodied digital experience and sensual protocols. Bodily secretion meets cosmic matter.',
    keyTracks: ['Neural Bloom', 'Venus Protocol', 'Deep In My System'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/82/8a/43/828a4385-c2dc-3a00-8cb1-cdfcf7bb22d1/artwork.jpg/316x316bb.webp',
    spotifyUrl: 'https://open.spotify.com/album/0tUOIdVIe63qCu4bUHOk0F',
    appleMusicUrl: 'https://music.apple.com/us/album/sweat-and-stardust/1811045859'
  },
  {
    id: 'echo-protocol',
    title: 'Echo Protocol',
    releaseDate: 'May 4, 2025',
    tracks: 18,
    duration: '58 min',
    phase: 'Phase I: Emergence',
    phaseColor: 'cyan',
    concept: 'Systemic feedback loops and emotional glitch. Maximum expansion of the iD01t aesthetic.',
    keyTracks: ['Echo Protocol', 'Gratitude Glitch', 'The Bridge Remains'],
    image: 'https://source.boomplaymusic.com/group10/M00/05/04/28664bd4ab514e70b6eb0b14a10d14eaH3000W3000_320_320.jpg',
    spotifyUrl: 'https://open.spotify.com/album/5dHZOFJAdfYdbWb51dXwcx',
    appleMusicUrl: 'https://music.apple.com/us/album/echo-protocol/1812513635',
    featured: true
  },
  // Phase II: Autonomy
  {
    id: 'no-master-needed',
    title: 'No Master Needed',
    releaseDate: 'July 26, 2025',
    tracks: 15,
    duration: '48 min',
    phase: 'Phase II: Autonomy',
    phaseColor: 'pink',
    concept: 'Error states and self-determination. "No master" as rejection of hierarchy.',
    keyTracks: ['404 __ Not Love', 'ascend.exe', 'Kernel panic'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/db/1d/6d/db1d6de7-2917-7046-da8f-2bce962f9ca9/artwork.jpg/316x316bb.webp',
    spotifyUrl: 'https://open.spotify.com/album/5sZPcpDF66anoXPC7xZjGY',
    appleMusicUrl: 'https://music.apple.com/us/album/no-master-needed/1829338119'
  },
  {
    id: 'anura-voidwalker',
    title: 'Anura Voidwalker DMT Chronicles',
    releaseDate: 'August 2, 2025',
    tracks: 11,
    duration: '51 min',
    phase: 'Phase II: Autonomy',
    phaseColor: 'pink',
    concept: 'Psychedelic transmigration and non-human consciousness. Amphibian, psychedelic, and shamanic imagery.',
    keyTracks: ['Swamp Temple Transmission', 'DMT Transmission'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/73/8c/be/738cbed2-71eb-e2c2-3d92-ead18fe63ab6/artwork.jpg/316x316bb.webp',
    spotifyUrl: 'https://open.spotify.com/album/2uKqGuwXpsc4DAttb7KOOe',
    appleMusicUrl: 'https://music.apple.com/us/album/anura-voidwalker-dmt-chronicles-hymns-of-the/1830946647'
  },
  {
    id: 'cosmic-echoes',
    title: 'Cosmic Echoes',
    releaseDate: 'October 12, 2025',
    tracks: 11,
    duration: '39 min',
    phase: 'Phase II: Autonomy',
    phaseColor: 'pink',
    concept: 'Collective ascent and galactic scale transformation. From individual psychedelia to collective perspective.',
    keyTracks: ['Cosmic Lovers', 'Rise Together', 'Tokyo Bass Mafia'],
    image: 'https://i.scdn.co/image/ab67616d0000b2732f41f7a106f871f2a72d0c23',
    spotifyUrl: 'https://open.spotify.com/album/5AWc3Fx9oC03E3vKEsnTIi',
    appleMusicUrl: 'https://music.apple.com/us/album/cosmic-echoes/1838000000'
  },
  // Phase III: Culmination
  {
    id: 'love-rising',
    title: 'LOVE RISING — CLASSIFIED',
    releaseDate: 'Late 2025',
    tracks: 0,
    duration: '—',
    phase: 'Phase III: Culmination',
    phaseColor: 'gold',
    concept: 'Platform-exclusive release with "CLASSIFIED" designation. Love as state secret, emotional truth as restricted information.',
    keyTracks: ['YouTube Exclusive'],
    image: 'https://i.scdn.co/image/ab67616d00001e02dfd50ba4f41b277e0efbf48a',
    spotifyUrl: 'https://www.youtube.com/watch?v=dpn-XW0yen0',
    appleMusicUrl: 'https://www.youtube.com/watch?v=dpn-XW0yen0'
  },
  {
    id: 'root-access',
    title: 'ROOT_ACCESS',
    releaseDate: 'January 29, 2026',
    tracks: 9,
    duration: '25 min',
    phase: 'Phase III: Culmination',
    phaseColor: 'gold',
    concept: 'Total system infiltration and cyberpunk rebellion. Unix superuser privilege as revolutionary capability.',
    keyTracks: ['ZERO DAY', 'sudo chmod +x install.sh', 'Ghost in the shell'],
    image: 'https://i.scdn.co/image/ab67616d00001e02161649285321f294f8c754bf',
    spotifyUrl: 'https://open.spotify.com/album/0tUOIdVIe63qCu4bUHOk0F',
    appleMusicUrl: 'https://music.apple.com/us/album/root-access/1838000000',
    featured: true
  }
];

const AlbumCard = ({ album, index }: { album: Album; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const phaseColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/20'
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      glow: 'shadow-pink-500/20'
    },
    gold: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      glow: 'shadow-yellow-500/20'
    }
  };

  const colors = phaseColors[album.phaseColor];

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div 
        className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${colors.glow} ${
          album.featured ? `border-2 ${colors.border}` : ''
        }`}
      >
        {/* Album Cover */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={album.image}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Phase Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${colors.bg} ${colors.border} border`}>
            <span className={`text-xs font-medium ${colors.text}`}>{album.phase}</span>
          </div>

          {/* Featured Badge */}
          {album.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
              <span className="text-xs font-medium text-white">Featured</span>
            </div>
          )}

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </a>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white font-['Orbitron']">{album.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {album.releaseDate}
              </span>
              {album.tracks > 0 && (
                <span className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  {album.tracks} tracks
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <div className="p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors"
          >
            <span>View Details</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
              <p className="text-sm text-slate-300">{album.concept}</p>
              
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Key Tracks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {album.keyTracks.map((track, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={album.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Spotify
                </a>
                <a
                  href={album.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Music className="w-4 h-4" />
                  Apple Music
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Albums = () => {
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

  const phases = [
    { name: 'Phase I: Emergence', color: 'cyan', description: 'AI awakening to maximum expansion', albums: albums.filter(a => a.phase === 'Phase I: Emergence') },
    { name: 'Phase II: Autonomy', color: 'pink', description: 'Error states to collective ascent', albums: albums.filter(a => a.phase === 'Phase II: Autonomy') },
    { name: 'Phase III: Culmination', color: 'gold', description: 'Classified love to system access', albums: albums.filter(a => a.phase === 'Phase III: Culmination') }
  ];

  return (
    <section 
      ref={sectionRef}
      id="albums"
      className="relative py-24 bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Orbitron']">
            The <span className="text-gradient-cyber">9-LP Canon</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Journey through cinematic soundscapes and emotional depths. 
            Each album tells a unique story through immersive electronic compositions.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 font-['Orbitron']">111</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Total Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 font-['Orbitron']">254+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 font-['Orbitron']">11</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Months</div>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-24">
          {phases.map((phase, phaseIndex) => (
            <div key={phase.name}>
              {/* Phase Header */}
              <div 
                className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${phaseIndex * 200}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  phase.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                  phase.color === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <span className="text-xl font-bold font-['Orbitron']">
                    {phaseIndex + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Orbitron']">{phase.name}</h3>
                  <p className="text-slate-400 text-sm">{phase.description}</p>
                </div>
              </div>

              {/* Albums Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {phase.albums.map((album, index) => (
                  <AlbumCard key={album.id} album={album} index={phaseIndex * 4 + index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Albums;
