import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReportCard from '../components/ReportCard';

const Reports = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy reports data
  const reports = [
    {
      candidateName: 'Alex Johnson',
      position: 'Senior Frontend Developer',
      date: '2025-04-01',
      score: 85,
      status: 'passed',
      strengths: [
        'Excellent understanding of React ecosystem',
        'Strong problem-solving skills',
        'Clear communication'
      ],
      improvements: [
        'Could improve on system design concepts',
        'More focus on performance optimization'
      ]
    },
    {
      candidateName: 'Sarah Chen',
      position: 'Backend Engineer',
      date: '2025-04-02',
      score: 78,
      status: 'pending',
      strengths: [
        'Strong database knowledge',
        'Good understanding of APIs',
        'Scalability focus'
      ],
      improvements: [
        'Could improve error handling approaches',
        'More experience with cloud services needed'
      ]
    },
    {
      candidateName: 'Mike Smith',
      position: 'DevOps Engineer',
      date: '2025-04-01',
      score: 65,
      status: 'failed',
      strengths: [
        'Good Docker knowledge',
        'Basic AWS understanding'
      ],
      improvements: [
        'Needs more experience with Kubernetes',
        'Security best practices could be improved',
        'CI/CD pipeline knowledge needs work'
      ]
    }
  ];

  const filteredReports = reports
    .filter(report => {
      if (filter === 'all') return true;
      return report.status === filter;
    })
    .filter(report =>
      report.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#fffefb] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Interview Reports
        </h1>
        <p className="text-gray-600">
          Review and analyze candidate interview performances
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex space-x-2">
          {['all', 'passed', 'failed', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium capitalize
                ${filter === status
                  ? 'bg-[#ffeb85] text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search candidates or positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffeb85] focus:border-transparent"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.candidateName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReportCard report={report} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reports found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search terms
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Reports;