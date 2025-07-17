import React, { useState, useEffect } from 'react';
import { AnimationWrapper } from '../../common';
import { toast } from 'react-hot-toast';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Dummy data for demonstration
    const dummyUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'donor',
            status: 'active',
            createdAt: '2024-01-15',
            lastLogin: '2024-01-20'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'ngo',
            status: 'active',
            createdAt: '2024-01-10',
            lastLogin: '2024-01-19'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            role: 'donor',
            status: 'inactive',
            createdAt: '2024-01-08',
            lastLogin: '2024-01-15'
        },
        {
            id: 4,
            name: 'Alice Brown',
            email: 'alice.brown@example.com',
            role: 'ngo',
            status: 'banned',
            createdAt: '2024-01-05',
            lastLogin: '2024-01-12'
        },
        {
            id: 5,
            name: 'Charlie Wilson',
            email: 'charlie.wilson@example.com',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-01',
            lastLogin: '2024-01-20'
        },
        {
            id: 6,
            name: 'Diana Davis',
            email: 'diana.davis@example.com',
            role: 'donor',
            status: 'active',
            createdAt: '2024-01-12',
            lastLogin: '2024-01-18'
        },
        {
            id: 7,
            name: 'Edward Miller',
            email: 'edward.miller@example.com',
            role: 'ngo',
            status: 'active',
            createdAt: '2024-01-03',
            lastLogin: '2024-01-17'
        },
        {
            id: 8,
            name: 'Fiona Garcia',
            email: 'fiona.garcia@example.com',
            role: 'donor',
            status: 'inactive',
            createdAt: '2024-01-07',
            lastLogin: '2024-01-14'
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchUsers = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('/api/admin/users');
                // const data = await response.json();
                
                // Using dummy data for now
                setTimeout(() => {
                    setUsers(dummyUsers);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to load users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleStatusUpdate = async (userId, newStatus) => {
        try {
            // Replace with actual API call
            // await fetch(`/api/admin/users/${userId}/status`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ status: newStatus })
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update local state
            setUsers(prev => prev.map(user => 
                user.id === userId ? { ...user, status: newStatus } : user
            ));

            toast.success(`User ${newStatus} successfully`);
        } catch (error) {
            console.error('Error updating user status:', error);
            toast.error('Failed to update user status');
        }
    };

    const getRoleBadge = (role) => {
        const roleConfig = {
            donor: { color: 'bg-blue-100 text-blue-800', text: 'Donor' },
            ngo: { color: 'bg-green-100 text-green-800', text: 'NGO' },
            admin: { color: 'bg-purple-100 text-purple-800', text: 'Admin' }
        };
        
        const config = roleConfig[role] || roleConfig.donor;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { color: 'bg-green-100 text-green-800', text: 'Active' },
            inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
            banned: { color: 'bg-red-100 text-red-800', text: 'Banned' }
        };
        
        const config = statusConfig[status] || statusConfig.active;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage user accounts and permissions
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Total:</span>
                            <span className="text-sm font-medium text-gray-900">{filteredUsers.length} Users</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Roles</option>
                                <option value="donor">Donor</option>
                                <option value="ngo">NGO</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="banned">Banned</option>
                            </select>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setRoleFilter('all');
                                    setStatusFilter('all');
                                }}
                                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Login
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(user.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.lastLogin).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {user.status === 'active' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(user.id, 'inactive')}
                                                            className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
                                                        >
                                                            Deactivate
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(user.id, 'banned')}
                                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                                        >
                                                            Ban
                                                        </button>
                                                    </>
                                                ) : user.status === 'inactive' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(user.id, 'active')}
                                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                                        >
                                                            Activate
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(user.id, 'banned')}
                                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                                        >
                                                            Ban
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStatusUpdate(user.id, 'active')}
                                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                                    >
                                                        Unban
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{filteredUsers.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    currentPage === i + 1
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default AdminUsers; 