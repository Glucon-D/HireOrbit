import { motion } from 'framer-motion';
import Button from './Button';

const JobCard = ({ job }) => {
  const {
    title,
    company,
    location,
    type,
    description,
    salary,
    skills = []
  } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-[#fffefb] rounded-lg shadow-md p-6 border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{company}</p>
        </div>
        <span className="px-3 py-1 bg-[#ffeb85]/20 text-gray-700 rounded-full text-sm">
          {type}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-gray-600 text-sm">
          <span className="mr-4">📍 {location}</span>
          <span>💰 {salary}</span>
        </div>
      </div>

      <p className="mt-4 text-gray-600 text-sm line-clamp-2">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex space-x-3">
        <Button variant="primary" isFullWidth>
          Generate Interview
        </Button>
        <Button variant="secondary" isFullWidth>
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;