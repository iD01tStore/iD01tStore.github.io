import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Music, Headphones, Gamepad2, Home, Film } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home', icon: Home },
    { href: '#albums', label: 'Music', icon: Music },
    { href: '#videos', label: 'Videos', icon: Film },
    { href: '#transmedia', label: 'Universe', icon: Gamepad2 },
    { href: '#platforms', label: 'Stream', icon: Headphones },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-purple-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#hero" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-bold text-lg font-['Orbitron']">iD</span>
            </div>
            <span className="font-semibold text-lg text-white hidden sm:block font-['Orbitron']">
              iD01t Productions
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-cyan-400"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Contact Button */}
            <a
              href="#platforms"
              className="hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium"
            >
              Follow
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-purple-500/20">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </a>
            );
          })}
          <a
            href="#platforms"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg mt-4"
          >
            Follow DJ iD01t
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
