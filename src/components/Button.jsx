import { motion } from 'framer-motion';
import Loader from './Loader';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#ffeb85] text-gray-900 hover:bg-[#ffeb85]/90 shadow-sm",
    secondary: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
    outline: "bg-transparent border-2 border-[#ffeb85] text-gray-900 hover:bg-[#ffeb85]/10",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${isFullWidth ? 'w-full' : ''}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <Loader size="small" text={null} />
          <span className="ml-2">Loading...</span>
        </span>
      ) : children}
    </motion.button>
  );
};

export default Button;