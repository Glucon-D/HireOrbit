import { motion } from 'framer-motion';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
        className={`
          ${sizes[size]}
          border-2
          border-gray-200
          border-t-[#ffeb85]
          rounded-full
        `}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;