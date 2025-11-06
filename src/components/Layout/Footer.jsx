// src/components/Layout/Footer.jsx
import React from 'react';
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8" />
              <h3 className="text-2xl font-bold">MovieStore</h3>
            </div>
            <p className="text-purple-200 mb-4">
              Your ultimate destination for booking movie tickets online. Experience the magic of cinema with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-300 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-300 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-300 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-300 transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-purple-200 hover:text-white transition">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link to="/my-reservations" className="text-purple-200 hover:text-white transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Help & Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-purple-200">
                  123 Cinema Street, Movie City, MC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-purple-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-purple-200">support@moviestore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm mb-4 md:mb-0">
              © {currentYear} MovieStore. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-purple-200">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;