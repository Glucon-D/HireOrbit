import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterviewQuestion from '../components/InterviewQuestion';
import QuestionNavigator from '../components/QuestionNavigator';

const Interview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  // Dummy questions data
  const questions = [
    {
      id: 1,
      title: 'React Component Lifecycle',
      content: 'Explain the lifecycle methods in React class components and their equivalent hooks in functional components.',
      difficulty: 'Medium',
      category: 'React',
      example: `// Class Component Lifecycle
componentDidMount() {
  // Called after component mounts
}

// Functional Component equivalent
useEffect(() => {
  // Called after component mounts
}, []);`
    },
    {
      id: 2,
      title: 'State Management',
      content: 'Compare and contrast different state management solutions in React (Context API, Redux, Zustand). When would you use each?',
      difficulty: 'Hard',
      category: 'Architecture'
    },
    {
      id: 3,
      title: 'Performance Optimization',
      content: 'What techniques would you use to optimize the performance of a React application? Include specific examples.',
      difficulty: 'Medium',
      category: 'Performance'
    }
  ];

  const handleSubmitAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
  };

  const handleFinish = () => {
    // In a real app, this would submit all answers to the backend
    console.log('Final Answers:', answers);
    setIsComplete(true);
  };

  const answeredQuestions = Object.keys(answers).map(id => 
    questions.findIndex(q => q.id.toString() === id)
  );

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="bg-[#fffefb] rounded-lg p-8 shadow-sm">
          <span className="text-6xl mb-6 block">🎉</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interview Complete!
          </h2>
          <p className="text-gray-600 mb-8">
            Your answers have been submitted successfully. We'll analyze them and provide feedback shortly.
          </p>
          <div className="space-y-8">
            {/* Answer Summary */}
            <div className="text-left space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">
                    {answers[question.id]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Question Display */}
      <AnimatePresence mode="wait">
        <InterviewQuestion
          key={currentQuestionIndex}
          question={questions[currentQuestionIndex]}
          onSubmit={handleSubmitAnswer}
          isAnswered={answers[questions[currentQuestionIndex].id]}
        />
      </AnimatePresence>

      {/* Navigation */}
      <QuestionNavigator
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        answered={answeredQuestions}
        onNavigate={setCurrentQuestionIndex}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default Interview;