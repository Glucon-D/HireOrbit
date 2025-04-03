import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from './JobCard';

const JobList = ({ jobs, onSelect }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all',
    search: ''
  });

  const [sortBy, setSortBy] = useState('recent');

  const filterJobs = (jobs) => {
    return jobs.filter(job => {
      const matchesType = filters.type === 'all' || job.type === filters.type;
      const matchesLocation = filters.location === 'all' || job.location === filters.location;
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                          job.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesLocation && matchesSearch;
    });
  };

  const sortJobs = (jobs) => {
    switch (sortBy) {
      case 'salary-high':
        return [...jobs].sort((a, b) => {
          const aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bValue - aValue;
        });
      case 'salary-low':
        return [...jobs].sort((a, b) => {
          const aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return aValue - bValue;
        });
      case 'recent':
      default:
        return jobs;
    }
  };

  const filteredAndSortedJobs = sortJobs(filterJobs(jobs));

  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const uniqueTypes = [...new Set(jobs.map(job => job.type))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85]"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85]"
          >
            <option value="all">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85]"
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-[#ffeb85] focus:ring-[#ffeb85]"
          >
            <option value="recent">Most Recent</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
          </select>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (value && value !== 'all') {
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#ffeb85]/20 text-gray-700"
                >
                  {key}: {value}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, [key]: 'all' }))}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <JobCard job={job} onClick={() => onSelect(job)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAndSortedJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search terms
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default JobList;