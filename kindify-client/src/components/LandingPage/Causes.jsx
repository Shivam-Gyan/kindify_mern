import React from 'react';

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Verified NGOs',
      description: 'Every NGO on our platform undergoes rigorous verification to ensure legitimacy and transparency.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-time Tracking',
      description: 'Track your donations in real-time and see exactly how your money is being used for impact.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Bank-grade security ensures your financial information and donations are always protected.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Impact Reports',
      description: 'Receive detailed reports on how your donations are creating positive change in communities.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community Support',
      description: 'Join a community of like-minded donors and stay connected with the causes you care about.',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      title: 'Tax Benefits',
      description: 'All donations are eligible for tax deductions under Section 80G of the Income Tax Act.',
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  // Sample NGO data for showcase
  const featuredNGOs = [
    {
      id: 1,
      name: "Shanti Niketan Trust",
      cause: "Education",
      image: "https://t4.ftcdn.net/jpg/05/26/35/07/360_F_526350772_taMM7EVaoDzWAashADdBrYkjH24hqS3c.jpg",
      description: "Providing quality education to underprivileged children",
      verified: true,
      rating: 4.8,
      donors: 1247,
      impact: "15,000+ children educated"
    },
    {
      id: 2,
      name: "Poor Children Welfare",
      cause: "Healthcare",
      image: "https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1",
      description: "Healthcare support for children in rural areas",
      verified: true,
      rating: 4.6,
      donors: 892,
      impact: "8,000+ children treated"
    },
    {
      id: 3,
      name: "Green Earth Initiative",
      cause: "Environment",
      image: "https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180",
      description: "Environmental conservation and tree planting",
      verified: true,
      rating: 4.9,
      donors: 2156,
      impact: "50,000+ trees planted"
    },
    {
      id: 4,
      name: "Water for All",
      cause: "Infrastructure",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3-WZvXdh_iSvNFSI3NKxR6AuBdJ9GRdS_gA&s",
      description: "Providing clean water access to rural communities",
      verified: true,
      rating: 4.7,
      donors: 1567,
      impact: "100+ villages served"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Kindify?</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most transparent and user-friendly donation platform to ensure 
            your generosity creates maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 lg:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className={`inline-flex p-3 rounded-xl mb-4 lg:mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <a
            href="#how-it-works"
            className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-full hover:bg-blue-700 transition-colors"
          >
            See How It Works
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Dynamic NGO Showcase Section */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured NGOs</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover verified NGOs making a real difference in communities across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredNGOs.map((ngo) => (
              <div key={ngo.id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={ngo.image}
                    alt={ngo.name}
                    className="w-full h-48 object-cover"
                  />
                  {ngo.verified && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {ngo.cause}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 lg:p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">{ngo.name}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm mb-3 line-clamp-2">{ngo.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 lg:w-4 lg:h-4 ${i < Math.floor(ngo.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">{ngo.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{ngo.donors} donors</span>
                  </div>
                  
                  <div className="text-xs text-green-600 font-medium mb-3">
                    {ngo.impact}
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#donate"
              className="inline-flex items-center bg-green-600 text-white font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-full hover:bg-green-700 transition-colors"
            >
              Explore All NGOs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
