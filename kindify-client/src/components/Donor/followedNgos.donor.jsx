import React from 'react'
import { AnimationWrapper } from '../../common'

const DonorFollowedNGOs = () => {


  const [tag, setTag] = React.useState('Followed NGOs');

  const handleTagBasedSearch = (e) => {
    const tag = e.target.innerText;
    setTag(tag);
  }

  return (

    <AnimationWrapper>

      <main className='flex flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] py-8 border-gray-200 mt-4 mb-6'>

        <div className='flex justify-between items-center w-full'>

          {/*tag based filterig of all NGOs */}
          <div onClick={handleTagBasedSearch} className='flex flex-wrap items-center gap-4 w-full max-lg:px-3 px-5'>
            <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 cursor-pointer font-semibold text-sm hover:bg-indigo-100 ${tag == 'Followed NGOs' ? "bg-indigo-100" : ""}`}>Followed NGOs</span>
            <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 cursor-pointer font-semibold text-sm hover:bg-indigo-100 ${tag == 'Favourite NGOs'? "bg-indigo-100" : ""}`}>Favourite NGOs</span>
            <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 cursor-pointer font-semibold text-sm hover:bg-indigo-100 ${tag == 'Popular NGOs'? "bg-indigo-100" : ""}`}>Popular NGOs</span>
          </div>




        </div>
       
       <div className='w-full flex items-start mt-7 justify-center gap-4'>

         <div className='flex max-sm:flex-col justify-between items-center w-full xl:w-2/3 px-6 py-3 gap-4  mx-2 shadow-md border border-gray-200'>

          {/* ngo logo and name  */}
          <div className='flex items-center gap-4'>
            <div className='h-[58px] flex-none w-[58px] overflow-hidden border-4 border-gray-200 rounded-full gap-4'>
              <img src='https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1' alt='NGO Logo' className='w-full h-full object-cover' />
            </div>

            <div className='flex flex-col gap-1'>
              <h2 className='text-lg font-semibold'>Shanti niketan Welfare</h2>
              <div className="flex items-center gap-1 mt-1 flex-wrap text-gray-600">
                <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Education</p>
                <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Food</p>
                <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Health</p>
                <p className="bg-indigo-200 px-4 py-1 rounded-full text-sm w-fit">Public</p>
              </div>
            </div>
          </div>

          {/* card content */}
          <div className='flex flex-col items-center gap-2'>
            <div className='flex items-center gap-2'>
              <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-share mt-2 "></i></span>
              <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-ss-paper-plane-launch mt-2"></i></span>
              <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-piggy-bank mt-2"></i></span>

            </div>

            <span className='text-sm text-gray-600'>followed at : jan 2025</span>

          </div>
        </div>

       </div>
      </main>
    </AnimationWrapper>
  )
}

export default DonorFollowedNGOs