import React, { useState } from "react";
import { AnimationWrapper } from "../../common";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

const DonorDashboardContent = () => {
    const [showShareModal, setShowShareModal] = useState(false);

    const donatedSector = [
        {
            label: 'Donated Sectors',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 4,
            borderJoinStyle: 'round',
        }
    ];

    // Mock impact feed data
    const impactFeed = [
        {
            id: 1,
            ngo: "Shanti Niketan Trust",
            campaign: "Education for Rural Children",
            impact: "50 new students enrolled in our rural school program",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
            date: "2 days ago",
            type: "education"
        },
        {
            id: 2,
            ngo: "Poor Children Welfare",
            campaign: "Healthcare for All",
            impact: "200 children received free medical checkups",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
            date: "1 week ago",
            type: "healthcare"
        },
        {
            id: 3,
            ngo: "Green Earth Initiative",
            campaign: "Tree Plantation Drive",
            impact: "1,000 trees planted in urban areas",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
            date: "2 weeks ago",
            type: "environment"
        }
    ];

    // Mock donation summary
    const donationSummary = {
        totalDonated: 5000,
        totalNGOs: 4,
        totalDonations: 8,
        lastDonation: {
            amount: 1000,
            ngo: "Shanti Niketan Trust",
            date: "2024-01-15",
            campaign: "Education for Rural Children"
        }
    };

    const getImpactIcon = (type) => {
        switch (type) {
            case 'education': return '📚';
            case 'healthcare': return '🏥';
            case 'environment': return '🌱';
            default: return '❤️';
        }
    };

    return (
        <AnimationWrapper>
            <main className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] py-8 border-gray-200 mt-4 mb-6 '>

                <div className="w-full max-sm:px-7 lg:mr-8 sm:w-1/2 lg:w-1/2 flex flex-col items-start  justify-center gap-4">
                    {/* Donation Summary Section */}
                    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
                        <h3 className="text-xl font-bold mb-4">Your Donation Summary</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-blue-100 text-sm">Total Donated</p>
                                <p className="text-2xl font-bold">₹{donationSummary.totalDonated.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-blue-100 text-sm">NGOs Supported</p>
                                <p className="text-2xl font-bold">{donationSummary.totalNGOs}</p>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                            <p className="text-sm text-blue-100">Last Donation</p>
                            <p className="font-semibold">{donationSummary.lastDonation.ngo}</p>
                            <p className="text-sm">{donationSummary.lastDonation.campaign}</p>
                            <p className="text-xs text-blue-200">₹{donationSummary.lastDonation.amount} • {new Date(donationSummary.lastDonation.date).toLocaleDateString()}</p>
                        </div>
                        <button 
                            onClick={() => setShowShareModal(true)}
                            className="mt-4 w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Share Your Donation Story
                        </button>
                    </div>

                    <div className="flex w-full flex-col items-start justify-center gap-2">
                        <div className="text-xl w-full flex justify-between items-center  text-gray-600">
                            <span>Donations</span>
                            <Link to={'/donor-dashboard/donations'} className=" cursor-pointer rounded-md bg-[#F1F2F7] text-sm hover:text-gray-700 hover:shadow-lg font-semibold px-4 py-2 ">View Report</Link>
                        </div>
                        <p className="text-slate-700 text-2xl"><span className="text-2xl text-pretty font-medium tracking-wide mr-1">₹</span>{donationSummary.totalDonated.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">Donated from 1 to 12 Dec</p>
                    </div>
                    <Doughnut
                        data={{
                            labels: ['Education', 'Health', 'Environment'],
                            datasets: donatedSector,
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    align: 'center',
                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: 'circle',
                                        boxWidth: 10,
                                        padding: 20,
                                        color: 'black',
                                        font: {
                                            size: 10,
                                            weight: 'bold',
                                        }
                                    },
                                },
                                title: {
                                    display: false,
                                },
                                subtitle: {
                                    display: true,
                                    text: 'Donated Sectors Distribution',
                                    position: 'bottom',
                                    align: 'center',
                                    font: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                    padding: {
                                        top: 30,
                                    }
                                },
                            },
                        }}
                    />
                </div>

                <div className="w-full h-full lg:px-16">
                    <h1 className="text-xl font-medium text-gray-400 mb-3">Most donated NGOs</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start bg-[#F1F2F7] p-4 rounded-md gap-2">
                            <div className="w-16 flex-none h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                <img src="https://t4.ftcdn.net/jpg/05/26/35/07/360_F_526350772_taMM7EVaoDzWAashADdBrYkjH24hqS3c.jpg" alt="" className="w-16 h-16 object-cover" />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full">
                                <h1 className="text-md font-medium text-slate-600 ">Shanti Niketan Trust</h1>
                                <div className="flex items-center gap-2 mt-1 flex-wrap text-gray-600">
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Education</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Food</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Health</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Public</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start   bg-[#F1F2F7] p-4 rounded-md gap-2">
                            <div className="w-16 flex-none h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                <img src="https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1" alt="" className="w-16 h-16 object-cover" />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full">
                                <h1 className="text-md font-medium text-slate-600 ">Poor Children Welfare</h1>
                                <div className="flex items-center gap-2 mt-1 flex-wrap text-gray-600">
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Education</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Food</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Health</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Public</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start   bg-[#F1F2F7] p-4 rounded-md gap-2">
                            <div className="w-16 flex-none h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3-WZvXdh_iSvNFSI3NKxR6AuBdJ9GRdS_gA&s" alt="" className="w-16 h-16 object-cover" />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full">
                                <h1 className="text-md font-medium text-slate-600 ">African Youth Welfare</h1>
                                <div className="flex items-center gap-2 mt-1 flex-wrap text-gray-600">
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Education</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Food</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Health</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Public</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start   bg-[#F1F2F7] p-4 rounded-md gap-2">
                            <div className="w-16 flex-none h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10Dntsedb7vLhacjDdEMdSosZjrXWZ-Yn0Q&s" alt="" className="w-16 h-16 object-cover" />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full">
                                <h1 className="text-md font-medium text-slate-600 ">Youth Welfare</h1>
                                <div className="flex items-center gap-2 mt-1 flex-wrap text-gray-600">
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Education</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Food</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Health</p>
                                    <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Public</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Impact Feed Section */}
            <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Impact from Your Donations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {impactFeed.map((impact) => (
                        <div key={impact.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <img
                                    src={impact.image}
                                    alt={impact.ngo}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                                        {getImpactIcon(impact.type)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-1">{impact.ngo}</h3>
                                <p className="text-sm text-blue-600 mb-2">{impact.campaign}</p>
                                <p className="text-gray-600 text-sm mb-3">{impact.impact}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">{impact.date}</span>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Share Donation Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Share Your Donation Story</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Share Message (Optional)
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Share why you chose to donate and what impact you hope to create..."
                                ></textarea>
                            </div>
                            
                            <div className="flex space-x-2">
                                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                                    Share on Social Media
                                </button>
                                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                                    Copy Link
                                </button>
                            </div>
                            
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AnimationWrapper>
    )
}

export default DonorDashboardContent;