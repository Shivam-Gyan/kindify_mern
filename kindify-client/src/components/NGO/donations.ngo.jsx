import React, { useState } from "react";
import { AnimationWrapper } from "../../common";

const DonationsNGO = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const donations = [
        {
            id: 1,
            donorName: "John Doe",
            email: "john.doe@email.com",
            amount: 5000,
            campaign: "Education for All",
            date: "2024-01-15",
            status: "completed",
            paymentMethod: "Credit Card",
            message: "Keep up the great work! Education is the key to a better future."
        },
        {
            id: 2,
            donorName: "Jane Smith",
            email: "jane.smith@email.com",
            amount: 2500,
            campaign: "Clean Water Initiative",
            date: "2024-01-14",
            status: "completed",
            paymentMethod: "UPI",
            message: "Happy to support this important cause."
        },
        {
            id: 3,
            donorName: "Anonymous",
            email: "anonymous@email.com",
            amount: 10000,
            campaign: "Medical Camp",
            date: "2024-01-13",
            status: "pending",
            paymentMethod: "Bank Transfer",
            message: ""
        },
        {
            id: 4,
            donorName: "Mike Johnson",
            email: "mike.johnson@email.com",
            amount: 1500,
            campaign: "Tree Plantation Drive",
            date: "2024-01-12",
            status: "completed",
            paymentMethod: "PayPal",
            message: "Let's make the world greener together!"
        },
        {
            id: 5,
            donorName: "Sarah Wilson",
            email: "sarah.wilson@email.com",
            amount: 7500,
            campaign: "Education for All",
            date: "2024-01-11",
            status: "completed",
            paymentMethod: "Credit Card",
            message: "Education is the most powerful weapon to change the world."
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredDonations = donations.filter(donation => {
        if (activeFilter !== 'all' && donation.status !== activeFilter) return false;
        // Add date filtering logic here if needed
        return true;
    });

    const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const completedDonations = donations.filter(d => d.status === 'completed').reduce((sum, donation) => sum + donation.amount, 0);
    const pendingDonations = donations.filter(d => d.status === 'pending').reduce((sum, donation) => sum + donation.amount, 0);

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Donations</h2>
                        <p className="text-gray-600">Track and manage all donations received</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                        Export Report
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Donations</p>
                                <p className="text-2xl font-bold text-gray-800">₹{totalDonations.toLocaleString()}</p>
                            </div>
                            <div className="text-3xl text-green-600">💰</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Completed</p>
                                <p className="text-2xl font-bold text-green-600">₹{completedDonations.toLocaleString()}</p>
                            </div>
                            <div className="text-3xl text-green-600">✅</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">₹{pendingDonations.toLocaleString()}</p>
                            </div>
                            <div className="text-3xl text-yellow-600">⏳</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Donations Table */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Donor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Campaign
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Method
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDonations.map((donation) => (
                                    <tr key={donation.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {donation.donorName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {donation.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ₹{donation.amount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {donation.campaign}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(donation.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {donation.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    View
                                                </button>
                                                {donation.message && (
                                                    <button className="text-green-600 hover:text-green-900">
                                                        Message
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Message Modal */}
                {donations.find(d => d.message) && (
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Donor Messages</h3>
                        <div className="space-y-3">
                            {donations.filter(d => d.message).slice(0, 3).map((donation) => (
                                <div key={donation.id} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-gray-800">{donation.donorName}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(donation.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{donation.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AnimationWrapper>
    );
};

export default DonationsNGO; 