import React, { useState } from "react";
import { AnimationWrapper } from "../../common";

const WithdrawalsNGO = () => {
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [selectedBank, setSelectedBank] = useState('');

    const bankAccounts = [
        {
            id: 1,
            bankName: "State Bank of India",
            accountNumber: "****1234",
            accountHolder: "Shanti Niketan Trust",
            ifscCode: "SBIN0001234"
        },
        {
            id: 2,
            bankName: "HDFC Bank",
            accountNumber: "****5678",
            accountHolder: "Shanti Niketan Trust",
            ifscCode: "HDFC0005678"
        }
    ];

    const withdrawals = [
        {
            id: 1,
            amount: 50000,
            bankAccount: "State Bank of India - ****1234",
            status: "completed",
            date: "2024-01-15",
            reference: "WD-2024-001",
            processingTime: "2-3 business days"
        },
        {
            id: 2,
            amount: 75000,
            bankAccount: "HDFC Bank - ****5678",
            status: "pending",
            date: "2024-01-20",
            reference: "WD-2024-002",
            processingTime: "2-3 business days"
        },
        {
            id: 3,
            amount: 30000,
            bankAccount: "State Bank of India - ****1234",
            status: "completed",
            date: "2024-01-10",
            reference: "WD-2024-003",
            processingTime: "2-3 business days"
        },
        {
            id: 4,
            amount: 25000,
            bankAccount: "HDFC Bank - ****5678",
            status: "failed",
            date: "2024-01-05",
            reference: "WD-2024-004",
            processingTime: "2-3 business days",
            failureReason: "Insufficient funds in account"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalBalance = 125000;
    const availableBalance = 45670;
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0);
    const totalWithdrawn = withdrawals.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0);

    return (
        <AnimationWrapper>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Withdrawals & Fund Management</h2>
                        <p className="text-gray-600">Manage your funds and withdrawal requests</p>
                    </div>
                    <button
                        onClick={() => setShowWithdrawalModal(true)}
                        disabled={availableBalance <= 0}
                        className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                            availableBalance > 0
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <span>💰</span>
                        Request Withdrawal
                    </button>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Total Balance</p>
                                <p className="text-2xl font-bold">₹{totalBalance.toLocaleString()}</p>
                                <p className="text-green-100 text-xs">All time donations</p>
                            </div>
                            <div className="text-3xl">💰</div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Available for Withdrawal</p>
                                <p className="text-2xl font-bold">₹{availableBalance.toLocaleString()}</p>
                                <p className="text-blue-100 text-xs">Ready to withdraw</p>
                            </div>
                            <div className="text-3xl">🏦</div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-100 text-sm">Pending Withdrawals</p>
                                <p className="text-2xl font-bold">₹{pendingWithdrawals.toLocaleString()}</p>
                                <p className="text-yellow-100 text-xs">Processing</p>
                            </div>
                            <div className="text-3xl">⏳</div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Total Withdrawn</p>
                                <p className="text-2xl font-bold">₹{totalWithdrawn.toLocaleString()}</p>
                                <p className="text-purple-100 text-xs">Successfully processed</p>
                            </div>
                            <div className="text-3xl">✅</div>
                        </div>
                    </div>
                </div>

                {/* Bank Accounts */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Bank Accounts</h3>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            + Add Bank Account
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bankAccounts.map((account) => (
                            <div key={account.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-gray-800">{account.bankName}</h4>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Primary</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">Account: {account.accountNumber}</p>
                                <p className="text-sm text-gray-600 mb-1">IFSC: {account.ifscCode}</p>
                                <p className="text-sm text-gray-600">Holder: {account.accountHolder}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Withdrawal History */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Withdrawal History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reference
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bank Account
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {withdrawal.reference}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ₹{withdrawal.amount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {withdrawal.bankAccount}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(withdrawal.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(withdrawal.status)}`}>
                                                {withdrawal.status}
                                            </span>
                                            {withdrawal.status === 'failed' && (
                                                <p className="text-xs text-red-600 mt-1">{withdrawal.failureReason}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    View Details
                                                </button>
                                                {withdrawal.status === 'failed' && (
                                                    <button className="text-green-600 hover:text-green-900">
                                                        Retry
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Withdrawal Request Modal */}
                {showWithdrawalModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Request Withdrawal</h3>
                                <button
                                    onClick={() => setShowWithdrawalModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Available Balance
                                    </label>
                                    <div className="text-2xl font-bold text-green-600">
                                        ₹{availableBalance.toLocaleString()}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Withdrawal Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={withdrawalAmount}
                                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                                        max={availableBalance}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter amount"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maximum: ₹{availableBalance.toLocaleString()}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bank Account
                                    </label>
                                    <select
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Bank Account</option>
                                        {bankAccounts.map(account => (
                                            <option key={account.id} value={account.id}>
                                                {account.bankName} - {account.accountNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="bg-blue-50 p-3 rounded-md">
                                    <p className="text-sm text-blue-800">
                                        <strong>Processing Time:</strong> 2-3 business days
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Withdrawal requests are processed on business days only
                                    </p>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowWithdrawalModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!withdrawalAmount || !selectedBank || withdrawalAmount > availableBalance}
                                        className={`px-4 py-2 rounded-md ${
                                            withdrawalAmount && selectedBank && withdrawalAmount <= availableBalance
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        Request Withdrawal
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

export default WithdrawalsNGO; 