import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    title: '',
    bio: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        company: user.company || 'Tech Solutions Inc.',
        title: user.title || 'Senior Developer',
        bio: user.bio || 'Passionate about technology and innovation.'
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update localStorage
    localStorage.setItem('user', JSON.stringify({
      ...userData,
      ...formData
    }));
    
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Enhanced Header */}
      <motion.div 
        className="bg-gradient-to-r from-[#ffd82d]/10 to-white rounded-2xl p-8 shadow-lg border border-[#ffd82d]/20"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -20, opacity: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`
              px-6 py-2.5 rounded-xl font-medium transition-all duration-200
              ${isEditing 
                ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' 
                : 'bg-[#ffd82d] text-gray-900 hover:bg-[#ffd82d]/90 shadow-md hover:shadow-lg'}
            `}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Profile Form */}
      <motion.div
        initial={false}
        animate={isEditing ? { 
          scale: 1.01,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        } : { 
          scale: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        className="bg-white rounded-2xl p-8 border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form fields with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'name', label: 'Full Name', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'email' },
              { name: 'company', label: 'Company', type: 'text' },
              { name: 'title', label: 'Job Title', type: 'text' }
            ].map(field => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:border-[#ffd82d] focus:ring-[#ffd82d] disabled:bg-gray-50/50 disabled:text-gray-500 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:border-[#ffd82d] focus:ring-[#ffd82d] disabled:bg-gray-50/50 disabled:text-gray-500 transition-colors"
            />
          </div>

          {/* Enhanced Save Button */}
          {isEditing && (
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#ffd82d] text-gray-900 font-medium hover:bg-[#ffd82d]/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Save Changes
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Activity History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        
        <div className="space-y-4">
          {[
            {
              type: 'interview',
              title: 'Completed Frontend Developer Interview',
              date: '2 hours ago'
            },
            {
              type: 'resume',
              title: 'Updated Resume',
              date: '1 day ago'
            },
            {
              type: 'feedback',
              title: 'Received Resume Feedback',
              date: '3 days ago'
            }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl">
                {activity.type === 'interview' ? '💬' : 
                 activity.type === 'resume' ? '📄' : '✨'}
              </span>
              <div>
                <p className="text-gray-900 font-medium">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;