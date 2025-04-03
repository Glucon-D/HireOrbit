import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Interview', path: '/interview', icon: '💬' },
    { name: 'Reports', path: '/reports', icon: '📈' },
    { name: 'Resume Feedback', path: '/resume-feedback', icon: '📝' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed top-0 left-0 z-50 h-full w-64 
          bg-[#fffefb] shadow-lg transform 
          lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex flex-col h-full">
          {/* Close button - mobile only */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-xl font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActiveRoute(item.path)
                    ? 'bg-[#ffeb85] text-gray-900'
                    : 'text-gray-700 hover:bg-[#ffeb85]/10 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {isActiveRoute(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="w-1 h-full absolute right-0 bg-[#ffeb85] rounded-l"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Footer Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#ffeb85] flex items-center justify-center">
                <span className="text-sm">👋</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500">Let's find your next hire</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;