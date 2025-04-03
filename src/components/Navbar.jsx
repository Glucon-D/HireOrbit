import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';

const Navbar = ({ onMenuClick }) => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {user && (
              <button 
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <Link to="/" className="flex items-center">
              <motion.span 
                className="text-2xl font-bold text-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                Hire<span className="text-[#ffd82d]">Orbit</span>
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ffd82d]/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-900">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700">{user.email}</span>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
                  >
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-[#ffd82d]/10 hover:text-gray-900">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-[#ffd82d]/10 hover:text-gray-900">
                      Profile
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#ffd82d]/10 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" className="hover:bg-[#ffd82d]/10">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#ffd82d] hover:bg-[#ffd82d]/90 text-gray-900">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with enhanced styling */}
      <motion.div 
        className={`sm:hidden shadow-lg border-t border-gray-100 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {user ? (
            <>
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffd82d]/20 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-900">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
              </div>
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-[#ffd82d]/10"
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-[#ffd82d]/10"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-[#ffd82d]/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-[#ffd82d]/10"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-[#ffd82d]/10"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;