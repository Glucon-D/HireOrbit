import { motion } from 'framer-motion';
import Button from './Button';

const ReportCard = ({ report }) => {
  const {
    candidateName,
    position,
    date,
    score,
    strengths = [],
    improvements = [],
    status
  } = report;

  const getStatusColor = (status) => {
    const colors = {
      passed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-[#fffefb] rounded-lg shadow-md p-6 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{candidateName}</h3>
          <p className="text-gray-600">{position}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="mr-4">📅 {date}</span>
        <span>⭐ Score: {score}/100</span>
      </div>

      <div className="space-y-4">
        {/* Strengths */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Strengths</h4>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-600">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h4>
          <ul className="space-y-2">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#ffeb85] mr-2">•</span>
                <span className="text-sm text-gray-600">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <Button variant="primary" isFullWidth>
          View Full Report
        </Button>
        <Button variant="secondary" isFullWidth>
          Download PDF
        </Button>
      </div>
    </motion.div>
  );
};

export default ReportCard;