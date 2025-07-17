import React, { useState } from 'react';
import { AnimationWrapper } from "../../common";

const DonorNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "donation",
            message: "Your donation of ₹5,000 to 'Education for All' campaign has been successfully processed.",
            date: "2024-01-15",
            time: "10:45 AM",
            read: false,
            campaign: "Education for All",
            ngo: "Shanti Niketan Trust"
        },
        {
            id: 2,
            type: "impact",
            message: "New impact report available for 'Healthcare for All' campaign you supported.",
            date: "2024-01-14",
            time: "2:00 PM",
            read: false,
            campaign: "Healthcare for All",
            ngo: "Poor Children Welfare"
        },
        {
            id: 3,
            type: "campaign",
            message: "A new campaign 'Clean Water Initiative' has been launched by an NGO you follow.",
            date: "2024-01-13",
            time: "9:30 AM",
            read: true,
            campaign: "Clean Water Initiative",
            ngo: "Water for All"
        },
        {
            id: 4,
            type: "ngo",
            message: "Shanti Niketan Trust has updated their profile with new impact stories.",
            date: "2024-01-12",
            time: "4:10 PM",
            read: true,
            ngo: "Shanti Niketan Trust"
        },
        {
            id: 5,
            type: "milestone",
            message: "Congratulations! You've donated to 10 different NGOs. You're making a real difference!",
            date: "2024-01-11",
            time: "11:00 AM",
            read: false
        },
        {
            id: 6,
            type: "reminder",
            message: "Don't forget to check your monthly donation impact report.",
            date: "2024-01-10",
            time: "8:30 AM",
            read: true
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const getTypeIcon = (type) => {
        switch (type) {
            case 'donation': return '💰';
            case 'impact': return '📊';
            case 'campaign': return '📢';
            case 'ngo': return '🏢';
            case 'milestone': return '🏆';
            case 'reminder': return '⏰';
            default: return '🔔';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'donation': return 'bg-green-100 text-green-600';
            case 'impact': return 'bg-blue-100 text-blue-600';
            case 'campaign': return 'bg-purple-100 text-purple-600';
            case 'ngo': return 'bg-orange-100 text-orange-600';
            case 'milestone': return 'bg-yellow-100 text-yellow-600';
            case 'reminder': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notification => 
                notification.id === id 
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

  return (
        <AnimationWrapper>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
                        <p className="text-gray-600">Stay updated with your donation activities and impact</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                {unreadCount} unread
                            </span>
                        )}
                        <button 
                            onClick={markAllAsRead}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Notification Bell Icon with Counter */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="text-4xl">🔔</div>
                            {unreadCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">
                                {unreadCount > 0 ? `${unreadCount} new notifications` : 'All caught up!'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {unreadCount > 0 
                                    ? 'You have unread notifications' 
                                    : 'No new notifications at the moment'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-4 p-6 transition-colors hover:bg-gray-50 ${
                                    notification.read ? 'bg-white' : 'bg-blue-50'
                                }`}
                            >
                                <div className={`text-2xl p-2 rounded-full ${getTypeColor(notification.type)}`}>
                                    {getTypeIcon(notification.type)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className={`font-medium mb-1 ${
                                                notification.read ? 'text-gray-800' : 'text-gray-900'
                                            }`}>
                                                {notification.message}
                                            </p>
                                            
                                            {notification.campaign && (
                                                <p className="text-sm text-blue-600 mb-1">
                                                    Campaign: {notification.campaign}
                                                </p>
                                            )}
                                            
                                            {notification.ngo && (
                                                <p className="text-sm text-gray-600 mb-2">
                                                    NGO: {notification.ngo}
                                                </p>
                                            )}
                                            
                                            <div className="text-xs text-gray-500">
                                                {notification.date} at {notification.time}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 ml-4">
                                            {!notification.read && (
                                                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                            )}
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-gray-400 hover:text-gray-600 text-sm"
                                            >
                                                {notification.read ? '✓' : 'Mark read'}
                                            </button>
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="text-gray-400 hover:text-red-600 text-sm"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔔</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No notifications yet</h3>
                        <p className="text-gray-600">When you make donations or follow NGOs, you'll see notifications here.</p>
                    </div>
                )}

                {/* Notification Preferences */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Donation confirmations</p>
                                <p className="text-sm text-gray-600">Get notified when your donations are processed</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Impact reports</p>
                                <p className="text-sm text-gray-600">Get notified when NGOs you support share impact reports</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">New campaigns</p>
                                <p className="text-sm text-gray-600">Get notified about new campaigns from NGOs you follow</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default DonorNotifications;