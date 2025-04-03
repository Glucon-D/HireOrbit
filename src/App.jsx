import { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change only for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const isProtectedRoute = [
    '/dashboard',
    '/interview',
    '/reports',
    '/resume-feedback',
    '/profile'
  ].some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        user={user}
      />
      
      <div className="flex">
        {isProtectedRoute && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            className={`
              fixed md:static
              inset-y-0 left-0
              transform transition-transform duration-300
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
          />
        )}
        
        <main 
          className={`
            flex-1 transition-all duration-300
            ${isProtectedRoute ? 'md:ml-64' : ''}
            w-full
          `}
        >
          <div className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export { App as default, ProtectedRoute };
