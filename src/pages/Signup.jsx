import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signup } from '../lib/appwrite';
import Button from '../components/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate' // Changed default to candidate
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      const { user } = await signup(
        formData.email, 
        formData.password,
        formData.fullName
      );
      
      localStorage.setItem('user', JSON.stringify(user));
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
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ffd82d]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ffd82d]/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-10 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl relative"
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
            Create your account
          </h2>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-gray-900 hover:text-[#ffd82d] transition-colors">
              Sign in
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

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {[
              { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
              { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
              { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' }
            ].map(field => (
              <div key={field.name} className="space-y-4">
                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-900">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 rounded-xl border-gray-200 shadow-sm focus:border-[#ffd82d] focus:ring-[#ffd82d] transition-colors text-base"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="space-y-4">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-900">
                I am a
              </label>
              <div className="space-y-2">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 rounded-xl border-gray-200 shadow-sm focus:border-[#ffd82d] focus:ring-[#ffd82d] transition-colors text-base"
                >
                  <option value="candidate">Job Seeker</option>
                  <option value="recruiter" disabled>Recruiter (Coming Soon)</option>
                </select>
                {formData.role === 'recruiter' && (
                  <p className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                    🚀 Recruiter accounts are coming soon! For now, you can sign up as a job seeker.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start py-2">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-[#ffd82d] focus:ring-[#ffd82d]"
              />
            </div>
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="font-medium text-gray-900 hover:text-[#ffd82d] transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="font-medium text-gray-900 hover:text-[#ffd82d] transition-colors">Privacy Policy</a>
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              relative w-full py-4 px-6 rounded-xl
              bg-gradient-to-r from-[#ffd82d] to-[#ffcf2d]
              text-gray-900 font-semibold text-base
              shadow-lg hover:shadow-xl
              transition-all duration-200
              flex items-center justify-center
              ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:to-[#ffd82d]'}
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;