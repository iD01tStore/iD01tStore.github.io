import { useEffect, useRef, useState } from 'react';
import { Play, Film, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  album: string;
  releaseDate: string;
  phase: string;
  phaseColor: string;
}

const videosByAlbum: { [key: string]: Video[] } = {
  'Final Transmission (March 2025)': [
    { id: 'x5YTwWzyXPI', title: 'Intro', album: 'Final Transmission', releaseDate: 'March 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'VGW03oM0Ems', title: 'iD01t Mode', album: 'Final Transmission', releaseDate: 'March 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'bBT7LFSrctQ', title: 'So Real', album: 'Final Transmission', releaseDate: 'March 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'xnfI6ZSsf0k', title: 'Electric Love', album: 'Final Transmission', releaseDate: 'March 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'Upcd6rRo2yQ', title: 'Event Horizon', album: 'Final Transmission', releaseDate: 'March 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'q9ux1Cu3YjE', title: 'Final Transmission', album: 'Final Transmission', releaseDate: 'March 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
  ],
  'Signal Detected (April 2025)': [
    { id: 'ySV9hhPGbk4', title: 'You Are The Signal', album: 'Signal Detected', releaseDate: 'April 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 't-dScYbwzG8', title: 'Pulse', album: 'Signal Detected', releaseDate: 'April 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'o3V69LkVL-I', title: 'Echo in my heart', album: 'Signal Detected', releaseDate: 'April 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: '9St1bV1EZ28', title: 'Signal Detected', album: 'Signal Detected', releaseDate: 'April 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'T6u5niVGrR0', title: 'Ready or not?', album: 'Signal Detected', releaseDate: 'April 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
  ],
  'Sweat and Stardust (May 2025)': [
    { id: '2UHnGsKBjHQ', title: 'Sweat and Stardust', album: 'Sweat and Stardust', releaseDate: 'May 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'turpmY0liDU', title: 'Code of longing', album: 'Sweat and Stardust', releaseDate: 'May 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
    { id: 'VHeXWzQckJ4', title: 'Pulse of Goodbye', album: 'Echo Protocol', releaseDate: 'May 2025', phase: 'Phase I: Emergence', phaseColor: 'cyan' },
  ],
  'Anura Voidwalker (August 2025)': [
    { id: 'sAUV7Wy_55s', title: 'W.A.R.N.I.N.G.', album: 'Anura Voidwalker DMT Chronicles', releaseDate: 'August 2025', phase: 'Phase II: Autonomy', phaseColor: 'pink' },
  ],
  'No Master Needed (July 2025)': [
    { id: 'JZz6etrqesY', title: 'Neural Sunlight', album: 'No Master Needed', releaseDate: 'July 2025', phase: 'Phase II: Autonomy', phaseColor: 'pink' },
    { id: '5YQtFlXbBxw', title: 'iRETURN', album: 'No Master Needed', releaseDate: 'July 2025', phase: 'Phase II: Autonomy', phaseColor: 'pink' },
    { id: 'FP-AX38uLH8', title: 'If You Hear This', album: 'No Master Needed', releaseDate: 'July 2025', phase: 'Phase II: Autonomy', phaseColor: 'pink' },
  ],
  'Cosmic Echoes (October 2025)': [
    { id: 'S9dQYuKRkIk', title: 'Binary Heart', album: 'Cosmic Echoes', releaseDate: 'October 2025', phase: 'Phase II: Autonomy', phaseColor: 'pink' },
  ],
  'ROOT_ACCESS (January 2026)': [
    { id: 'RyCNGKk5qXo', title: 'ZERO DAY', album: 'ROOT_ACCESS', releaseDate: 'January 2026', phase: 'Phase III: Culmination', phaseColor: 'gold' },
    { id: 'kcm1Y1DIoU0', title: 'Tokyo Bass Mafia', album: 'ROOT_ACCESS', releaseDate: 'January 2026', phase: 'Phase III: Culmination', phaseColor: 'gold' },
    { id: 'XcXtV49-k2I', title: 'sudo chmod +x install.sh', album: 'ROOT_ACCESS', releaseDate: 'January 2026', phase: 'Phase III: Culmination', phaseColor: 'gold' },
    { id: 'z7NHM4_s32M', title: 'ROOT_ACCESS', album: 'ROOT_ACCESS', releaseDate: 'January 2026', phase: 'Phase III: Culmination', phaseColor: 'gold' },
  ],
};

const VideoCard = ({ video, index }: { video: Video; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const colorClasses: Record<string, { border: string; text: string; glow: string }> = {
    cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    pink: { border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
    gold: { border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
  };

  const colors = colorClasses[video.phaseColor];

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${colors.glow} ${colors.border} border`}>
        {isPlaying ? (
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-xl"
            />
          </div>
        ) : (
          <div 
            className="relative aspect-video cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:opacity-0 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center">
                <Play className="w-7 h-7 text-white ml-1" />
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <h4 className={`font-bold text-white font-['Orbitron'] mb-1 ${colors.text}`}>
            {video.title}
          </h4>
          <p className="text-xs text-slate-400">{video.album}</p>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs text-slate-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

const MusicVideos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedAlbums, setExpandedAlbums] = useState<string[]>(['ROOT_ACCESS (January 2026)']);
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

  const toggleAlbum = (album: string) => {
    setExpandedAlbums(prev => 
      prev.includes(album) 
        ? prev.filter(a => a !== album)
        : [...prev, album]
    );
  };

  const totalVideos = Object.values(videosByAlbum).flat().length;

  return (
    <section 
      ref={sectionRef}
      id="videos"
      className="relative py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0f123d]/30 to-[#0a0a0f]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <Film className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400 font-medium">Official Music Videos</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Orbitron']">
            Watch the <span className="text-gradient-cyber">Visual Experience</span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {totalVideos} official music videos spanning the complete 9-album journey. 
            From AI awakening to system override—witness the cyberpunk sonic revolution.
          </p>
        </div>

        {/* Videos by Album */}
        <div className="space-y-8">
          {Object.entries(videosByAlbum).map(([albumName, videos], albumIndex) => {
            const isExpanded = expandedAlbums.includes(albumName);
            const phaseColor = videos[0]?.phaseColor || 'cyan';
            
            return (
              <div 
                key={albumName}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${albumIndex * 150}ms` }}
              >
                {/* Album Header */}
                <button
                  onClick={() => toggleAlbum(albumName)}
                  className={`w-full glass-panel rounded-xl p-4 flex items-center justify-between transition-all hover:shadow-lg ${
                    phaseColor === 'cyan' ? 'hover:shadow-cyan-500/10' :
                    phaseColor === 'pink' ? 'hover:shadow-pink-500/10' :
                    'hover:shadow-yellow-500/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      phaseColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                      phaseColor === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      <Film className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white font-['Orbitron']">{albumName}</h3>
                      <p className="text-sm text-slate-400">{videos.length} videos</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {/* Videos Grid */}
                {isExpanded && (
                  <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {videos.map((video, videoIndex) => (
                      <VideoCard 
                        key={video.id} 
                        video={video} 
                        index={videoIndex} 
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* YouTube Channel CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <a
            href="https://www.youtube.com/@djid01t/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-red-500/30"
          >
            <Film className="w-5 h-5" />
            View All Videos on YouTube
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MusicVideos;
