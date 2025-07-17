import React from 'react';
import SignupForm from '../../components/SignupForm';

const Signup = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
          <SignupForm />
        </div>
        
        {/* Right: Image and Content */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join <span className="text-blue-600">Kindify</span> Today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start your journey of making a positive impact. Whether you're a donor or an NGO, together we can create meaningful change.
            </p>
            <img
              src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=500&q=80"
              alt="Community collaboration"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;