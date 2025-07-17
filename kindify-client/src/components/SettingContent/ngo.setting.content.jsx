import React, { useState } from 'react'
import { AnimationWrapper } from '../../common'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NGOSettingsContent = () => {
    const [previewImage, setPreviewImage] = useState("https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180");
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = React.useRef(null);
    const navigate = useNavigate();

    const [organizationInformation, setOrganizationInformation] = useState({
        organizationName: "Sample NGO",
        email: "ngo@example.com",
        phoneNumber: "+1234567890",
        address: "123 NGO Street, City, Country",
        website: "https://www.samplengo.org",
        description: "A sample NGO working for social causes",
        registrationNumber: "NGO123456",
        taxId: "TAX789012"
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Handle image upload and preview
    const handleImageUpload = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setImageFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    // Upload image to server
    const handleUploadImageToServer = async () => {
        if (!imageFile) {
            toast.error("Please select an image to upload.");
            return;
        }

        await toast.promise(
            new Promise((resolve) => {
                // Simulate API call
                setTimeout(() => {
                    resolve({ success: true, image_url: previewImage });
                }, 2000);
            }),
            {
                loading: 'Uploading image...',
                success: (response) => {
                    if (response.success) {
                        setImageFile(null);
                        return "Image uploaded successfully.";
                    } else {
                        throw new Error("Image upload failed. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error uploading image:", error);
                    return "An error occurred while uploading the image. Please try again.";
                }
            }
        );
    }

    // Handle organization information update
    const handleOrganizationInformationUpdate = async (e) => {
        e.preventDefault();
        
        if (!organizationInformation.organizationName || !organizationInformation.email || !organizationInformation.phoneNumber) {
            toast.error("Please fill in all required fields.");
            return;
        }

        let formattedOrganizationInformation = {
            name: organizationInformation.organizationName,
            email: organizationInformation.email,
            phone: organizationInformation.phoneNumber,
            profilePicture: previewImage,
            address: organizationInformation.address,
            website: organizationInformation.website,
            description: organizationInformation.description,
            registrationNumber: organizationInformation.registrationNumber,
            taxId: organizationInformation.taxId
        };

        await toast.promise(
            new Promise((resolve) => {
                // Simulate API call
                setTimeout(() => {
                    resolve({ success: true, data: formattedOrganizationInformation });
                }, 1500);
            }),
            {
                loading: 'Saving...',
                success: (response) => {
                    if (response.success) {
                        return "Organization information updated successfully.";
                    } else {
                        throw new Error("Failed to save. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error updating organization information:", error);
                    return "An error occurred while updating organization information. Please try again.";
                }
            }
        );
    }

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (!password.currentPassword || !password.newPassword || !password.confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }

        if (password.newPassword !== password.confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (password.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        await toast.promise(
            new Promise((resolve) => {
                // Simulate API call
                setTimeout(() => {
                    resolve({ success: true });
                }, 1500);
            }),
            {
                loading: 'Changing password...',
                success: (response) => {
                    if (response.success) {
                        setPassword({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                        });
                        return "Password changed successfully.";
                    } else {
                        throw new Error("Failed to change password. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error changing password:", error);
                    return error.response?.data?.message || "An error occurred while changing password. Please try again.";
                }
            }
        );
    }

    // Handle account deletion
    const handleDeleteAccount = async () => {
        await toast.promise(
            new Promise((resolve) => {
                // Simulate API call
                setTimeout(() => {
                    resolve({ success: true });
                }, 2000);
            }),
            {
                loading: 'Deleting account...',
                success: (response) => {
                    if (response.success) {
                        navigate('/');
                        return "Account deleted successfully.";
                    } else {
                        setShowConfirmModal(false);
                        throw new Error("Failed to delete account. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error deleting account:", error);
                    setShowConfirmModal(false);
                    return "An error occurred while deleting the account. Please try again.";
                }
            }
        );
    }

    return (
        <AnimationWrapper>
            {/* Main wrapper/container */}
            <>
                {/* Organization Information Container */}
                <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] border-gray-200 mt-4 mb-6'>
                    {/* Introductory */}
                    <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                        <h1 className='text-xl tracking-normal font-semibold text-gray-600'>Organization Information</h1>
                        <p className='text-[15px] max-lg:w-full w-80 font-medium tracking-normal text-gray-400'>
                            Update your organization details and contact information.
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 max-lg:items-center items-start max-md:w-full w-2/3'>
                        {/* Profile Image Update */}
                        <div className='flex ml-7 mt-5 items-center gap-5'>
                            <span onClick={() => fileInputRef.current.click()} className='relative overflow-hidden group bg-white border-2 border-slate-400 rounded-full w-32 h-32'>
                                <img src={previewImage} alt="Organization Logo" className='rounded-full object-contain' />
                                <div className='absolute top-0 left-0 w-full h-full hidden group-hover:flex bg-black/30 rounded-full items-center justify-center transition'>
                                    <i className="fi fi-sr-add-image text-white text-3xl"></i>
                                </div>
                                <input type="file" ref={fileInputRef} accept='.jpg,.png,.jpeg' hidden onChange={handleImageUpload} className='z-10' />
                            </span>
                            <span className='flex flex-col items-start gap-2'>
                                <button onClick={handleUploadImageToServer} className='mt-2 w-fit flex items-center text-sm bg-indigo-100 text-slate-600 font-medium px-4 py-[5px] rounded-md hover:scale-[1.01]'>
                                    <i className="fi fi-sr-cloud-upload-alt text-lg mr-2 mt-1"></i>Upload Logo
                                </button>
                                <p className='text-xs text-gray-400 ml-2'>
                                    <span className="text-red-500 text-[16px]">*</span>JPG, JPEG or PNG.(1MB max)
                                </p>
                            </span>
                        </div>

                        {/* Organization Information Form */}
                        <form onSubmit={handleOrganizationInformationUpdate} className='w-full max-lg:w-full space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Organization Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={organizationInformation.organizationName}
                                        onChange={(e) => setOrganizationInformation(prev => ({ ...prev, organizationName: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter organization name"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={organizationInformation.email}
                                        onChange={(e) => setOrganizationInformation(prev => ({ ...prev, email: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={organizationInformation.phoneNumber}
                                        onChange={(e) => setOrganizationInformation(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={organizationInformation.website}
                                        onChange={(e) => setOrganizationInformation(prev => ({ ...prev, website: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="https://www.example.org"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        value={organizationInformation.registrationNumber}
                                        onChange={(e) => setOrganizationInformation(prev => ({ ...prev, registrationNumber: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter registration number"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Tax ID
                                    </label>
                                    <input
                                        type="text"
                                        value={organizationInformation.taxId}
                                        onChange={(e) => setOrganizationInformation(prev => ({ ...prev, taxId: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter tax ID"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={organizationInformation.address}
                                    onChange={(e) => setOrganizationInformation(prev => ({ ...prev, address: e.target.value }))}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                    placeholder="Enter organization address"
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Description
                                </label>
                                <textarea
                                    value={organizationInformation.description}
                                    onChange={(e) => setOrganizationInformation(prev => ({ ...prev, description: e.target.value }))}
                                    rows="4"
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                    placeholder="Describe your organization's mission and activities"
                                />
                            </div>

                            <button
                                type="submit"
                                className='w-fit bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>

                {/* Password Change Section */}
                <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] border-gray-200 mt-8 mb-6'>
                    <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                        <h1 className='text-xl tracking-normal font-semibold text-gray-600'>Change Password</h1>
                        <p className='text-[15px] max-lg:w-full w-80 font-medium tracking-normal text-gray-400'>
                            Update your password to keep your account secure.
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 max-lg:items-center items-start max-md:w-full w-2/3'>
                        <form onSubmit={handlePasswordChange} className='w-full max-lg:w-full space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Current Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password.currentPassword}
                                        onChange={(e) => setPassword(prev => ({ ...prev, currentPassword: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter current password"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        New Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password.newPassword}
                                        onChange={(e) => setPassword(prev => ({ ...prev, newPassword: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Confirm New Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password.confirmPassword}
                                        onChange={(e) => setPassword(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 text-sm'
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className='w-fit bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>

                {/* Account Deletion Section */}
                <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] border-gray-200 mt-8 mb-6'>
                    <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                        <h1 className='text-xl tracking-normal font-semibold text-red-600'>Delete Account</h1>
                        <p className='text-[15px] max-lg:w-full w-80 font-medium tracking-normal text-gray-400'>
                            Permanently delete your organization account and all associated data.
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 max-lg:items-center items-start max-md:w-full w-2/3'>
                        <div className='w-full max-lg:w-full'>
                            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                                <div className='flex'>
                                    <i className="fi fi-sr-exclamation-triangle text-red-400 text-xl mr-3 mt-0.5"></i>
                                    <div>
                                        <h3 className='text-red-800 font-medium'>Warning</h3>
                                        <p className='text-red-700 text-sm mt-1'>
                                            This action cannot be undone. All your campaigns, donations, and data will be permanently deleted.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowConfirmModal(true)}
                                className='w-fit bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium'
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex items-center mb-4">
                                <i className="fi fi-sr-exclamation-triangle text-red-500 text-2xl mr-3"></i>
                                <h3 className="text-lg font-semibold text-gray-900">Confirm Account Deletion</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </AnimationWrapper>
    );
};

export default NGOSettingsContent; 