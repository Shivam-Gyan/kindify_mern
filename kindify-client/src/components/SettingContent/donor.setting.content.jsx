import React, { useState } from 'react'
import { AnimationWrapper } from '../../common'
import donorDatabaseService from '../../databaseService/donor.database.service.js'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { em } from 'framer-motion/client';

const DonorSettingsContent = () => {

    const [previewImage, setPreviewImage] = useState("https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180");
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = React.useRef(null);
    const navigate = useNavigate();

    const [personalInformation, setPersonalInformation] = useState({
        fullName: "",
        email: "example@email.com",
        phoneNumber: "",
        address: "address"
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // when user click on the image, it will open file input and allow user to select image and also provide the preview of the image
    const handleImageUplaod = (e) => {
        // check if the file is selected
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setImageFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }


    // uplaod image function
    const handleUploadImageToServer = async () => {

        if (!imageFile) {
            toast.error("Please select an image to upload.");
            return;
        }

        await toast.promise(
            donorDatabaseService.uploadProfileImage(imageFile),
            {
                loading: 'Uploading image...',
                success: (response) => {
                    if (response.success) {
                        setPreviewImage(response.image_url); // Assuming the response contains the image URL
                        setImageFile(null); // Clear the file input after successful upload
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

    // handle personal information update( phone number ,fullname , location)
    const handlepersonalInformationUpdate = async (e) => {
        e.preventDefault();
        // Validate personal information before sending to the server
        if (!personalInformation.fullName || !personalInformation.phoneNumber || !personalInformation.address) {
            toast.error("Please fill in all required fields.");
            return;
        }
        let formatedPersonalInformation = {
            name: personalInformation.fullName,
            phone: personalInformation.phoneNumber,
            profilePicture: previewImage, // Assuming you want to send the preview image URL
            address: personalInformation.address
        };
        await toast.promise(
            donorDatabaseService.updateDonorPersonalInformation(formatedPersonalInformation),
            {
                loading: 'Saving...',
                success: (response) => {
                    if (response.success) {
                        setPersonalInformation({
                            fullName: response.data.name,
                            email: response.data.email,
                            phoneNumber: response.data.phone,
                            address: response.data.address
                        }); // Update the state with the new personal information

                        return "Saved successfully.";
                    } else {
                        throw new Error("Failed to save. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error updating personal information:", error);
                    return "An error occurred while updating personal information. Please try again.";
                }
            }
        );

    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Validate password fields before sending to the server
        if (!password.currentPassword || !password.newPassword) {
            toast.error("Please fill in all required fields.");
            return;
        }

        await toast.promise(
            donorDatabaseService.updateDonorPassword(password),
            {
                loading: 'Changing password...',
                success: (response) => {
                    if (response.success) {
                        setPassword({
                            currentPassword: "",
                            newPassword: ""
                        }); // Clear the password fields after successful update
                        return "Password changed ";
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

    const handleDeleteAccount = async () => {
        // Implement account deletion logic here
        // For example, you might want to call an API endpoint to delete the account
        await toast.promise(
            donorDatabaseService.deleteDonorAccount(),
            {
                loading: 'Deleting account...',
                success: (response) => {
                    if (response.success) {
                        // Handle successful account deletion, e.g., redirect to home page or show a success message
                        navigate('/'); // Redirect to home page after deletion
                        return "Account deleted successfully.";
                    } else {
                        setShowConfirmModal(false); // Close the confirmation modal
                        throw new Error("Failed to delete account. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error deleting account:", error);
                    setShowConfirmModal(false); // Close the confirmation modal
                    return "An error occurred while deleting the account. Please try again.";
                }
            }
        );
    }


    return (
        <AnimationWrapper>

            {/* main wrapper/conatiner */}
            <>
                {/* personal information container */}
                <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px]  border-gray-200 mt-4 mb-6 '>

                    {/* introductory */}
                    <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                        <h1 className='text-xl tracking-normal font-semibold text-gray-600'>Personal Information</h1>
                        <p className='text-[15px] max-lg:w-full w-80 font-medium tracking-normal text-gray-400'>Use a permanent address where you can recieve mail.</p>
                    </div>

                    <div className='flex flex-col gap-4 max-lg:items-center items-start max-md:w-full   w-2/3'>
                        {/* profile image update */}
                        <div className='  flex ml-7 mt-5 items-center gap-5'>
                            <span onClick={() => fileInputRef.current.click()} className='relative overflow-hidden group bg-white border-2 border-slate-400 rounded-full w-32 h-32'>
                                {/* image */}
                                <img src={previewImage} alt="Profile" className=' rounded-full object-contain' />

                                {/* overlay effect on the top of image  */}
                                <div className='absolute top-0 left-0 w-full h-full hidden group-hover:flex bg-black/30 rounded-full items-center justify-center transition'>
                                    <i className="fi fi-sr-add-image text-white text-3xl"></i>
                                </div>
                                <input type="file" ref={fileInputRef} accept='.jpg,.png,.jpeg' hidden onChange={handleImageUplaod} className=' z-10' />
                            </span>
                            <span className='flex flex-col items-start gap-2'>
                                <button onClick={handleUploadImageToServer} className='mt-2 w-fit flex items-center text-sm bg-indigo-100 text-slate-600 font-medium px-4 py-[5px] rounded-md hover:scale-[1.01]'>
                                    <i className="fi fi-sr-cloud-upload-alt text-lg mr-2 mt-1"></i>Uplaod avatar
                                </button>
                                <p className='text-xs text-gray-400 ml-2'><span className='text-red-500 text-[16px] '>*</span>JPG, JPEG or PNG.(1MB max) </p>
                            </span>
                        </div>
                        {/*  */}
                        <div className='w-full p-5 max-lg:px-3 px-10 '>
                            <form className='flex flex-col'>
                                <h1 className='text-lg text-slate-600 font-medium mt-3 mb-1'>Full name</h1>
                                <div className='flex p-2  gap-2 bg-[#F1F2F7] rounded-md'>
                                    <i className="fi fi-sr-user mt-2 text-lg text-gray-500"></i>
                                    <input type="text"
                                        value={personalInformation.fullName}
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, fullName: e.target.value })}
                                        placeholder='full name' className='w-full bg-transparent outline-none'
                                    />
                                </div>

                                <h1 className='text-lg text-slate-600 font-medium mt-7 mb-1'>Email address</h1>
                                <div className='flex p-2  gap-2 bg-[#F1F2F7] rounded-md'>
                                    <i className="fi fi-sr-envelope mt-2 text-lg text-gray-500"></i>
                                    <input type="email" value={personalInformation.email} disabled placeholder='email' className='w-full bg-transparent outline-none' />
                                </div>
                                {/* account email address can not be change */}
                                <p className='text-gray-400 text-sm'><span className='text-red-500 text-lg'>*</span>Account email address can not be change</p>

                                <h1 className='text-lg text-slate-600 font-medium mt-7 mb-1'>Phone number</h1>
                                <div className='flex p-2  gap-2 bg-[#F1F2F7] rounded-md'>
                                    <i className="fi fi-ss-phone-call mt-2 text-gray-500 text-lg"></i>
                                    <input type="text"
                                        value={personalInformation.phoneNumber}
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, phoneNumber: e.target.value })}
                                        placeholder='phone number' className='w-full bg-transparent outline-none' />
                                </div>
                                <h1 className='text-lg text-slate-600 font-medium mt-7 mb-1'>Address</h1>
                                <div className='flex p-2  gap-2 bg-[#F1F2F7] rounded-md'>
                                    <i className="fi fi-ss-marker text-lg mt-2 text-gray-500"></i>
                                    <input type="text"
                                        value={personalInformation.address}
                                        onChange={(e) => setPersonalInformation({ ...personalInformation, address: e.target.value })}
                                        placeholder='location' className='w-full bg-transparent outline-none' />
                                </div>
                                <p className='text-gray-400 text-sm mb-5'><span className='text-red-500 text-lg '>*</span>Use proper address if adding any</p>
                                <button onClick={(e) => handlepersonalInformationUpdate(e)} className='mt-2 w-32 py-1 bg-indigo-100 text-slate-600 font-medium rounded-md hover:scale-[1.01]'>Save</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* change/update password container */}
                <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px]  border-gray-200 mt-4 mb-6'>

                    {/* introductory */}
                    <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                        <h1 className='text-xl tracking-normal font-semibold text-gray-600'>Change password</h1>
                        <p className='text-[15px] max-lg:w-full w-80  font-medium tracking-normal text-gray-400'>Update your password associated with your account.</p>

                    </div>

                    {/* change password form */}
                    <div className='flex flex-col gap-4 max-lg:items-center items-start max-md:w-full  w-2/3'>
                        <div className='w-full p-5 max-lg:px-3 px-10'>
                            <form className='flex flex-col'>

                                {/* current password */}
                                <h1 className='text-lg text-slate-600 font-medium mt-7 mb-1'>Current Password</h1>
                                <div className='flex p-2  gap-2 bg-[#F1F2F7] rounded-md'>
                                    <i className="fi fi-ss-key mt-2 text-lg text-gray-500"></i>
                                    <input type="text"
                                        value={password.currentPassword}
                                        onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                                        placeholder='password' className='w-full bg-transparent outline-none' />
                                </div>
                                <h1 className='text-lg text-slate-600 font-medium mt-7 mb-1'>Latest password</h1>
                                <div className='flex p-2 gap-2 bg-[#F1F2F7] rounded-md '>
                                    <i className="fi fi-ss-lock text-lg mt-2 text-gray-500"></i>
                                    <input type="text"
                                        value={password.newPassword}
                                        onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                        placeholder='password' className='w-full bg-transparent outline-none ' />
                                </div>
                                <p className='text-gray-400 text-sm mb-5'><span className='text-red-500 text-lg '>*</span>Current and Latest password should be distinct</p>
                                <button onClick={handlePasswordChange} className='mt-2 w-32 py-1 bg-indigo-100 text-slate-600 hover:scale-[1.01] font-medium rounded-md '>Save</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* confirm delete account modal  */}
                {showConfirmModal && (
                    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black/50">
                        <div className="relative p-4 w-full max-w-md">
                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmModal(false)}
                                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>

                                <svg
                                    className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="mb-4 text-gray-500 dark:text-gray-300">
                                    Are you sure you want to delete this account?
                                </p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        No, cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    >
                                        Yes, I'm sure
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* account delete container */}
                <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px]  border-gray-200 mt-4 mb-6'>

                    {/* introductory */}
                    <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                        <h1 className='text-xl tracking-normal font-semibold text-gray-600'>Delete account</h1>
                        <p className='text-[15px] max-lg:w-full w-80 font-medium tracking-normal text-gray-400'>No longer want to use our services? You can delete your account here. This action is not reversible. All information related to this account will deleted permanently.</p>
                    </div>

                    {/* delete button */}
                    <div className='flex flex-col gap-4 max-lg:items-center max-lg:mt-0 mt-10 items-start max-md:w-full  w-2/3 max-lg:px-3 px-10 '>
                        <button onClick={() => setShowConfirmModal(true)} className='mt-2 w-fit py-1 px-10 bg-red-500 text-white font-medium rounded-md hover:scale-[1.01] '><i className="fi fi-ss-trash text-lg mr-2 text-white"></i> Yes, delete my account </button>

                    </div>

                </div>
            </>
        </AnimationWrapper>
    )
}

export default DonorSettingsContent