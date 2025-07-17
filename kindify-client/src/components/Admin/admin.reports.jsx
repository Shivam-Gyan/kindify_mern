import React, { useState, useEffect } from 'react';
import { AnimationWrapper } from '../../common';
import { toast } from 'react-hot-toast';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Dummy data for demonstration
    const dummyReports = [
        {
            id: 1,
            reportedNGO: 'Save the Children',
            reportedProject: 'Education for All',
            reporterName: 'John Doe',
            reporterEmail: 'john.doe@example.com',
            reason: 'Misuse of funds',
            description: 'I donated $500 but the project shows no progress after 6 months',
            status: 'pending',
            date: '2024-01-20',
            priority: 'high'
        },
        {
            id: 2,
            reportedNGO: 'Red Cross Society',
            reportedProject: 'Disaster Relief',
            reporterName: 'Jane Smith',
            reporterEmail: 'jane.smith@example.com',
            reason: 'Fake organization',
            description: 'This NGO is not registered and seems to be collecting money illegally',
            status: 'investigating',
            date: '2024-01-18',
            priority: 'critical'
        },
        {
            id: 3,
            reportedNGO: 'World Vision',
            reportedProject: 'Clean Water Initiative',
            reporterName: 'Bob Johnson',
            reporterEmail: 'bob.johnson@example.com',
            reason: 'Poor communication',
            description: 'No updates received despite multiple donations',
            status: 'resolved',
            date: '2024-01-15',
            priority: 'medium'
        },
        {
            id: 4,
            reportedNGO: 'Doctors Without Borders',
            reportedProject: 'Medical Aid',
            reporterName: 'Alice Brown',
            reporterEmail: 'alice.brown@example.com',
            reason: 'Inappropriate content',
            description: 'The campaign images are graphic and inappropriate',
            status: 'dismissed',
            date: '2024-01-12',
            priority: 'low'
        },
        {
            id: 5,
            reportedNGO: 'UNICEF',
            reportedProject: 'Child Protection',
            reporterName: 'Charlie Wilson',
            reporterEmail: 'charlie.wilson@example.com',
            reason: 'Duplicate campaign',
            description: 'This campaign is identical to another one by the same NGO',
            status: 'pending',
            date: '2024-01-10',
            priority: 'medium'
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchReports = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('/api/admin/reports');
                // const data = await response.json();
                
                // Using dummy data for now
                setTimeout(() => {
                    setReports(dummyReports);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching reports:', error);
                toast.error('Failed to load reports');
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleReportAction = async (reportId, action) => {
        try {
            // Replace with actual API call
            // await fetch(`/api/admin/reports/${reportId}/${action}`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' }
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update local state
            setReports(prev => prev.map(report => 
                report.id === reportId ? { ...report, status: action === 'dismiss' ? 'dismissed' : 'investigating' } : report
            ));

            toast.success(`Report ${action === 'dismiss' ? 'dismissed' : 'marked for investigation'} successfully`);
        } catch (error) {
            console.error('Error updating report status:', error);
            toast.error('Failed to update report status');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            investigating: { color: 'bg-blue-100 text-blue-800', text: 'Investigating' },
            resolved: { color: 'bg-green-100 text-green-800', text: 'Resolved' },
            dismissed: { color: 'bg-gray-100 text-gray-800', text: 'Dismissed' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            low: { color: 'bg-gray-100 text-gray-800', text: 'Low' },
            medium: { color: 'bg-yellow-100 text-yellow-800', text: 'Medium' },
            high: { color: 'bg-orange-100 text-orange-800', text: 'High' },
            critical: { color: 'bg-red-100 text-red-800', text: 'Critical' }
        };
        
        const config = priorityConfig[priority] || priorityConfig.low;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.reportedNGO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.reason.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const paginatedReports = filteredReports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

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
                            <h2 className="text-xl font-semibold text-gray-900">Reports & Feedback</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Review user reports and take appropriate actions
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Total:</span>
                            <span className="text-sm font-medium text-gray-900">{filteredReports.length} Reports</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search reports by NGO, reporter, or reason..."
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
                                <option value="investigating">Investigating</option>
                                <option value="resolved">Resolved</option>
                                <option value="dismissed">Dismissed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reports Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Report Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reporter
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{report.reportedNGO}</div>
                                                <div className="text-sm text-gray-500">{report.reportedProject}</div>
                                                <div className="text-xs text-gray-400">{report.reason}</div>
                                                <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                                    {report.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{report.reporterName}</div>
                                                <div className="text-sm text-gray-500">{report.reporterEmail}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPriorityBadge(report.priority)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(report.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {report.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleReportAction(report.id, 'investigate')}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                                        >
                                                            Investigate
                                                        </button>
                                                        <button
                                                            onClick={() => handleReportAction(report.id, 'dismiss')}
                                                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                                                        >
                                                            Dismiss
                                                        </button>
                                                    </>
                                                )}
                                                {report.status === 'investigating' && (
                                                    <button
                                                        onClick={() => {/* Mark as resolved */}}
                                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                                    >
                                                        Resolve
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {/* View full report modal */}}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    View Details
                                                </button>
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
                                            {Math.min(currentPage * itemsPerPage, filteredReports.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{filteredReports.length}</span> results
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

export default AdminReports; 