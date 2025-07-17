import React, { useState } from "react";
import { AnimationWrapper } from "../../common";

const ImpactReportsNGO = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        campaign: '',
        description: '',
        beneficiaries: '',
        impactMetrics: '',
        images: []
    });

    const campaigns = [
        { id: 1, name: "Education for All" },
        { id: 2, name: "Clean Water Initiative" },
        { id: 3, name: "Medical Camp" },
        { id: 4, name: "Tree Plantation Drive" }
    ];

    const impactReports = [
        {
            id: 1,
            title: "Education for Rural Children - Q1 2024",
            campaign: "Education for Rural Children",
            date: "2024-01-15",
            status: "published",
            beneficiaries: "150 children",
            impact: "Improved literacy rates by 40%",
            views: 1247
        },
        {
            id: 2,
            title: "Healthcare Camp Impact Report",
            campaign: "Healthcare for All",
            date: "2024-01-10",
            status: "published",
            beneficiaries: "300 patients",
            impact: "Provided free medical checkups",
            views: 892
        },
        {
            id: 3,
            title: "Tree Plantation Drive Results",
            campaign: "Green Earth Initiative",
            date: "2024-01-05",
            status: "draft",
            beneficiaries: "500 trees planted",
            impact: "Increased green cover in urban areas",
            views: 0
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Impact report submitted:', formData);
        setShowCreateModal(false);
        setFormData({
            title: '',
            campaign: '',
            description: '',
            beneficiaries: '',
            impactMetrics: '',
            images: []
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Published</span>;
            case 'draft':
                return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Draft</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
        }
    };

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Impact Reports</h2>
                        <p className="text-gray-600">Share your impact stories with donors</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                    >
                        <span>+</span>
                        Create Impact Report
                    </button>
                </div>

                {/* Impact Reports Table */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Report Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Campaign
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Views
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {impactReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{report.title}</div>
                                                <div className="text-sm text-gray-500">{report.beneficiaries}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {report.campaign}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(report.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {report.views.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">View</button>
                                                <button className="text-green-600 hover:text-green-900">Edit</button>
                                                {report.status === 'draft' && (
                                                    <button className="text-purple-600 hover:text-purple-900">Publish</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create Impact Report Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Create Impact Report</h3>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Report Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter report title"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Campaign *
                                    </label>
                                    <select
                                        name="campaign"
                                        value={formData.campaign}
                                        onChange={(e) => setFormData({...formData, campaign: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a campaign</option>
                                        {campaigns.map(campaign => (
                                            <option key={campaign.id} value={campaign.name}>
                                                {campaign.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Describe the impact achieved..."
                                        required
                                    ></textarea>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Beneficiaries Reached *
                                        </label>
                                        <input
                                            type="text"
                                            name="beneficiaries"
                                            value={formData.beneficiaries}
                                            onChange={(e) => setFormData({...formData, beneficiaries: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., 150 children"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Key Impact Metrics
                                        </label>
                                        <input
                                            type="text"
                                            name="impactMetrics"
                                            value={formData.impactMetrics}
                                            onChange={(e) => setFormData({...formData, impactMetrics: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., 40% improvement in literacy"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Impact Images
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            id="impactImages"
                                        />
                                        <label htmlFor="impactImages" className="cursor-pointer">
                                            <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="text-sm text-gray-600">Click to upload impact images</p>
                                            <p className="text-xs text-gray-500">JPG, PNG up to 5MB each</p>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Create Report
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

export default ImpactReportsNGO; 