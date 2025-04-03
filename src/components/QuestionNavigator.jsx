import { motion } from 'framer-motion';
import Button from './Button';

const QuestionNavigator = ({
  currentIndex,
  totalQuestions,
  answered = [],
  onNavigate,
  onFinish
}) => {
  const progress = Math.round((answered.length / totalQuestions) * 100);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#ffeb85]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Dots */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-200
              ${index === currentIndex 
                ? 'bg-[#ffeb85] scale-125' 
                : answered.includes(index)
                  ? 'bg-[#ffeb85]/40'
                  : 'bg-gray-200'
              }
            `}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          variant="secondary"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ← Previous
        </Button>

        {currentIndex === totalQuestions - 1 ? (
          <Button
            onClick={onFinish}
            disabled={answered.length !== totalQuestions}
          >
            Finish Interview
          </Button>
        ) : (
          <Button
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={!answered.includes(currentIndex)}
          >
            Next →
          </Button>
        )}
      </div>

      {/* Completion Status */}
      {answered.length === totalQuestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <p className="text-green-600 font-medium">
            ✨ All questions answered! Click Finish to submit.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionNavigator;