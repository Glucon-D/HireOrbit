import { motion } from 'framer-motion';

const UserInfoCard = ({ user, variant = 'default' }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const variants = {
    default: 'bg-white',
    highlight: 'bg-[#ffeb85]/10'
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`${variants[variant]} rounded-lg p-6 shadow-sm`}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#ffeb85] flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-900">
              {getInitials(user.name)}
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600">
            {user.title || 'No title set'}
          </p>
          <p className="text-sm text-gray-600">
            {user.company || 'No company set'}
          </p>
        </div>

        {/* Status Indicator */}
        {user.status && (
          <div className="flex-shrink-0">
            <span className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${user.status === 'online' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'}
            `}>
              {user.status}
            </span>
          </div>
        )}
      </div>

      {/* Additional Info */}
      {user.bio && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
          {user.bio}
        </p>
      )}

      {/* Stats */}
      {user.stats && (
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
          {user.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UserInfoCard;