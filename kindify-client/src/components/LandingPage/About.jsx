import React from 'react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Verified NGOs' },
    { number: '₹2.5M+', label: 'Total Donations' },
    { number: '10K+', label: 'Happy Donors' },
    { number: '95%', label: 'Impact Rate' },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Kindify</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to create a world where every donation makes a real difference. 
            Our platform connects generous donors with verified NGOs, ensuring transparency and maximum impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between Generosity and Impact
            </h3>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Kindify was born from a simple belief: that giving should be transparent, 
                impactful, and accessible to everyone. We've built a platform that ensures 
                your donations reach the right people at the right time.
              </p>
              <p className="text-lg">
                Our rigorous verification process ensures that every NGO on our platform 
                is legitimate, transparent, and making a real difference in their communities.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="#features"
                className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More About Our Process
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.9/5</div>
                <div className="text-sm text-gray-600">Donor Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
