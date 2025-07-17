// ✅ Section Updated by Cursor
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/LandingPage/Footer';

const NGOHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock verification status - in real app, this would come from API
  const verificationStatus = {
    isVerified: true, // Set to false to show KYC alert
    status: 'verified', // 'verified', 'pending', 'rejected'
    lastUpdated: '2024-01-10'
  };
  
  // Mock data - in real app, this would come from API
  const platformTips = [
    {
      id: 1,
      title: "Update Your Profile",
      description: "Donors are 3x more likely to donate to updated profiles",
      icon: "📝",
      priority: "high"
    },
    {
      id: 2,
      title: "Share Impact Stories",
      description: "Regular updates increase donor engagement by 40%",
      icon: "📊",
      priority: "medium"
    },
    {
      id: 3,
      title: "Respond to Messages",
      description: "Quick responses build trust with potential donors",
      icon: "💬",
      priority: "medium"
    }
  ];

  const successStory = {
    title: "This NGO raised ₹50K in 1 week!",
    ngo: "Education for All Foundation",
    description: "By updating their profile regularly and sharing impact stories, they achieved their fundraising goal in record time.",
    keyFactors: ["Regular Updates", "Impact Stories", "Quick Responses"],
    donors: 89,
    timeframe: "1 week"
  };

  const recentDonations = [
    {
      id: 1,
      amount: "₹5,000",
      donor: "Anonymous Donor",
      campaign: "Education for Rural Children",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      amount: "₹2,500",
      donor: "Priya Sharma",
      campaign: "Healthcare for All",
      time: "4 hours ago",
      status: "completed"
    },
    {
      id: 3,
      amount: "₹10,000",
      donor: "Corporate Donor",
      campaign: "Clean Water Project",
      time: "1 day ago",
      status: "pending"
    }
  ];

  const campaignTemplates = [
    {
      id: 1,
      title: "Education Campaign",
      description: "Raise funds for educational programs and school infrastructure",
      icon: "📚",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 2,
      title: "Healthcare Initiative",
      description: "Fund medical camps, equipment, and healthcare services",
      icon: "🏥",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 3,
      title: "Emergency Relief",
      description: "Quick fundraising for disaster relief and emergency situations",
      icon: "🚨",
      estimatedTime: "3-5 minutes"
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

  const yourCampaigns = [
    {
      id: 1,
      title: "Education for Rural Children",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      description: "Building schools and providing education materials for rural communities",
      raised: "₹12.3L",
      goal: "₹20L",
      donors: 2156,
      daysLeft: 25,
      category: "Education",
      status: "active"
    },
    {
      id: 2,
      title: "Healthcare for All",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      description: "Providing free medical checkups and healthcare services in remote villages",
      raised: "₹8.7L",
      goal: "₹15L",
      donors: 1247,
      daysLeft: 18,
      category: "Healthcare",
      status: "active"
    },
    {
      id: 3,
      title: "Women Empowerment Program",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      description: "Skill development and entrepreneurship training for women",
      raised: "₹5.2L",
      goal: "₹12L",
      donors: 892,
      daysLeft: 32,
      category: "Women Empowerment",
      status: "active"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Kindify</h1>
              <span className="text-sm text-gray-500">| NGO Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/ngo-dashboard')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-blue-800 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hello {user?.name || 'NGO'}, here's your daily snapshot 🌱
              </h1>
              <p className="text-green-100 text-lg">
                Ready to create impact? Start a new campaign or check your progress
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-300">₹1,23,450</div>
                <div className="text-green-100">Total Raised</div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status Alert */}
        {verificationStatus.isVerified ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">Your profile is verified! ✅</h3>
                <p className="text-green-700">Donors trust verified NGOs more. Keep up the great work!</p>
                <p className="text-sm text-green-600 mt-1">Last updated: {new Date(verificationStatus.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-yellow-800">KYC Verification Required ⚠️</h3>
                <p className="text-yellow-700">Complete your KYC verification to start receiving donations and build donor trust.</p>
                <div className="mt-3">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                    Complete KYC Verification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips to Succeed on Kindify Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tips to Succeed on Kindify</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-sm text-gray-600">Add detailed information about your NGO, mission, and impact to build donor trust.</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Impact Stories</h3>
              <p className="text-sm text-gray-600">Regular updates and impact reports increase donor engagement by 40%.</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Engage with Donors</h3>
              <p className="text-sm text-gray-600">Respond quickly to messages and comments to build lasting relationships.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/ngo-dashboard/campaigns')}
              className="flex flex-col items-center p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium">Create Campaign</span>
            </button>
            <button
              onClick={() => navigate('/ngo-dashboard/impact-reports')}
              className="flex flex-col items-center p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium">Upload Impact Report</span>
            </button>
            <button
              onClick={() => navigate('/ngo-dashboard/messages')}
              className="flex flex-col items-center p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">Check Messages</span>
            </button>
            <button
              onClick={() => navigate('/ngo-dashboard')}
              className="flex flex-col items-center p-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span className="font-medium">View Dashboard</span>
            </button>
          </div>
        </div>

        {/* Trending Campaigns */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Campaigns</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
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
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      View Campaign Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Campaigns */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Campaigns</h2>
            <button 
              onClick={() => navigate('/ngo-dashboard/campaigns')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Manage All Campaigns →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yourCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-green-100">
                <div className="relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {campaign.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {campaign.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                      {campaign.daysLeft} days left
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
                  
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
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Edit Campaign
                      </button>
                      <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Platform Tips */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Tips</h2>
              <div className="space-y-4">
                {platformTips.map((tip) => (
                  <div key={tip.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl mr-4">{tip.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tip.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tip.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Campaign Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Campaign</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {campaignTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="text-3xl mb-3">{template.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="text-xs text-gray-500">Setup time: {template.estimatedTime}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/ngo-dashboard/campaigns')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create Custom Campaign
              </button>
            </div>
          </div>

          {/* Success Story */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Success Story</h2>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">{successStory.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{successStory.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">NGO:</span>
                    <span className="font-semibold">{successStory.ngo}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Donors:</span>
                    <span className="font-semibold text-green-600">{successStory.donors}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Timeframe:</span>
                    <span className="font-semibold">{successStory.timeframe}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-600 mb-2">Key Success Factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {successStory.keyFactors.map((factor, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Dashboard */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
            <button 
              onClick={() => navigate('/ngo-dashboard/donations')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View All Donations →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className={`w-3 h-3 rounded-full mr-4 ${
                  donation.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {donation.amount} from {donation.donor}
                      </p>
                      <p className="text-sm text-gray-600">Campaign: {donation.campaign}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {donation.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{donation.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Reminder Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 mt-8">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-xl font-bold mb-4">Building Donor Trust</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Kindify helps you build trust with donors through transparency, regular updates, and verified profiles. 
              Keep your profile updated and share impact stories to maximize donor confidence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="font-semibold mb-2">Verified Profiles</div>
                <div className="text-green-100">Build credibility with donors</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="font-semibold mb-2">Impact Tracking</div>
                <div className="text-green-100">Show real results to donors</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="font-semibold mb-2">Secure Payments</div>
                <div className="text-green-100">Safe and transparent transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NGOHome; 