import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimationWrapper } from '../../common';

const LogoutComponent = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setLogoutModal] = useState(false);

    const handleLogout = () => {
        // Clear auth data
        localStorage.clear();
        // Redirect to login or homepage
        navigate('/login');
    };



    return (
        <AnimationWrapper>
            <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px]  border-gray-200 mt-4 mb-6'>

                {/* introductory */}
                <div className='max-lg:w-full max-lg:text-center w-1/3 mt-10'>
                    <h1 className='text-xl tracking-normal font-semibold text-gray-600'>Logout from account</h1>
                    <p className='text-[15px] max-lg:w-full w-80 font-medium tracking-normal text-gray-400'>If you're sure, you can safely log out of your account now. You’ll be signed out and redirected to the login page.</p>
                </div>

                {/* delete button */}
                <div className='flex flex-col gap-4 max-lg:items-center max-lg:mt-0 mt-10 items-start max-md:w-full  w-2/3 max-lg:px-3 px-10 '>
                    <button onClick={() => setLogoutModal(true)} className='mt-2 w-fit py-1 px-10 bg-red-500 text-white font-medium rounded-md hover:shadow-md'>Yes, Logout my account </button>

                </div>

            </div>
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
                    <div className="bg-white px-8 py-10 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-200 relative animate-fade-in">

                        {/* Close Button */}
                        {/* <button
                            onClick={handleCancel}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
                            aria-label="Close"
                        >
                            &times;
                        </button> */}

                        {/* Header */}
                        <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center justify-center gap-2">
                            <span className="text-red-500 text-lg">•</span> Log Out?
                        </h2>

                        {/* Message */}
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to log out? You’ll be signed out of your account.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setLogoutModal(false)}
                                className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AnimationWrapper>
    );
};

export default LogoutComponent;
