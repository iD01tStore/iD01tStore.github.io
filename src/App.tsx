import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import FeaturedRelease from './sections/FeaturedRelease';
import Albums from './sections/Albums';
import MusicVideos from './sections/MusicVideos';
import Transmedia from './sections/Transmedia';
import Platforms from './sections/Platforms';
import ArtistStory from './sections/ArtistStory';
import { Disc, BookOpen, Gamepad2, Headphones, Sparkles, Film } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading sequence
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center z-50">
        {/* Loading Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-24 h-24 rounded-full border-2 border-cyan-500/20 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-cyan-400 rounded-full" />
          </div>
          
          {/* Middle Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-purple-500/20 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-purple-400 rounded-full" />
          </div>
          
          {/* Inner Ring */}
          <div className="absolute inset-4 rounded-full border-2 border-pink-500/20 animate-spin" style={{ animationDuration: '1.5s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-pink-400 rounded-full" />
          </div>
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white font-['Orbitron']">iD</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-slate-500 font-mono">
              INITIALIZING PROTOCOL... {loadingProgress}%
            </span>
          </div>
        </div>

        {/* Loading Messages */}
        <div className="mt-4 h-6">
          {loadingProgress < 30 && (
            <span className="text-sm text-cyan-400 animate-pulse">Loading audio assets...</span>
          )}
          {loadingProgress >= 30 && loadingProgress < 60 && (
            <span className="text-sm text-purple-400 animate-pulse">Establishing neural link...</span>
          )}
          {loadingProgress >= 60 && loadingProgress < 90 && (
            <span className="text-sm text-pink-400 animate-pulse">Synchronizing with Echo...</span>
          )}
          {loadingProgress >= 90 && (
            <span className="text-sm text-green-400 animate-pulse">System ready</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Header />
      
      <main>
        <Hero />
        <FeaturedRelease />
        <Albums />
        <MusicVideos />
        <Transmedia />
        <ArtistStory />
        <Platforms />
        
        {/* Final CTA Section */}
        <section className="relative py-24 bg-gradient-to-br from-purple-900 via-[#16185c] to-[#0a0a0f]">
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Welcome to the Protocol</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-['Orbitron']">
              Experience the <span className="text-gradient-cyber">Journey</span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of listeners worldwide who have discovered the emotional depth 
              and cinematic power of DJ iD01t's music. From AI awakening to system override—
              the signal is waiting for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://open.spotify.com/artist/0EihiI3hgiPfIiyb154dgB"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber flex items-center justify-center gap-2"
              >
                <Disc className="w-5 h-5" />
                Follow on Spotify
              </a>
              <a 
                href="#albums"
                className="px-8 py-4 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                <Headphones className="w-5 h-5" />
                Explore Albums
              </a>
            </div>

            {/* Quick Links */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <a href="#albums" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                <Disc className="w-4 h-4" />
                <span className="text-sm">Music</span>
              </a>
              <a href="#videos" className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
                <Film className="w-4 h-4" />
                <span className="text-sm">Videos</span>
              </a>
              <a href="#transmedia" className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">eBooks</span>
              </a>
              <a href="#transmedia" className="flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors">
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm">Games</span>
              </a>
              <a href="#platforms" className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
                <Headphones className="w-4 h-4" />
                <span className="text-sm">Stream</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
