import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of donors who are already creating positive change. 
            Every donation, no matter how small, has the power to transform lives.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Impact Stats */}
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Your Impact in Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">₹100</div>
                  <div className="text-blue-100">Feeds a child for a week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">₹500</div>
                  <div className="text-blue-100">Provides education for a month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">₹1000</div>
                  <div className="text-blue-100">Supports healthcare for a family</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">₹5000</div>
                  <div className="text-blue-100">Builds a clean water source</div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Why Donate Through Kindify?</h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  100% Transparent Impact Tracking
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Verified NGOs Only
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Tax Deductible Donations
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Secure Payment Processing
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - CTA Form */}
          <div className="bg-white p-8 rounded-2xl text-gray-900">
            <h3 className="text-2xl font-bold mb-6 text-center">Start Your Giving Journey</h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Choose your donation amount:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[100, 500, 1000, 5000].map((amount) => (
                    <button
                      key={amount}
                      className="py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Or enter a custom amount:</p>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  min="1"
                />
              </div>

              <div className="space-y-4">
                <Link 
                  to="/signup"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg block text-center"
                >
                  Donate Now
                </Link>
                
                <button className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                  Set Up Monthly Donation
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Your donation is secure and tax-deductible</p>
                <p>95% goes directly to the cause</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-blue-100 mb-6">
            Not ready to donate? Join our community to stay updated on causes and impact stories.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-blue-600 transition-colors"
          >
            Join Our Community
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA; 