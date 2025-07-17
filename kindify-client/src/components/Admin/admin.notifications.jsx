import React, { useState, useEffect } from 'react';
import { AnimationWrapper } from '../../common';
import { toast } from 'react-hot-toast';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // Dummy data for demonstration
    const dummyNotifications = [
        {
            id: 1,
            title: 'New NGO Application',
            message: 'Save the Children has submitted a new application for verification',
            type: 'application',
            status: 'unread',
            date: '2024-01-20T10:30:00Z',
            priority: 'high'
        },
        {
            id: 2,
            title: 'System Alert',
            message: 'High number of failed login attempts detected',
            type: 'alert',
            status: 'read',
            date: '2024-01-20T09:15:00Z',
            priority: 'critical'
        },
        {
            id: 3,
            title: 'Donation Milestone',
            message: 'Total donations have reached $1M this month',
            type: 'milestone',
            status: 'unread',
            date: '2024-01-20T08:45:00Z',
            priority: 'medium'
        },
        {
            id: 4,
            title: 'User Report',
            message: 'New report filed against NGO XYZ for inappropriate content',
            type: 'report',
            status: 'unread',
            date: '2024-01-19T16:20:00Z',
            priority: 'high'
        },
        {
            id: 5,
            title: 'System Maintenance',
            message: 'Scheduled maintenance completed successfully',
            type: 'system',
            status: 'read',
            date: '2024-01-19T14:30:00Z',
            priority: 'low'
        },
        {
            id: 6,
            title: 'New User Registration',
            message: '50 new users registered in the last 24 hours',
            type: 'user',
            status: 'read',
            date: '2024-01-19T12:00:00Z',
            priority: 'medium'
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchNotifications = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('/api/admin/notifications');
                // const data = await response.json();
                
                // Using dummy data for now
                setTimeout(() => {
                    setNotifications(dummyNotifications);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                toast.error('Failed to load notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (notificationId) => {
        try {
            // Replace with actual API call
            // await fetch(`/api/admin/notifications/${notificationId}/read`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' }
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 300));

            // Update local state
            setNotifications(prev => prev.map(notification => 
                notification.id === notificationId ? { ...notification, status: 'read' } : notification
            ));

            toast.success('Notification marked as read');
        } catch (error) {
            console.error('Error marking notification as read:', error);
            toast.error('Failed to update notification status');
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            // Replace with actual API call
            // await fetch(`/api/admin/notifications/${notificationId}`, {
            //     method: 'DELETE'
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 300));

            // Update local state
            setNotifications(prev => prev.filter(notification => notification.id !== notificationId));

            toast.success('Notification deleted');
        } catch (error) {
            console.error('Error deleting notification:', error);
            toast.error('Failed to delete notification');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            // Replace with actual API call
            // await fetch('/api/admin/notifications/mark-all-read', {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' }
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update local state
            setNotifications(prev => prev.map(notification => ({ ...notification, status: 'read' })));

            toast.success('All notifications marked as read');
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            toast.error('Failed to update notifications');
        }
    };

    const getTypeIcon = (type) => {
        const iconConfig = {
            application: 'fi fi-br-building-ngo text-blue-600',
            alert: 'fi fi-sr-exclamation-triangle text-red-600',
            milestone: 'fi fi-ss-chart-line-up text-green-600',
            report: 'fi fi-sr-flag text-orange-600',
            system: 'fi fi-sr-settings text-gray-600',
            user: 'fi fi-sr-users text-purple-600'
        };
        
        return iconConfig[type] || iconConfig.system;
    };

    const getPriorityColor = (priority) => {
        const colorConfig = {
            low: 'border-l-gray-400',
            medium: 'border-l-yellow-400',
            high: 'border-l-orange-400',
            critical: 'border-l-red-400'
        };
        
        return colorConfig[priority] || colorConfig.low;
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

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return notification.status === 'unread';
        return notification.type === filter;
    });

    const unreadCount = notifications.filter(n => n.status === 'unread').length;

    if (loading) {
        return (
            <AnimationWrapper>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimationWrapper>
        );
    }

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Stay updated with platform activities and alerts
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                            </span>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Mark All as Read
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-wrap items-center space-x-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'all' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'unread' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Unread
                        </button>
                        <button
                            onClick={() => setFilter('application')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'application' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Applications
                        </button>
                        <button
                            onClick={() => setFilter('alert')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'alert' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Alerts
                        </button>
                        <button
                            onClick={() => setFilter('report')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'report' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Reports
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <i className="fi fi-sr-bell-notification-social-media text-4xl text-gray-300 mb-4"></i>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                            <p className="text-gray-600">You're all caught up!</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4 ${getPriorityColor(notification.priority)} ${
                                    notification.status === 'unread' ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-2 rounded-full ${
                                        notification.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'
                                    }`}>
                                        <i className={`${getTypeIcon(notification.type)} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                    {notification.status === 'unread' && (
                                                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {formatTimeAgo(notification.date)}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {notification.status === 'unread' && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Mark as Read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteNotification(notification.id)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default AdminNotifications; 