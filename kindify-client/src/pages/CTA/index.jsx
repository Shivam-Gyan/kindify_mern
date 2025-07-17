import React from 'react';
import { Link } from 'react-router-dom';
import CTA from '../../components/LandingPage/CTA';

const CTAPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header for CTA Page */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Donate Now</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>
      
      <CTA />
    </div>
  );
};

export default CTAPage; 