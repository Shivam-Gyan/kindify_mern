import { useState } from 'react';
import Logo from '../../image/onlylogo.png'
import { Navigate } from 'react-router-dom'; // Assuming you have a routing setup
import NotificationBell from '../Notifications/NotificationBell';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = ({ }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className='py-3 h-16 border-b-[1px] border-slate-200 flex items-center justify-between '>
            {/* hidden when display is large */}
            <div className=" w-12 md:w-[55px] lg:hidden cursor-pointer px-2 py-5 flex items-center justify-between gap-4">
                <div
                    className='pl-4 mt-2 cursor-pointer lg:hidden'
                    onClick={handleMenuToggle}
                >
                    <i className="fi fi-br-bars-staggered text-xl md:text-2xl "></i>
                </div>
                <img src={Logo} alt="" className="" />
            </div>

            {/* search */}
            <div className='flex items-center justify-center bg-[#F1F2F7] gap-2 mx-5 lg:mx-10 max-sm:hidden rounded-md w-lg'>
                <input
                    type="text"
                    placeholder='Search'
                    className='p-2 px-3 bg-transparent outline-none text-sm text-gray-700 sm:bg-green w-48 md:w-[50vh] lg:min-w-[60vh] lg:max-w-[80vh]'
                />
                <i className='fi fi-rs-search text-gray-400 mr-2 mt-1'></i>
            </div>

            {/* userProfile and notifications */}
            <div className='flex items-center gap-4 mr-5 md:mr-12'>
                {/* Notification Bell */}
                <NotificationBell />
                
                {/* User Profile */}
                <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-full bg-[#F1F2F7] flex items-center justify-center'>
                        <i className="fi fi-sr-user text-gray-600"></i>
                    </div>
                    <div className='hidden md:block'>
                        <span className='text-sm font-medium text-gray-700'>
                            {user?.name || 'User'}
                        </span>
                        <div className='text-xs text-gray-500 capitalize'>
                            {user?.role || 'donor'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar;