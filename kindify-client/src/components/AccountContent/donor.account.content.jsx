import React from 'react'
import { AnimationWrapper } from '../../common';
import { Link } from 'react-router-dom';

const DonorAccountContent = () => {

    const image = "https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180";

    const accountInfo = [
        {
            label: "Email",
            value: "john.doe@email.com"
        },
        {
            label: "Role",
            value: "Donor"
        },
        {
            label: "Phone",
            value: "+91 1234567890"
        },
        {
            label: "Address",
            value: "123, Street Name, City, State, Country"
        },
        {
            label: "Joined",
            value: "01 Jan 2023"
        },
        {
            label: "Status",
            value: "Active"
        },
    ];
    return (
        <AnimationWrapper>

            <div className='flex max-lg:flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] py-10 border-gray-200 mt-4 mb-6 '>

                {/* left side profile view */}
                <div className='max-lg:w-full flex flex-col items-center justify-start w-1/2 '>
                    <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex items-center justify-center'>
                        <img src={image} alt="profile-pic" />
                    </div>
                    <h1 className='text-2xl font-medium mt-4 text-slate-600'>John Doe</h1>
                    <p className='text-gray-500 text-sm'>john.doe@email.com</p>

                    {/* container show no.follwed ngos and total donated amount */}
                    <div className='flex flex-col items-center justify-center mt-2 w-full'>
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 text-sm'>Followed NGOs</p>
                                <h1 className='text-xl font-medium text-slate-600'>10</h1>
                            </div>
                            <div className='h-10 w-[2px] bg-gray-300'></div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 text-sm'>Total Donated</p>
                                <h1 className='text-xl font-medium text-slate-600'><span className='font-medium mr-1'>INR</span>5000000.00</h1>
                            </div>
                        </div>
                    </div>

                    {/* import tags */}
                    <div className='flex items-center justify-start gap-2 mt-7'>
                        {/* setting link */}
                        <Link to={'/donor-dashboard/setting'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] hover:rotate-45 duration-300'><i className="fi fi-sr-settings mt-2  "></i></Link>

                        {/* share link */}
                        <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-share mt-2 "></i></span>

                        {/* notification link */}
                        <Link to={'/donor-dashboard/notification'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] hover:rotate-12 duration-300'><i className="fi fi-sr-bell-notification-social-media mt-2  "></i></Link>

                        {/* donations link */}
                        <Link to={'/donor-dashboard/donations'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] hover:rotate-12 duration-300'><i className="fi fi-sr-piggy-bank mt-2  "></i></Link>

                        {/* donations link */}
                        <Link to={'/donor-dashboard/followed-ngos'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7]'><i className="fi fi-sr-following mt-2"></i></Link>
                    </div>
                </div>

                {/* right side profile details */}
                <div className='flex flex-col gap-4 max-lg:items-center lg:mt-0 mt-10 items-start max-md:w-full w-1/2 '>
                    <h1 className='text-2xl self-start ml-3 font-medium text-slate-600'>Account Details</h1>
                    <div className='flex flex-col max-lg:items-center items-start gap-2 w-full'>
                        {
                            accountInfo.map((item, index) => (
                                <div key={index} className='w-full lg:w-3/4 flex items-center border-2 border-gray-200  rounded-md justify-between'>
                                    <span className='bg-white py-2 w-28 px-4'>{item.label}</span>
                                    <p className='bg-[#F1F2F7] w-full px-4 py-2 truncate '>{item.value}</p>
                                </div>
                            ))}

                    </div>
                </div>
            </div>

        </AnimationWrapper>
    )
}

export default DonorAccountContent;