import { useState } from 'react'
import { AnimationWrapper } from '../../common'

const DonorDonations = () => {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [timeRange, setTimeRange] = useState('all')
  const [timeRangeTag, setTimeRangeTag] = useState('All donations')

  const categories = ['Education', 'Health', 'Welfare', 'Environment']

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleFilterApply = () => {
    console.log({ selectedCategories, timeRange })
    setShowFilterModal(false)
  }

  const handleTagBasedSearch = (e) => {
    const tag = e.target.innerText;
    console.log("Tag clicked:", tag);
    setTimeRangeTag(tag);
    if (tag === 'All donations') {
      setTimeRange('all');
    } else if (tag === 'Last week') {
      setTimeRange('Last week');
    } else if (tag === 'lastweek') {
      setTimeRange('lastmonth');
    }
  }

  return (
    <AnimationWrapper>
      <main className='flex flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] py-8 border-gray-200 mt-4 mb-6'>

        <div className='flex justify-between items-center w-full'>

          {/* get all donation by time line */}
          <div onClick={handleTagBasedSearch} className='flex flex-wrap items-center gap-4 w-full max-lg:px-3 px-5'>
            <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 font-semibold text-sm  cursor-pointer hover:bg-indigo-100 ${timeRangeTag == 'All donations' ? "bg-indigo-100" : ""}`}>All donations</span>
            <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 font-semibold text-sm cursor-pointer hover:bg-indigo-100 ${timeRangeTag == 'Last week' ? "bg-indigo-100" : ""}`}>Last week</span>
            <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 font-semibold text-sm cursor-pointer hover:bg-indigo-100 ${timeRangeTag == 'Last month' ? "bg-indigo-100" : ""}`}>Last month</span>
          </div>

          {/* filter functionality */}
          <div className='relative'>
            <button
              onClick={() => setShowFilterModal(prev => !prev)}

              className={`border-2 rounded-full border-indigo-200 px-4 py-1 font-semibold text-sm hover:bg-indigo-100 mr-3 sm:mr-10 flex items-center ${showFilterModal ? "bg-indigo-100" : ""}`}
            >
              Filters
              <i className={`fi fi-sr-angle-small-${showFilterModal ? "up" : "down"} mt-2 ml-4`}></i>
            </button>

            {/* Modal */}
            {showFilterModal && (
              <div className='absolute right-2 mt-4 bg-white border border-gray-300 shadow-lg w-[90vw] max-w-sm z-50 p-5'>

                <div className='h-5 w-5 rotate-45 bg-white absolute border-gray-300 border-t border-l -top-3 right-16'></div>

                <h2 className='text-lg font-semibold mb-4'>Filter Donations</h2>

                {/* Categories */}
                <div className='mb-4'>
                  <label className='block font-medium mb-1'>Categories</label>
                  <div className='flex flex-wrap w-48  gap-2'>
                    {categories.map((cat) => (
                      <label key={cat} className='flex items-center gap-1'>
                        <input
                          type='checkbox'
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Range */}
                <div className='mb-4'>
                  <label className='block font-medium mb-1'>Time Range</label>
                  <div className='flex flex-col gap-2'>
                    {['lastmonth', 'lastweek', 'all'].map(range => (
                      <label key={range} className='capitalize flex items-center gap-1'>
                        <input
                          type='radio'
                          name='time'
                          value={range}
                          checked={timeRange === range}
                          onChange={(e) => setTimeRange(e.target.value)}
                        />
                        {range === 'all' ? 'All Time' : range === 'lastweek' ? 'Last Week' : 'Last Month'}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className='flex justify-end gap-3 mt-4'>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className='text-gray-600 hover:underline'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFilterApply}
                    className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='w-full flex justify-center items-center mt-7 flex-col gap-4'>

        {/* donation card  */}

          <div className='flex max-sm:flex-col justify-between items-center w-full xl:w-2/3 px-6 py-3 gap-4  mx-2 shadow-md border border-gray-200'>

            {/* ngo logo */}
            <div className='flex items-center gap-4'>
              <div className='h-[58px] flex-none w-[58px] overflow-hidden border-4 border-gray-200 rounded-full gap-4'>
                <img src='https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1' alt='NGO Logo' className='w-full h-full object-cover' />
              </div>

              <div className='flex flex-col gap-1'>
                <h2 className='text-lg font-semibold'>Shanti niketan Welfare</h2>
                <div className="flex items-center gap-1 mt-1 flex-wrap text-gray-600">
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Education</p>
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Food</p>
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Health</p>
                </div>
              </div>
            </div>

            {/* donation amount */}
            <div className='flex flex-col items-center gap-2'>
              <span className='text-lg font-semibold'>₹ 5000</span>
              <div className='flex items-center gap-2'>
                <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-share mt-2 "></i></span>
                <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-document mt-2"></i></span>

              </div>

              <span className='text-sm text-gray-600'>on 20th Oct, 2023</span>

            </div>
          </div>

          <div className='flex max-sm:flex-col justify-between items-center w-full xl:w-2/3 px-6 py-3 gap-4  mx-2 shadow-md border border-gray-200'>

            {/* ngo logo */}
            <div className='flex items-center gap-4'>
              <div className='h-[58px] flex-none w-[58px] overflow-hidden border-4 border-gray-200 rounded-full gap-4'>
                <img src='https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1' alt='NGO Logo' className='w-full h-full object-cover' />
              </div>

              <div className='flex flex-col gap-1'>
                <h2 className='text-lg font-semibold'>Shanti niketan Welfare</h2>
                <div className="flex items-center gap-1 mt-1 flex-wrap text-gray-600">
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Education</p>
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Food</p>
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Health</p>
                </div>
              </div>
            </div>

            {/* donation amount */}
            <div className='flex flex-col items-center gap-2'>
              <span className='text-lg font-semibold'>₹ 5000</span>
              <div className='flex items-center gap-2'>
                <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-share mt-2 "></i></span>
                <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-document mt-2"></i></span>

              </div>

              <span className='text-sm text-gray-600'>on 20th Oct, 2023</span>

            </div>
          </div>

          <div className='flex max-sm:flex-col justify-between items-center w-full xl:w-2/3 px-6 py-3 gap-4  mx-2 shadow-md border border-gray-200'>

            {/* ngo logo */}
            <div className='flex items-center gap-4'>
              <div className='h-[58px] flex-none w-[58px] overflow-hidden border-4 border-gray-200 rounded-full gap-4'>
                <img src='https://www.designmantic.com/logo-images/166751.png?company=Company%20Name&keyword=ngo&slogan=&verify=1' alt='NGO Logo' className='w-full h-full object-cover' />
              </div>

              <div className='flex flex-col gap-1'>
                <h2 className='text-lg font-semibold'>Shanti niketan Welfare</h2>
                <div className="flex items-center gap-1 mt-1 flex-wrap text-gray-600">
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Education</p>
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Food</p>
                  <p className="bg-indigo-200 px-4 py-1 rounded-full font-semibold text-xs w-fit">Health</p>
                </div>
              </div>
            </div>

            {/* donation amount */}
            <div className='flex flex-col items-center gap-2'>
              <span className='text-lg font-semibold'>₹ 5000</span>
              <div className='flex items-center gap-2'>
                <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-share mt-2 "></i></span>
                <span to={'/donor-dashboard/account'} className='w-9 h-9 rounded-full flex items-center justify-center hover:text-indigo-400 bg-[#F1F2F7] '><i className="fi fi-sr-document mt-2"></i></span>

              </div>

              <span className='text-sm text-gray-600'>on 20th Oct, 2023</span>

            </div>
          </div>

        </div>
      </main>
    </AnimationWrapper>
  )
}

export default DonorDonations
