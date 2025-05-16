import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} AI Resume Builder
        </p>
        <div className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
          <span>Build better resumes with AI assistance</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;