import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import ResumeBuilder from './components/ResumeBuilder';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <ResumeBuilder />
          </main>
          <Footer />
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;