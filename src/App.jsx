import { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        user={user}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
      />
      
      <div className="flex flex-1 h-full pt-16">
        {isProtectedRoute && (
          <aside 
            className={`
              fixed top-16 left-0 bottom-0
              w-64
              bg-white shadow-lg
              overflow-y-auto
              transition-transform duration-300 ease-in-out
              z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            />
          </aside>
        )}
        
        <main 
          className={`
            flex-1
            overflow-y-auto
            ${isProtectedRoute ? 'md:ml-64' : ''}
            w-full
            flex flex-col
          `}
        >
          <div className="flex-1 container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export { App as default, ProtectedRoute };
