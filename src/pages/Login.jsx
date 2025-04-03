import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Dummy validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Store dummy user data
      localStorage.setItem('user', JSON.stringify({
        name: 'Test User',
        email: formData.email
      }));

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#ffd82d]/5 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ffd82d]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ffd82d]/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl relative"
      >
        <div>
          <Link to="/" className="block text-center mb-8">
            <motion.span 
              className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Hire<span className="text-[#ffd82d]">Orbit</span>
            </motion.span>
          </Link>
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gray-900 hover:text-[#ffd82d] transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-700 p-3 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#ffd82d] focus:ring-[#ffd82d] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#ffd82d] focus:ring-[#ffd82d] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#ffd82d] focus:ring-[#ffd82d]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-gray-900 hover:text-[#ffd82d] transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            isFullWidth
            isLoading={isLoading}
            className="bg-[#ffd82d] hover:bg-[#ffd82d]/90 text-gray-900 font-medium py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;