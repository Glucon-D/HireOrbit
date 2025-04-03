import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import JobList from '../components/JobList';
import UserInfoCard from '../components/UserInfoCard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for an experienced Frontend Developer with React expertise to join our growing team.',
      salary: '$120k - $150k',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Next.js'],
      postedDate: '2025-04-01'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataFlow Systems',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Looking for a skilled Backend Engineer to develop and maintain scalable web services.',
      salary: '$130k - $160k',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
      postedDate: '2025-04-02'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudScale',
      location: 'San Francisco, CA',
      type: 'Remote',
      description: 'Join our DevOps team to build and maintain our cloud infrastructure.',
      salary: '$140k - $170k',
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
      postedDate: '2025-04-03'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Solutions',
      location: 'Remote',
      type: 'Contract',
      description: 'Join our design team to create beautiful and intuitive user interfaces.',
      salary: '$90k - $120k',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      postedDate: '2025-04-03'
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        ...parsedUser,
        stats: [
          { value: '24', label: 'Active Jobs' },
          { value: '156', label: 'Applications' },
          { value: '12', label: 'Interviews' }
        ]
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Section with User Info */}
      {user && (
        <UserInfoCard
          user={user}
          variant="highlight"
        />
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Jobs Posted', value: '24', icon: '💼', change: '+3 this week' },
          { label: 'Total Applications', value: '156', icon: '📝', change: '+28 this week' },
          { label: 'Interviews Scheduled', value: '12', icon: '📅', change: '+5 this week' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Job List Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Manage Job Positions
        </h2>
        <JobList
          jobs={jobs}
          onSelect={setSelectedJob}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-[#ffeb85]/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Post New Job', icon: '✨' },
            { label: 'View Applications', icon: '📝' },
            { label: 'Schedule Interviews', icon: '📅' },
            { label: 'Generate Reports', icon: '📊' }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-white rounded-lg shadow-sm text-center hover:border-[#ffeb85] border border-transparent transition-colors"
            >
              <span className="block text-2xl mb-2">{action.icon}</span>
              <span className="text-sm text-gray-600">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;