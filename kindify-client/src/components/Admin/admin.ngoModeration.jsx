import React, { useState, useEffect } from 'react';
import { AnimationWrapper } from '../../common';
import { toast } from 'react-hot-toast';

const AdminNGOModeration = () => {
    const [ngos, setNgos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Dummy data for demonstration
    const dummyNGOs = [
        {
            id: 1,
            name: 'Save the Children',
            email: 'contact@savethechildren.org',
            status: 'pending',
            registrationNumber: 'NGO001',
            submittedDate: '2024-01-15',
            documents: ['registration_cert.pdf', 'tax_exemption.pdf']
        },
        {
            id: 2,
            name: 'Red Cross Society',
            email: 'info@redcross.org',
            status: 'verified',
            registrationNumber: 'NGO002',
            submittedDate: '2024-01-10',
            documents: ['registration_cert.pdf', 'tax_exemption.pdf']
        },
        {
            id: 3,
            name: 'World Vision',
            email: 'contact@worldvision.org',
            status: 'rejected',
            registrationNumber: 'NGO003',
            submittedDate: '2024-01-08',
            documents: ['registration_cert.pdf', 'tax_exemption.pdf']
        },
        {
            id: 4,
            name: 'Doctors Without Borders',
            email: 'info@msf.org',
            status: 'pending',
            registrationNumber: 'NGO004',
            submittedDate: '2024-01-12',
            documents: ['registration_cert.pdf', 'tax_exemption.pdf']
        },
        {
            id: 5,
            name: 'UNICEF',
            email: 'contact@unicef.org',
            status: 'verified',
            registrationNumber: 'NGO005',
            submittedDate: '2024-01-05',
            documents: ['registration_cert.pdf', 'tax_exemption.pdf']
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchNGOs = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('/api/admin/ngos');
                // const data = await response.json();
                
                // Using dummy data for now
                setTimeout(() => {
                    setNGOs(dummyNGOs);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching NGOs:', error);
                toast.error('Failed to load NGO applications');
                setLoading(false);
            }
        };

        fetchNGOs();
    }, []);

    const handleStatusUpdate = async (ngoId, newStatus) => {
        try {
            // Replace with actual API call
            // await fetch(`/api/admin/ngos/${ngoId}/status`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ status: newStatus })
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update local state
            setNGOs(prev => prev.map(ngo => 
                ngo.id === ngoId ? { ...ngo, status: newStatus } : ngo
            ));

            toast.success(`NGO ${newStatus} successfully`);
        } catch (error) {
            console.error('Error updating NGO status:', error);
            toast.error('Failed to update NGO status');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            verified: { color: 'bg-green-100 text-green-800', text: 'Verified' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const filteredNGOs = ngos.filter(ngo => {
        const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ngo.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || ngo.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const paginatedNGOs = filteredNGOs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredNGOs.length / itemsPerPage);

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
                            <h2 className="text-xl font-semibold text-gray-900">NGO Moderation</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Review and manage NGO applications
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Total:</span>
                            <span className="text-sm font-medium text-gray-900">{filteredNGOs.length} NGOs</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search NGOs by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* NGO Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NGO Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedNGOs.map((ngo) => (
                                    <tr key={ngo.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                                                <div className="text-sm text-gray-500">{ngo.email}</div>
                                                <div className="text-xs text-gray-400">ID: {ngo.registrationNumber}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(ngo.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(ngo.submittedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => {/* View profile modal */}}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    View Profile
                                                </button>
                                                {ngo.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(ngo.id, 'verified')}
                                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(ngo.id, 'rejected')}
                                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
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
                                            {Math.min(currentPage * itemsPerPage, filteredNGOs.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{filteredNGOs.length}</span> results
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

export default AdminNGOModeration; 