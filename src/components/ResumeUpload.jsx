import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const ResumeUpload = ({ onUpload, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileSelect = (file) => {
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, DOCX, or TXT file');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const getFileIcon = (fileType) => {
    switch(fileType) {
      case 'application/pdf':
        return '📄';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '📝';
      default:
        return '📑';
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          transition-colors duration-200
          ${isDragging 
            ? 'border-[#ffeb85] bg-[#ffeb85]/10' 
            : 'border-gray-300 hover:border-[#ffeb85]'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <span className="text-4xl">📄</span>
              <h3 className="text-lg font-medium text-gray-900">
                Drop your resume here
              </h3>
              <p className="text-sm text-gray-600">
                or
              </p>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
              <p className="text-xs text-gray-500">
                Supports PDF, DOC, DOCX, and TXT files
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <span className="text-4xl">
                {getFileIcon(selectedFile.type)}
              </span>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedFile.name}
              </h3>
              <p className="text-sm text-gray-600">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setSelectedFile(null)}
                  variant="secondary"
                >
                  Change File
                </Button>
                <Button
                  onClick={handleSubmit}
                  isLoading={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Upload & Analyze'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeUpload;