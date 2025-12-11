import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, full_name: '' }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('You are already subscribed!');
        } else {
          throw error;
        }
      } else {
        setMessage('Successfully subscribed to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/image.png"
                alt="Benbol Global Services Ltd"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm mb-4">
              Your trusted community pharmacy committed to providing quality healthcare products and professional pharmaceutical services.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/benbolpharmacy" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/benbolpharmacy" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/benbolpharmacy" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/benbolpharmacy" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2349167858304" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-teal-400 transition-colors">
                  Health Resources
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-teal-400 transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-teal-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-teal-400 mt-0.5" />
                <a href="tel:09167858304" className="hover:text-teal-400 transition-colors">
                  09167858304
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-teal-400 mt-0.5" />
                <a href="mailto:info@benbolpharmacy.com" className="hover:text-teal-400 transition-colors">
                  info@benbolpharmacy.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                <span>Vickie's Plaza, Lekki-Epe Expressway, Opposite Crown Estate, Sangotedo, Lagos State</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <p>Mon-Sat: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 9:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive health tips and pharmacy updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <p className={`text-sm ${message.includes('Success') ? 'text-green-400' : 'text-yellow-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Benbol Pharmacy. All rights reserved.</p>
          <p className="mt-2 text-gray-500">Licensed Pharmacy - Professional Healthcare Services</p>
        </div>
      </div>
    </footer>
  );
}
