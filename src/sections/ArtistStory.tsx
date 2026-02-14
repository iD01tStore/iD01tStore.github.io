import { useEffect, useRef, useState } from 'react';
import { Cpu, Brain, Sparkles, Quote, Terminal, Code } from 'lucide-react';

const ArtistStory = () => {
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

  const philosophyPoints = [
    {
      icon: Brain,
      title: 'Thematic Integration',
      description: 'Album concepts explicitly explore human-machine relationships, with track titles and sequencing that mirror computational processes.',
      color: 'cyan'
    },
    {
      icon: Terminal,
      title: 'Production Transparency',
      description: 'AI collaboration is explicitly acknowledged and dramatized, with "Echo" identified as "AI co-director" from the project\'s inception.',
      color: 'purple'
    },
    {
      icon: Code,
      title: 'Formal Construction',
      description: 'Musical works are structured to mirror computational systems, with album sequencing that suggests boot sequences and privilege escalation.',
      color: 'pink'
    }
  ];

  const timeline = [
    {
      date: 'March 2025',
      event: 'Final Transmission',
      description: 'AI awakening origin myth'
    },
    {
      date: 'April 2025',
      event: 'Signal Detected',
      description: 'Human-system interface established'
    },
    {
      date: 'May 2025',
      event: 'Echo Protocol',
      description: 'Maximum expansion - 58 minutes, 18 tracks'
    },
    {
      date: 'July 2025',
      event: 'No Master Needed',
      description: 'Error states as resistance'
    },
    {
      date: 'August 2025',
      event: 'Anura Voidwalker',
      description: 'Psychedelic transmigration'
    },
    {
      date: 'October 2025',
      event: 'Cosmic Echoes',
      description: 'Collective ascent'
    },
    {
      date: 'January 2026',
      event: 'ROOT_ACCESS',
      description: 'System override complete'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="story"
      className="relative py-24 bg-gradient-to-b from-[#0a0a0f] via-[#16185c]/20 to-[#0a0a0f]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">The Artist</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-['Orbitron']">
            Technology as <span className="text-gradient-cyber">Narrative Medium</span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            DJ iD01t represents a distinctive creative entity operating at the intersection 
            of electronic music production, artificial intelligence collaboration, and cyberpunk narrative construction.
          </p>
        </div>

        {/* Quote */}
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <blockquote className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto relative">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-cyan-400/30" />
            <p className="text-xl md:text-2xl text-slate-300 italic leading-relaxed text-center pt-4">
              "A Canadian creative technology studio uniting software engineering, 
              artificial intelligence, music, and publishing into a single ecosystem 
              designed to empower creators worldwide."
            </p>
            <footer className="mt-6 text-center">
              <span className="text-cyan-400 font-medium">— iD01t Productions</span>
              <span className="text-slate-500 text-sm ml-2">Mission Statement</span>
            </footer>
          </blockquote>
        </div>

        {/* Philosophy Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {philosophyPoints.map((point, index) => {
            const Icon = point.icon;
            const colors: Record<string, { bg: string; text: string; border: string }> = {
              cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
              purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
              pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' }
            };
            const color = colors[point.color];

            return (
              <div
                key={point.title}
                className={`glass-panel rounded-2xl p-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${color.bg} ${color.border} border flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color.text}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-['Orbitron']">{point.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center font-['Orbitron']">
            The 11-Month Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 md:-translate-x-1/2" />
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.event}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-panel rounded-xl p-4 inline-block">
                      <span className="text-xs text-cyan-400 font-mono">{item.date}</span>
                      <h4 className="text-lg font-bold text-white font-['Orbitron'] mt-1">{item.event}</h4>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#0a0a0f] md:-translate-x-1/2 mt-6" />
                  
                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Collaboration Highlight */}
        <div 
          className={`mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-12 h-12 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">
                  AI Co-Director: Echo
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  From the very first album, DJ iD01t established a human-machine collaborative model 
                  with "Echo" as AI co-director. This isn't just a tool—it's a genuine creative partnership 
                  that explores consciousness, autonomy, and technological embodiment with unique authenticity.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/30">
                    Generative Workflows
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/30">
                    Synthetic Visuals
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm border border-pink-500/30">
                    Character Consistency
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistStory;
