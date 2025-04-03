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
      {/* Header */}
      <div className="bg-[#fffefb] rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            variant={isEditing ? "secondary" : "primary"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Profile Form */}
      <motion.div
        initial={false}
        animate={isEditing ? { scale: 1.02 } : { scale: 1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85] disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button type="submit">
                Save Changes
              </Button>
            </div>
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