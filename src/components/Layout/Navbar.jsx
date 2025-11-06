// src/components/Layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, User, LogOut, Ticket, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl hover:text-purple-200 transition"
          >
            <Film className="w-8 h-8" />
            <span>MovieStore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/movies"
              className="hover:text-purple-200 transition font-medium"
            >
              Movies
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-reservations"
                  className="flex items-center space-x-1 hover:text-purple-200 transition font-medium"
                >
                  <Ticket className="w-4 h-4" />
                  <span>My Bookings</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 border-l border-purple-600 pl-4">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user?.name || user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="hover:text-purple-200 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-purple-700 rounded-lg transition"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/movies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:bg-purple-700 px-4 py-2 rounded-lg transition"
              >
                Movies
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-reservations"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>My Bookings</span>
                  </Link>

                  <div className="border-t border-purple-700 pt-3 px-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{user?.name || user?.username}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg transition w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;