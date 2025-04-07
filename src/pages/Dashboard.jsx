import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import JobList from '../components/JobList';
import UserInfoCard from '../components/UserInfoCard';

const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes cache

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem('jobsCache');
        if (cachedData) {
          const { timestamp, jobs: cachedJobs } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > CACHE_DURATION;
          
          if (!isExpired) {
            setJobs(cachedJobs);
            setIsLoading(false);
            return;
          }
        }

        // Fetch new data if cache is missing or expired
        const appId = import.meta.env.VITE_ADZUNA_APP_ID;
        const apiKey = import.meta.env.VITE_ADZUNA_API_KEY;
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${apiKey}&results_per_page=10&content-type=application/json`
        );
        const data = await response.json();
        
        const transformedJobs = data.results.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company.display_name,
          location: job.location.display_name,
          type: job.contract_time || 'Full-time',
          description: job.description,
          salary: job.salary_min ? 
            `₹${Math.round(job.salary_min).toLocaleString('en-IN')} - ₹${Math.round(job.salary_max).toLocaleString('en-IN')}` : 
            'Not specified',
          skills: job.category.label.split(','),
          postedDate: new Date(job.created).toISOString().split('T')[0]
        }));

        // Store in cache with timestamp
        localStorage.setItem('jobsCache', JSON.stringify({
          timestamp: Date.now(),
          jobs: transformedJobs
        }));

        setJobs(transformedJobs);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch jobs');
        setIsLoading(false);
        
        // Try to use expired cache as fallback
        const cachedData = localStorage.getItem('jobsCache');
        if (cachedData) {
          const { jobs: cachedJobs } = JSON.parse(cachedData);
          setJobs(cachedJobs);
          setError('Using cached data - Please check your connection');
        }
      }
    };

    fetchJobs();
  }, []);

  // Add cache cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear expired cache when component unmounts
      const cachedData = localStorage.getItem('jobsCache');
      if (cachedData) {
        const { timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp > CACHE_DURATION) {
          localStorage.removeItem('jobsCache');
        }
      }
    };
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
        {isLoading ? (
          <div className="text-center py-12">
            <span className="text-gray-600">Loading jobs...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            {error}
          </div>
        ) : (
          <JobList
            jobs={jobs}
            onSelect={setSelectedJob}
          />
        )}
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