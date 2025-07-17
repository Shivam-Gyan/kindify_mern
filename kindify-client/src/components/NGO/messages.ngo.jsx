import React, { useState } from "react";
import { AnimationWrapper } from "../../common";

const MessagesNGO = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showComposeModal, setShowComposeModal] = useState(false);
    const [activeTab, setActiveTab] = useState('inbox');

    const messages = [
        {
            id: 1,
            sender: "John Doe",
            email: "john.doe@email.com",
            subject: "Question about Education for All campaign",
            content: "Hi, I recently donated to your Education for All campaign and I was wondering how the progress is going. Could you share some updates on how the funds are being utilized?",
            date: "2024-01-15",
            time: "10:30 AM",
            status: "unread",
            campaign: "Education for All",
            donationAmount: 5000
        },
        {
            id: 2,
            sender: "Jane Smith",
            email: "jane.smith@email.com",
            subject: "Thank you for the impact report",
            content: "Thank you for sharing the detailed impact report for the Clean Water Initiative. It's wonderful to see the positive change our donations are making. Keep up the great work!",
            date: "2024-01-14",
            time: "2:15 PM",
            status: "read",
            campaign: "Clean Water Initiative",
            donationAmount: 2500
        },
        {
            id: 3,
            sender: "Anonymous Donor",
            email: "anonymous@email.com",
            subject: "Request for more information",
            content: "I would like to know more about your upcoming projects and how I can get involved. Are there any volunteer opportunities available?",
            date: "2024-01-13",
            time: "9:45 AM",
            status: "unread",
            campaign: "General Inquiry",
            donationAmount: 0
        },
        {
            id: 4,
            sender: "Mike Johnson",
            email: "mike.johnson@email.com",
            subject: "Monthly donation setup",
            content: "I would like to set up a monthly recurring donation. Could you please guide me through the process?",
            date: "2024-01-12",
            time: "4:20 PM",
            status: "read",
            campaign: "Tree Plantation Drive",
            donationAmount: 1500
        },
        {
            id: 5,
            sender: "Sarah Wilson",
            email: "sarah.wilson@email.com",
            subject: "Impact story request",
            content: "I'm writing a blog about charitable giving and would love to feature your organization. Could you share some success stories from your campaigns?",
            date: "2024-01-11",
            time: "11:30 AM",
            status: "read",
            campaign: "General Inquiry",
            donationAmount: 0
        }
    ];

    const sentMessages = [
        {
            id: 1,
            recipient: "John Doe",
            email: "john.doe@email.com",
            subject: "Re: Question about Education for All campaign",
            content: "Thank you for your generous donation! We're happy to share that we've successfully enrolled 150 children in our education program. We've built 2 new classrooms and distributed 300 books. Your support is making a real difference in these children's lives.",
            date: "2024-01-15",
            time: "3:45 PM",
            campaign: "Education for All"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'unread': return 'bg-blue-100 text-blue-800';
            case 'read': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const currentMessages = activeTab === 'inbox' ? messages : sentMessages;
    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
                        <p className="text-gray-600">Communicate with your donors and supporters</p>
                    </div>
                    <button
                        onClick={() => setShowComposeModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                    >
                        <span>+</span>
                        Compose Message
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Messages</p>
                                <p className="text-2xl font-bold text-gray-800">{messages.length + sentMessages.length}</p>
                            </div>
                            <div className="text-3xl text-blue-600">💬</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Unread</p>
                                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                            </div>
                            <div className="text-3xl text-blue-600">📧</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Sent</p>
                                <p className="text-2xl font-bold text-green-600">{sentMessages.length}</p>
                            </div>
                            <div className="text-3xl text-green-600">📤</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Response Rate</p>
                                <p className="text-2xl font-bold text-purple-600">85%</p>
                            </div>
                            <div className="text-3xl text-purple-600">📊</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    {['inbox', 'sent'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md font-medium text-sm capitalize transition-colors ${
                                activeTab === tab
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            {tab}
                            {tab === 'inbox' && unreadCount > 0 && (
                                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Messages Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-md border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">
                                {activeTab === 'inbox' ? 'Inbox' : 'Sent Messages'}
                            </h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {currentMessages.map((message) => (
                                <div
                                    key={message.id}
                                    onClick={() => setSelectedMessage(message)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                        selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-gray-800 text-sm">
                                            {activeTab === 'inbox' ? message.sender : message.recipient}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {message.date}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-1 line-clamp-1">
                                        {message.subject}
                                    </h4>
                                    <p className="text-xs text-gray-600 line-clamp-2">
                                        {message.content}
                                    </p>
                                    {activeTab === 'inbox' && message.status === 'unread' && (
                                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200">
                        {selectedMessage ? (
                            <div className="p-6">
                                <div className="border-b border-gray-200 pb-4 mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {selectedMessage.subject}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {selectedMessage.date} at {selectedMessage.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                From: {activeTab === 'inbox' ? selectedMessage.sender : selectedMessage.recipient}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {activeTab === 'inbox' ? selectedMessage.email : selectedMessage.email}
                                            </p>
                                        </div>
                                        {activeTab === 'inbox' && selectedMessage.donationAmount > 0 && (
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Donation Amount</p>
                                                <p className="text-sm font-medium text-green-600">
                                                    ₹{selectedMessage.donationAmount.toLocaleString()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {selectedMessage.campaign && (
                                        <div className="mt-2">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {selectedMessage.campaign}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mb-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedMessage.content}
                                    </p>
                                </div>
                                
                                {activeTab === 'inbox' && (
                                    <div className="flex space-x-3">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                            Reply
                                        </button>
                                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                                            Forward
                                        </button>
                                        <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md text-sm font-medium">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <div className="text-4xl mb-4">💬</div>
                                <p>Select a message to view its content</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Compose Message Modal */}
                {showComposeModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Compose Message</h3>
                                <button
                                    onClick={() => setShowComposeModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        To
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Select Donor</option>
                                        <option>All Donors</option>
                                        <option>Recent Donors</option>
                                        <option>Campaign Specific</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter subject"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        rows="6"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowComposeModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AnimationWrapper>
    );
};

export default MessagesNGO; 