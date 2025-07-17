import React from "react";
import { AnimationWrapper } from "../../common";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

const NGODashboardContent = () => {
    const donationTrends = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Donations Received',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    const campaignPerformance = [
        {
            label: 'Campaign Performance',
            data: [65, 25, 10],
            backgroundColor: [
                '#22c55e',
                '#2563eb',
                '#fb923c'
            ],
            borderColor: [
                '#22c55e',
                '#2563eb',
                '#fb923c'
            ],
            borderWidth: 2,
            borderJoinStyle: 'round',
        }
    ];
    const activities = [
        {
            icon: '💰',
            color: 'bg-green-100 text-green-600',
            border: 'border-green-400',
            title: 'New donation received',
            desc: '₹5,000 from John Doe for "Education for All" campaign',
            time: '2 hours ago',
        },
        {
            icon: '📊',
            color: 'bg-blue-100 text-blue-600',
            border: 'border-blue-400',
            title: 'Campaign approved',
            desc: '"Clean Water Initiative" campaign has been approved',
            time: '1 day ago',
        },
        {
            icon: '📝',
            color: 'bg-orange-100 text-orange-600',
            border: 'border-orange-400',
            title: 'Impact report submitted',
            desc: 'Monthly impact report for "Health Care" campaign',
            time: '3 days ago',
        },
        {
            icon: '💬',
            color: 'bg-purple-100 text-purple-600',
            border: 'border-purple-400',
            title: 'New message received',
            desc: 'Message from donor regarding "Education for All" campaign',
            time: '5 days ago',
        },
    ];

    // Mock verification status
    const verificationStatus = {
        status: 'verified', // 'verified', 'pending', 'rejected'
        lastUpdated: '2024-01-10',
        documents: [
            { name: 'Darpan Certificate', status: 'verified' },
            { name: 'Registration Certificate', status: 'verified' },
            { name: 'Bank Statement', status: 'verified' },
            { name: 'Audit Report', status: 'pending' }
        ]
    };

    // Mock reminder cards
    const pendingTasks = [
        {
            id: 1,
            title: 'Update Profile',
            description: 'Complete your NGO profile to increase donor trust',
            priority: 'high',
            icon: '📝',
            action: 'Update Now'
        },
        {
            id: 2,
            title: 'Add New Campaign',
            description: 'Create a new campaign to reach more donors',
            priority: 'medium',
            icon: '📊',
            action: 'Create Campaign'
        },
        {
            id: 3,
            title: 'Upload Impact Report',
            description: 'Share your latest impact with donors',
            priority: 'medium',
            icon: '📈',
            action: 'Upload Report'
        }
    ];

    const getVerificationBadge = (status) => {
        switch (status) {
            case 'verified':
                return (
                    <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Pending
                    </div>
                );
            case 'rejected':
                return (
                    <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Rejected
                    </div>
                );
            default:
                return null;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-red-200 bg-red-50';
            case 'medium': return 'border-yellow-200 bg-yellow-50';
            case 'low': return 'border-blue-200 bg-blue-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };

    return (
        <AnimationWrapper>
            <main className="flex flex-col gap-10 border-t-[1px] py-10 border-gray-200 mt-4 mb-6 px-2 md:px-0">
                {/* Verification Status Banner */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-3xl">🔒</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Verification Status</h3>
                                <p className="text-sm text-gray-600">Last updated: {new Date(verificationStatus.lastUpdated).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {getVerificationBadge(verificationStatus.status)}
                    </div>
                    
                    {verificationStatus.status === 'verified' && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-800">
                                ✅ Your NGO is verified and eligible to receive donations. All major documents have been approved.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pending Tasks Reminder Cards */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {pendingTasks.map((task) => (
                            <div key={task.id} className={`border rounded-lg p-4 ${getPriorityColor(task.priority)}`}>
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">{task.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800 mb-1">{task.title}</h4>
                                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                            {task.action} →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            label: 'Total Donations',
                            value: '₹123,450',
                            sub: '+12% this month',
                            icon: '💰',
                            color: 'bg-blue-500',
                        },
                        {
                            label: 'Active Campaigns',
                            value: '8',
                            sub: '3 pending approval',
                            icon: '📊',
                            color: 'bg-green-500',
                        },
                        {
                            label: 'Total Donors',
                            value: '1,234',
                            sub: '+45 this week',
                            icon: '👥',
                            color: 'bg-purple-500',
                        },
                        {
                            label: 'Available Balance',
                            value: '₹45,670',
                            sub: 'Ready for withdrawal',
                            icon: '🏦',
                            color: 'bg-orange-500',
                        },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="group bg-white hover:shadow-xl transition-shadow duration-200 rounded-2xl p-6 flex flex-col gap-3 border border-gray-100 shadow-md min-h-[140px]"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${card.color} bg-opacity-20 group-hover:scale-105 transition-transform`}>{card.icon}</div>
                                <div>
                                    <p className="text-gray-500 text-xs font-medium">{card.label}</p>
                                    <p className="text-2xl font-bold text-gray-800 leading-tight">{card.value}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Donation Trends Chart */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-2 min-h-[320px]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Donation Trends</h3>
                            <Link to={'/ngo-dashboard/donations'} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details →
                            </Link>
                        </div>
                        <div className="flex-1 flex items-center">
                            <Line
                                data={donationTrends}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: false },
                                        tooltip: { enabled: true },
                                    },
                                    scales: {
                                        x: {
                                            title: { display: true, text: 'Month', color: '#64748b', font: { size: 12 } },
                                            grid: { display: false },
                                        },
                                        y: {
                                            beginAtZero: true,
                                            title: { display: true, text: 'Amount (₹)', color: '#64748b', font: { size: 12 } },
                                            ticks: {
                                                callback: function(value) {
                                                    return '₹' + value.toLocaleString();
                                                },
                                                color: '#64748b',
                                            },
                                            grid: { color: '#f1f5f9' },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    {/* Campaign Performance Chart */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-2 min-h-[320px]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Campaign Performance</h3>
                            <Link to={'/ngo-dashboard/campaigns'} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="flex-1 flex items-center">
                            <Doughnut
                                data={{
                                    labels: ['Successful', 'In Progress', 'Pending'],
                                    datasets: campaignPerformance,
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                usePointStyle: true,
                                                pointStyle: 'circle',
                                                boxWidth: 10,
                                                padding: 20,
                                                color: '#334155',
                                                font: { size: 13, weight: 'bold' },
                                            },
                                        },
                                        tooltip: { enabled: true },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Activities Timeline */}
                <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Recent Activities</h3>
                        <Link to={'/ngo-dashboard/notifications'} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All →
                        </Link>
                    </div>
                    <ol className="relative border-l-2 border-gray-200 ml-4 space-y-0">
                        {activities.map((act, idx) => (
                            <li key={idx} className="mb-8 ml-6 last:mb-0">
                                <span className={`absolute -left-5 flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white ${act.color} text-xl border-2 ${act.border}`}>{act.icon}</span>
                                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-gray-800">{act.title}</p>
                                        <span className="text-xs text-gray-400">{act.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{act.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </main>
        </AnimationWrapper>
    );
};

export default NGODashboardContent; 