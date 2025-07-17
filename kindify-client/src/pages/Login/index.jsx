import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const roleFromUrl = urlParams.get('role');
  const isRolePreSelected = roleFromUrl && ['donor', 'ngo'].includes(roleFromUrl);
  
  const getTitle = () => {
    if (isRolePreSelected) {
      return `Log In as ${roleFromUrl === 'donor' ? 'Donor' : 'NGO'}`;
    }
    return 'Log In';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <LoginForm />
        </div>
        
        {/* Right: Image and Content */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Kindify</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with causes that matter. Make a difference in the world through meaningful donations and partnerships.
            </p>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
              alt="People helping each other"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 