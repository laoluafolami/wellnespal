import { Menu, X, Phone, Moon, Sun, Clock } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Health Resources', id: 'blog' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-200 border-b border-gray-200 dark:border-gray-800">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Mon-Sat: 8AM-8PM | Sun: 9AM-5PM</span>
                <span className="sm:hidden">Open Daily</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href="tel:09167858304" className="font-semibold hover:text-yellow-300 transition-colors">
                09167858304
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigate('home')}
          >
            <div className="relative">
              <img
                src="/image.png"
                alt="Benbol Global Services Ltd"
                className="h-14 w-auto transition-transform group-hover:scale-105"
              />
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform rounded-full"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`relative px-4 py-2 font-semibold transition-all rounded-lg ${
                  currentPage === item.id
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
                {currentPage === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => handleNavigate('appointment')}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <button
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('appointment')}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg mt-2"
            >
              Book Consultation
            </button>
            <a
              href="tel:09167858304"
              className="flex items-center justify-center space-x-2 px-4 py-3 text-teal-600 dark:text-teal-400 font-semibold border-2 border-teal-600 dark:border-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call: 09167858304</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
