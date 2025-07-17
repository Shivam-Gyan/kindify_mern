import React, { useState, useEffect } from 'react';
import { AnimationWrapper } from '../../common';
import { toast } from 'react-hot-toast';

const AdminDashboardContent = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalNGOs: 0,
        totalDonations: 0,
        totalReports: 0
    });
    const [loading, setLoading] = useState(true);

    // Dummy data for demonstration
    const dummyStats = {
        totalUsers: 1247,
        totalNGOs: 89,
        totalDonations: 45678,
        totalReports: 23
    };

    useEffect(() => {
        // Simulate API call
        const fetchStats = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('/api/admin/stats');
                // const data = await response.json();
                
                // Using dummy data for now
                setTimeout(() => {
                    setStats(dummyStats);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching stats:', error);
                toast.error('Failed to load dashboard stats');
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    const StatCard = ({ title, value, icon, color, change }) => (
        <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {loading ? (
                            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                            formatNumber(value)
                        )}
                    </p>
                    {change && (
                        <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '+' : ''}{change}% from last month
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <i className={`${icon} text-white text-xl`}></i>
                </div>
            </div>
        </div>
    );

    const QuickActionCard = ({ title, description, icon, link, color }) => (
        <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:scale-105 cursor-pointer`}>
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${color}`}>
                    <i className={`${icon} text-white text-xl`}></i>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
            </div>
        </div>
    );

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
                    <p className="text-blue-100">Here's what's happening with Kindify today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon="fi fi-sr-users"
                        color="bg-blue-500"
                        change={12}
                    />
                    <StatCard
                        title="Total NGOs"
                        value={stats.totalNGOs}
                        icon="fi fi-br-building-ngo"
                        color="bg-green-500"
                        change={8}
                    />
                    <StatCard
                        title="Total Donations"
                        value={stats.totalDonations}
                        icon="fi fi-ss-donate"
                        color="bg-purple-500"
                        change={-3}
                    />
                    <StatCard
                        title="Reports"
                        value={stats.totalReports}
                        icon="fi fi-sr-flag"
                        color="bg-red-500"
                        change={15}
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <QuickActionCard
                            title="Moderate NGOs"
                            description="Review and approve NGO applications"
                            icon="fi fi-br-building-ngo"
                            color="bg-blue-500"
                            link="/admin-dashboard/ngo-moderation"
                        />
                        <QuickActionCard
                            title="User Management"
                            description="Manage user accounts and permissions"
                            icon="fi fi-sr-users"
                            color="bg-green-500"
                            link="/admin-dashboard/users"
                        />
                        <QuickActionCard
                            title="View Reports"
                            description="Review user reports and feedback"
                            icon="fi fi-sr-flag"
                            color="bg-red-500"
                            link="/admin-dashboard/reports"
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { action: 'New NGO Application', entity: 'Save the Children', time: '2 hours ago', type: 'application' },
                            { action: 'Donation Completed', entity: '$5,000 to Red Cross', time: '4 hours ago', type: 'donation' },
                            { action: 'Report Filed', entity: 'Concern about NGO XYZ', time: '6 hours ago', type: 'report' },
                            { action: 'User Registered', entity: 'john.doe@example.com', time: '8 hours ago', type: 'user' }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <div className={`p-2 rounded-full ${
                                    activity.type === 'application' ? 'bg-blue-100' :
                                    activity.type === 'donation' ? 'bg-green-100' :
                                    activity.type === 'report' ? 'bg-red-100' : 'bg-gray-100'
                                }`}>
                                    <i className={`${
                                        activity.type === 'application' ? 'fi fi-br-building-ngo text-blue-600' :
                                        activity.type === 'donation' ? 'fi fi-ss-donate text-green-600' :
                                        activity.type === 'report' ? 'fi fi-sr-flag text-red-600' : 'fi fi-sr-users text-gray-600'
                                    }`}></i>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                    <p className="text-sm text-gray-600">{activity.entity}</p>
                                </div>
                                <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default AdminDashboardContent; 