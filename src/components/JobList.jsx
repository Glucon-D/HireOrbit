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
      {/* Compact Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search with icon */}
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-gray-200 focus:border-[#ffd82d] focus:ring-[#ffd82d] text-sm"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Compact Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="py-2 pl-3 pr-8 rounded-lg border-gray-200 focus:border-[#ffd82d] focus:ring-[#ffd82d] text-sm bg-white"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="py-2 pl-3 pr-8 rounded-lg border-gray-200 focus:border-[#ffd82d] focus:ring-[#ffd82d] text-sm bg-white"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 pl-3 pr-8 rounded-lg border-gray-200 focus:border-[#ffd82d] focus:ring-[#ffd82d] text-sm bg-white"
            >
              <option value="recent">Recent</option>
              <option value="salary-high">Highest Salary</option>
              <option value="salary-low">Lowest Salary</option>
            </select>
          </div>
        </div>

        {/* Active Filters Pills */}
        {Object.entries(filters).some(([_, value]) => value && value !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {Object.entries(filters).map(([key, value]) => {
              if (value && value !== 'all') {
                return (
                  <motion.span
                    key={key}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#ffd82d]/10 text-gray-900 border border-[#ffd82d]/20"
                  >
                    {key}: {value}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, [key]: 'all' }))}
                      className="ml-1 text-gray-500 hover:text-gray-900"
                    >
                      ×
                    </button>
                  </motion.span>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <JobCard job={job} onClick={() => onSelect(job)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Compact Empty State */}
      {filteredAndSortedJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white/80 rounded-xl shadow-sm"
        >
          <span className="text-4xl mb-3 block">🔍</span>
          <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="text-sm text-gray-600">Try adjusting your filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default JobList;