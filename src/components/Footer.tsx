import { useEffect, useState } from 'react';
import { Disc, BookOpen, Gamepad2, Headphones, ShoppingBag, FileText, Shield, RefreshCw } from 'lucide-react';

const Footer = () => {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const productLinks = [
    { label: 'Windows Apps', href: '#', icon: ShoppingBag },
    { label: 'Technical eBooks', href: '#', icon: BookOpen },
    { label: 'Audiobooks', href: '#', icon: Headphones },
    { label: 'Online Games', href: '#', icon: Gamepad2 },
    { label: 'Original Music', href: '#albums', icon: Disc },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '#' },
    { label: 'Store', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Newsletter', href: '#' },
  ];

  const legalLinks = [
    { label: 'Terms of Service', href: '#', icon: FileText },
    { label: 'Privacy Policy', href: '#', icon: Shield },
    { label: 'Refund Policy', href: '#', icon: RefreshCw },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-cyan-500/20 overflow-hidden">
      {/* Animated Border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
      </div>

      {/* Background Data Stream */}
      <div className="data-stream" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white font-bold text-lg font-['Orbitron']">iD</span>
              </div>
              <span className="font-semibold text-lg text-white font-['Orbitron']">
                iD01t Productions
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed">
              A Canadian creative technology studio uniting software engineering, 
              artificial intelligence, music, and publishing into a single ecosystem 
              designed to empower creators worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs terminal-text">
              <span className="w-2 h-2 bg-green-500 rounded-full status-pulse" />
              <span>All systems operational</span>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-['Orbitron'] text-sm tracking-wider">
              PRODUCTS
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-['Orbitron'] text-sm tracking-wider">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-['Orbitron'] text-sm tracking-wider">
              LEGAL
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {year} iD01t Productions. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                System Status: Online
              </span>
              <span className="text-slate-600">|</span>
              <span className="terminal-text text-xs">
                PROTOCOL v9.0.1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
    </footer>
  );
};

export default Footer;
