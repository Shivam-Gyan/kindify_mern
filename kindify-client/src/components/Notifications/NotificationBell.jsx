import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    // Dummy data for demonstration
    const dummyNotifications = [
        {
            id: 1,
            title: 'New Campaign',
            message: 'Red Cross has launched a new disaster relief campaign',
            type: 'campaign',
            status: 'unread',
            date: '2024-01-20T10:30:00Z'
        },
        {
            id: 2,
            title: 'Donation Received',
            message: 'Your donation of $50 has been received by Save the Children',
            type: 'donation',
            status: 'unread',
            date: '2024-01-20T09:15:00Z'
        },
        {
            id: 3,
            title: 'Impact Report',
            message: 'New impact report available for Education for All campaign',
            type: 'impact',
            status: 'read',
            date: '2024-01-19T16:20:00Z'
        },
        {
            id: 4,
            title: 'Campaign Update',
            message: 'Clean Water Initiative has reached 75% of its goal',
            type: 'update',
            status: 'read',
            date: '2024-01-19T14:30:00Z'
        },
        {
            id: 5,
            title: 'Thank You',
            message: 'Thank you for your generous donation to World Vision',
            type: 'thankyou',
            status: 'read',
            date: '2024-01-18T12:00:00Z'
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchNotifications = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch(`/api/notifications/${user?.role || 'donor'}`);
                // const data = await response.json();
                
                // Using dummy data for now
                setTimeout(() => {
                    setNotifications(dummyNotifications);
                    setUnreadCount(dummyNotifications.filter(n => n.status === 'unread').length);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user?.role]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNotificationClick = (notification) => {
        // Mark as read if unread
        if (notification.status === 'unread') {
            setNotifications(prev => prev.map(n => 
                n.id === notification.id ? { ...n, status: 'read' } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        }

        // Navigate to notifications page
        const role = user?.role || 'donor';
        navigate(`/${role}-dashboard/notifications`);
        setShowDropdown(false);
    };

    const getTypeIcon = (type) => {
        const iconConfig = {
            campaign: 'fi fi-ss-fundraising text-blue-600',
            donation: 'fi fi-ss-donate text-green-600',
            impact: 'fi fi-ss-chart-line-up text-purple-600',
            update: 'fi fi-sr-info text-orange-600',
            thankyou: 'fi fi-sr-heart text-red-600'
        };
        
        return iconConfig[type] || 'fi fi-sr-bell text-gray-600';
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        
        return date.toLocaleDateString();
    };

    const recentNotifications = notifications.slice(0, 5);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell */}
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
                <i className="fi fi-sr-bell-notification-social-media text-xl"></i>
                
                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                            <button
                                onClick={() => {
                                    const role = user?.role || 'donor';
                                    navigate(`/${role}-dashboard/notifications`);
                                    setShowDropdown(false);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View All
                            </button>
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : recentNotifications.length === 0 ? (
                            <div className="p-4 text-center">
                                <i className="fi fi-sr-bell-notification-social-media text-2xl text-gray-300 mb-2"></i>
                                <p className="text-gray-500 text-sm">No notifications</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {recentNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                            notification.status === 'unread' ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-full ${
                                                notification.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'
                                            }`}>
                                                <i className={`${getTypeIcon(notification.type)} text-sm`}></i>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className={`text-sm font-medium ${
                                                            notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
                                                        }`}>
                                                            {notification.title}
                                                            {notification.status === 'unread' && (
                                                                <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            {formatTimeAgo(notification.date)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {recentNotifications.length > 0 && (
                        <div className="p-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    const role = user?.role || 'donor';
                                    navigate(`/${role}-dashboard/notifications`);
                                    setShowDropdown(false);
                                }}
                                className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View All Notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell; 