import React from "react";
import { AnimationWrapper } from "../../common";

const NotificationsNGO = () => {
    const notifications = [
        {
            id: 1,
            type: "donation",
            message: "You received a new donation of ₹5,000 from John Doe for 'Education for All' campaign.",
            date: "2024-01-15",
            time: "10:45 AM",
            read: false
        },
        {
            id: 2,
            type: "campaign",
            message: "Your 'Clean Water Initiative' campaign has been approved.",
            date: "2024-01-14",
            time: "2:00 PM",
            read: true
        },
        {
            id: 3,
            type: "verification",
            message: "KYC verification is pending. Please upload the required documents.",
            date: "2024-01-13",
            time: "9:30 AM",
            read: false
        },
        {
            id: 4,
            type: "withdrawal",
            message: "Your withdrawal request of ₹75,000 is being processed.",
            date: "2024-01-12",
            time: "4:10 PM",
            read: true
        },
        {
            id: 5,
            type: "impact",
            message: "Impact report for 'Medical Camp' campaign has been published.",
            date: "2024-01-11",
            time: "11:00 AM",
            read: true
        }
    ];

    const getTypeIcon = (type) => {
        switch (type) {
            case 'donation': return '💰';
            case 'campaign': return '📊';
            case 'verification': return '🔒';
            case 'withdrawal': return '🏦';
            case 'impact': return '📝';
            default: return '🔔';
        }
    };

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
                        <p className="text-gray-600">Stay updated with real-time alerts and updates</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                        Mark all as read
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-4 p-6 transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                            >
                                <div className="text-3xl">
                                    {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium mb-1">{notification.message}</p>
                                    <div className="text-xs text-gray-500">
                                        {notification.date} at {notification.time}
                                    </div>
                                </div>
                                {!notification.read && (
                                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default NotificationsNGO; 