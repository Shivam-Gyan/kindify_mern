import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/LandingPage/Footer';
import FilterNgo from '../../components/FilterNgo';

const DonorHome = () => {
  const navigate = useNavigate();
  const { user ,NgoByFilter, error } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState('all'); // 'all', 'campaigns', 'ngos'
  
  // Mock data - in real app, this would come from API
  const featuredNGOs = [
    {
      id: 1,
      name: "Shanti Niketan Trust",
      cause: "Education",
      image: "https://t4.ftcdn.net/jpg/05/26/35/07/360_F_526350772_taMM7EVaoDzWAashADdBrYkjH24hqS3c.jpg",
      description: "Providing quality education to underprivileged children",
      verified: true,
      rating: 4.8,
      donors: 1247
    },
    {
      id: 2,
      name: "Poor Children Welfare",
      cause: "Healthcare",
      image: "https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1",
      description: "Healthcare support for children in rural areas",
      verified: true,
      rating: 4.6,
      donors: 892
    },
    {
      id: 3,
      name: "Green Earth Initiative",
      cause: "Environment",
      image: "https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180",
      description: "Environmental conservation and tree planting",
      verified: true,
      rating: 4.9,
      donors: 2156
    }
  ];

  const trendingCampaigns = [
    {
      id: 1,
      title: "Emergency Relief for Flood Victims",
      ngo: "Disaster Relief Foundation",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400",
      description: "Providing immediate relief to families affected by recent floods in Kerala",
      raised: "₹8.5L",
      goal: "₹15L",
      donors: 1247,
      daysLeft: 12,
      category: "Emergency"
    },
    {
      id: 2,
      title: "Education for Rural Children",
      ngo: "Shanti Niketan Trust",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      description: "Building schools and providing education materials for rural communities",
      raised: "₹12.3L",
      goal: "₹20L",
      donors: 2156,
      daysLeft: 25,
      category: "Education"
    },
    {
      id: 3,
      title: "Clean Water for Villages",
      ngo: "Water for All",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      description: "Installing water purification systems in remote villages",
      raised: "₹6.8L",
      goal: "₹10L",
      donors: 892,
      daysLeft: 18,
      category: "Infrastructure"
    }
  ];

  const campaignCategories = [
    { name: "Education", icon: "📚", count: 45 },
    { name: "Healthcare", icon: "🏥", count: 32 },
    { name: "Environment", icon: "🌱", count: 28 },
    { name: "Emergency", icon: "🚨", count: 15 },
    { name: "Infrastructure", icon: "🏗️", count: 22 },
    { name: "Women Empowerment", icon: "👩‍💼", count: 18 }
  ];

  // Campaigns by category
  const campaignsByCategory = {
    "Education": [
      {
        id: "edu1",
        title: "Digital Learning for Rural Schools",
        ngo: "Education First Foundation",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
        description: "Providing tablets and digital learning resources to rural schools",
        raised: "₹15.2L",
        goal: "₹25L",
        donors: 2341,
        daysLeft: 8,
        category: "Education"
      },
      {
        id: "edu2",
        title: "Scholarship for Underprivileged Students",
        ngo: "Student Support Trust",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
        description: "Supporting 100 students with full academic scholarships",
        raised: "₹8.7L",
        goal: "₹12L",
        donors: 1567,
        daysLeft: 15,
        category: "Education"
      },
      {
        id: "edu3",
        title: "Library Construction Project",
        ngo: "Knowledge Builders",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
        description: "Building community libraries in underserved areas",
        raised: "₹22.1L",
        goal: "₹30L",
        donors: 3421,
        daysLeft: 22,
        category: "Education"
      }
    ],
    "Healthcare": [
      {
        id: "health1",
        title: "Mobile Medical Camps",
        ngo: "Health for All",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        description: "Providing free medical checkups in remote villages",
        raised: "₹12.8L",
        goal: "₹18L",
        donors: 1892,
        daysLeft: 12,
        category: "Healthcare"
      },
      {
        id: "health2",
        title: "Medical Equipment for Hospitals",
        ngo: "Healthcare Heroes",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
        description: "Upgrading medical equipment in rural hospitals",
        raised: "₹18.5L",
        goal: "₹25L",
        donors: 2678,
        daysLeft: 18,
        category: "Healthcare"
      },
      {
        id: "health3",
        title: "Mental Health Awareness",
        ngo: "Mind Matters",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
        description: "Mental health awareness and counseling programs",
        raised: "₹6.3L",
        goal: "₹10L",
        donors: 945,
        daysLeft: 25,
        category: "Healthcare"
      }
    ],
    "Environment": [
      {
        id: "env1",
        title: "Tree Plantation Drive",
        ngo: "Green Earth Initiative",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
        description: "Planting 10,000 trees across urban areas",
        raised: "₹9.2L",
        goal: "₹15L",
        donors: 2134,
        daysLeft: 10,
        category: "Environment"
      },
      {
        id: "env2",
        title: "Solar Energy for Villages",
        ngo: "Solar Solutions",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
        description: "Installing solar panels in 50 rural villages",
        raised: "₹28.7L",
        goal: "₹35L",
        donors: 4123,
        daysLeft: 5,
        category: "Environment"
      },
      {
        id: "env3",
        title: "Waste Management Program",
        ngo: "Clean India Mission",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        description: "Implementing waste segregation and recycling systems",
        raised: "₹14.6L",
        goal: "₹20L",
        donors: 1876,
        daysLeft: 16,
        category: "Environment"
      }
    ],
    "Emergency": [
      {
        id: "emerg1",
        title: "Flood Relief Operations",
        ngo: "Disaster Relief Foundation",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400",
        description: "Emergency relief for flood-affected families in Kerala",
        raised: "₹8.5L",
        goal: "₹15L",
        donors: 1247,
        daysLeft: 12,
        category: "Emergency"
      },
      {
        id: "emerg2",
        title: "Earthquake Recovery Fund",
        ngo: "Crisis Response Team",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400",
        description: "Rebuilding homes and infrastructure after earthquake",
        raised: "₹32.1L",
        goal: "₹50L",
        donors: 5234,
        daysLeft: 3,
        category: "Emergency"
      },
      {
        id: "emerg3",
        title: "Cyclone Relief Support",
        ngo: "Emergency Aid Network",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        description: "Providing immediate aid to cyclone-affected coastal areas",
        raised: "₹18.9L",
        goal: "₹25L",
        donors: 2987,
        daysLeft: 7,
        category: "Emergency"
      }
    ],
    "Infrastructure": [
      {
        id: "infra1",
        title: "Clean Water for Villages",
        ngo: "Water for All",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        description: "Installing water purification systems in remote villages",
        raised: "₹6.8L",
        goal: "₹10L",
        donors: 892,
        daysLeft: 18,
        category: "Infrastructure"
      },
      {
        id: "infra2",
        title: "Road Construction Project",
        ngo: "Rural Development Trust",
        image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=400",
        description: "Building roads to connect remote villages",
        raised: "₹45.2L",
        goal: "₹60L",
        donors: 6789,
        daysLeft: 30,
        category: "Infrastructure"
      },
      {
        id: "infra3",
        title: "Community Center Building",
        ngo: "Community Builders",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
        description: "Constructing community centers for social activities",
        raised: "₹23.4L",
        goal: "₹30L",
        donors: 3456,
        daysLeft: 14,
        category: "Infrastructure"
      }
    ],
    "Women Empowerment": [
      {
        id: "women1",
        title: "Skill Development for Women",
        ngo: "Women Empowerment Foundation",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
        description: "Training programs for women in various skills",
        raised: "₹11.7L",
        goal: "₹18L",
        donors: 2345,
        daysLeft: 20,
        category: "Women Empowerment"
      },
      {
        id: "women2",
        title: "Microfinance for Women Entrepreneurs",
        ngo: "Women's Business Network",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
        description: "Providing microloans to women starting businesses",
        raised: "₹16.3L",
        goal: "₹22L",
        donors: 2987,
        daysLeft: 12,
        category: "Women Empowerment"
      },
      {
        id: "women3",
        title: "Education for Girl Children",
        ngo: "Girl Child Education Trust",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
        description: "Ensuring education for underprivileged girl children",
        raised: "₹13.8L",
        goal: "₹20L",
        donors: 2678,
        daysLeft: 16,
        category: "Women Empowerment"
      }
    ]
  };

  // Get all campaigns for search
  const getAllCampaigns = () => {
    const allCampaigns = [];
    Object.values(campaignsByCategory).forEach(campaigns => {
      allCampaigns.push(...campaigns);
    });
    return allCampaigns;
  };

  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const results = [];

    if (searchType === 'all' || searchType === 'campaigns') {
      // Search in campaigns
      const allCampaigns = getAllCampaigns();
      const campaignResults = allCampaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(query.toLowerCase()) ||
        campaign.description.toLowerCase().includes(query.toLowerCase()) ||
        campaign.ngo.toLowerCase().includes(query.toLowerCase()) ||
        campaign.category.toLowerCase().includes(query.toLowerCase())
      );
      results.push(...campaignResults.map(campaign => ({ ...campaign, type: 'campaign' })));
    }

    if (searchType === 'all' || searchType === 'ngos') {
      // Search in NGOs
      const ngoResults = featuredNGOs.filter(ngo =>
        ngo.name.toLowerCase().includes(query.toLowerCase()) ||
        ngo.description.toLowerCase().includes(query.toLowerCase()) ||
        ngo.cause.toLowerCase().includes(query.toLowerCase())
      );
      results.push(...ngoResults.map(ngo => ({ ...ngo, type: 'ngo' })));
    }

    setSearchResults(results);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Kindify</h1>
              <span className="text-sm text-gray-500">| Donor Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/donor-dashboard')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || 'Donor'} 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Discover amazing causes and make a real impact today
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-300">160+</div>
                <div className="text-blue-100">Verified NGOs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Search Campaigns & NGOs</h2>
          <div className="mb-4 flex max-sm:flex-col items-center max-sm:gap-3 gap-8">
            
            {/* Search Input */}
            <div className="relative mb-4 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for campaigns, NGOs, or causes..."
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button className=' max-sm:w-full max-md:w-40 w-36 h-12 -mt-4 px-4 py-1 rounded-md border-2 border-indigo-500 hover:bg-indigo-50 bg-white text-indigo-600 ' onClick={() => setShowFilter(!showFilter)}>
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>

         {error && <p className='bg-red-100 text-red-700 p-4 rounded-md truncate border-l-4 border-red-500'>{error}</p>} 

          {showFilter && <FilterNgo setShowFilter={setShowFilter}/>}

          {/* Search Results */}
          {isSearching && searchQuery && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Search Results ({searchResults.length})
                </h3>
                {searchResults.length > 0 && (
                  <button
                    onClick={clearSearch}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Clear Search
                  </button>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search terms or browse by category below.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((result, index) => (
                    <div key={`${result.type}-${result.id}-${index}`} className="bg-gray-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {result.type === 'campaign' ? (
                        // Campaign Result
                        <>
                          <div className="relative">
                            <img 
                              src={result.image} 
                              alt={result.title} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                {result.category}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                                {result.daysLeft} days left
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{result.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{result.description}</p>
                            <p className="text-sm text-gray-500 mb-4">by {result.ngo}</p>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Raised:</span>
                                <span className="font-semibold text-green-600">{result.raised}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Goal:</span>
                                <span className="font-semibold">{result.goal}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Donors:</span>
                                <span className="font-semibold">{result.donors}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${(parseInt(result.raised.replace(/[^\d]/g, '')) / parseInt(result.goal.replace(/[^\d]/g, ''))) * 100}%` }}
                                ></div>
                              </div>
                              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Support This Campaign
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        // NGO Result
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <img src={result.image} alt={result.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">{result.name}</h3>
                                {result.verified && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    ✓ Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center mt-1">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(result.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{result.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{result.description}</p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {result.cause}
                            </span>
                            <span className="text-sm text-gray-500">{result.donors} donors</span>
                          </div>
                          
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            View NGO Profile
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Campaign Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {campaignCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
                  selectedCategory === category.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} campaigns</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Campaigns */}
        {selectedCategory && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedCategory} Campaigns</h2>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Categories
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaignsByCategory[selectedCategory].map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {campaign.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        {campaign.daysLeft} days left
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
                    <p className="text-sm text-gray-500 mb-4">by {campaign.ngo}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Raised:</span>
                        <span className="font-semibold text-green-600">{campaign.raised}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Goal:</span>
                        <span className="font-semibold">{campaign.goal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Donors:</span>
                        <span className="font-semibold">{campaign.donors}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(parseInt(campaign.raised.replace(/[^\d]/g, '')) / parseInt(campaign.goal.replace(/[^\d]/g, ''))) * 100}%` }}
                        ></div>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Support This Campaign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Campaigns */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Campaigns</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Campaigns →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {campaign.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                      {campaign.daysLeft} days left
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
                  <p className="text-sm text-gray-500 mb-4">by {campaign.ngo}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Raised:</span>
                      <span className="font-semibold text-green-600">{campaign.raised}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Goal:</span>
                      <span className="font-semibold">{campaign.goal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Donors:</span>
                      <span className="font-semibold">{campaign.donors}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(parseInt(campaign.raised.replace(/[^\d]/g, '')) / parseInt(campaign.goal.replace(/[^\d]/g, ''))) * 100}%` }}
                      ></div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Support This Campaign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured NGOs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Featured NGOs</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Browse All NGOs →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNGOs.map((ngo) => (
              <div key={ngo.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img src={ngo.image} alt={ngo.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{ngo.name}</h3>
                      {ngo.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(ngo.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{ngo.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ngo.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {ngo.cause}
                  </span>
                  <span className="text-sm text-gray-500">{ngo.donors} donors</span>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View NGO Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/donate')}
              className="flex items-center justify-center p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Start Donating
            </button>
            <button
              onClick={() => navigate('/donor-dashboard')}
              className="flex items-center justify-center p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/donor-dashboard/followed-ngos')}
              className="flex items-center justify-center p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Followed NGOs
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonorHome;