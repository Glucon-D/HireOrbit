import { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeUpload from '../components/ResumeUpload';
import ResumeSuggestionList from '../components/ResumeSuggestionList';
import Button from '../components/Button';
import ErrorAlert from '../components/ErrorAlert';

const ResumeFeedback = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState('');

  // Dummy AI suggestions
  const suggestions = [
    {
      type: 'improvement',
      title: 'Quantify Your Achievements',
      description: 'Add more specific metrics and numbers to demonstrate your impact.',
      example: 'Instead of "Improved site performance", say "Improved site performance by reducing load time from 5s to 2s"'
    },
    {
      type: 'strength',
      title: 'Strong Technical Stack',
      description: 'Your combination of frontend and DevOps skills is valuable.',
      example: 'Consider adding any cloud certifications you may have.'
    },
    {
      type: 'improvement',
      title: 'Add Project Links',
      description: 'Include links to your GitHub projects or live deployments.',
      example: 'Add URLs to demonstrate your work: github.com/username/project'
    }
  ];

  const handleUpload = async (file) => {
    setIsAnalyzing(true);
    setError('');
    
    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, we would parse the resume here
      setResumeData({
        name: 'John Developer',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        experience: [
          {
            title: 'Senior Frontend Developer',
            company: 'Tech Solutions Inc.',
            period: '2023 - Present',
            highlights: [
              'Led team of 5 developers in rebuilding company dashboard',
              'Improved site performance by 40%',
              'Implemented CI/CD pipeline'
            ]
          },
          {
            title: 'Frontend Developer',
            company: 'Digital Innovators',
            period: '2021 - 2023',
            highlights: [
              'Developed responsive web applications',
              'Mentored junior developers',
              'Reduced bug count by 60%'
            ]
          }
        ],
        skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker']
      });
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#fffefb] rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resume Feedback
        </h1>
        <p className="text-gray-600">
          Get AI-powered insights on how to improve your resume
        </p>
      </div>

      {error && (
        <ErrorAlert 
          message={error}
          onClose={() => setError('')}
        />
      )}

      {!resumeData ? (
        <ResumeUpload
          onUpload={handleUpload}
          isAnalyzing={isAnalyzing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Resume Preview
              </h2>
              <Button
                variant="secondary"
                onClick={() => setResumeData(null)}
              >
                Upload New
              </Button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {resumeData.name}
                </h3>
                <div className="text-gray-600">
                  <p>{resumeData.email}</p>
                  <p>{resumeData.phone}</p>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Experience
                </h3>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-[#ffeb85] pl-4">
                      <h4 className="font-medium text-gray-900">
                        {exp.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {exp.company} • {exp.period}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-gray-600">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ResumeSuggestionList suggestions={suggestions} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResumeFeedback;