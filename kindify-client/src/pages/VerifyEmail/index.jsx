import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get email, role, and name from location state
  const { email, role, name } = location.state || {};

  if (!email || !role) {
    navigate('/signup');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.verifyOtp({ email, otp, role });
      console.log('Verification response:', response);
      
      if (response.success) {
        navigate('/login', { 
          state: { 
            message: 'Email verified successfully. Please login.',
            email 
          }
        });
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await authService.resendOtp(email, role);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">Verify Email<span className="text-orange-400">.</span></h2>
        <p className="text-gray-600 mb-6">
          Hi {name}, please enter the OTP sent to your email address: <span className="font-semibold">{email}</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-semibold mb-1">
              OTP<span className="text-orange-400">*</span>
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 text-base"
              placeholder="Enter OTP"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-full text-lg transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail; 