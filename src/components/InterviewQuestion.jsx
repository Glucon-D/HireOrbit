import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const InterviewQuestion = ({ 
  question, 
  onSubmit,
  onNext,
  isLastQuestion = false 
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit?.(answer);
    setAnswer('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#fffefb] rounded-lg shadow-md p-6"
    >
      {/* Question Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {question.title}
        </h3>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-[#ffeb85]/20 text-gray-700 rounded-full text-sm">
            {question.difficulty}
          </span>
          <span className="px-3 py-1 bg-[#ffeb85]/20 text-gray-700 rounded-full text-sm">
            {question.category}
          </span>
        </div>
      </div>

      {/* Question Content */}
      <div className="prose max-w-none mb-6">
        <p className="text-gray-600">{question.content}</p>
        {question.example && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700">Example:</p>
            <pre className="mt-2 text-sm text-gray-600">{question.example}</pre>
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="mb-6">
        <label 
          htmlFor="answer" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Answer
        </label>
        <textarea
          id="answer"
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full rounded-lg border-gray-200 focus:border-[#ffeb85] focus:ring-[#ffeb85] resize-none"
          placeholder="Type your answer here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!answer.trim()}
        >
          Submit Answer
        </Button>
        
        {!isLastQuestion && (
          <Button
            variant="secondary"
            onClick={onNext}
          >
            Next Question →
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default InterviewQuestion;