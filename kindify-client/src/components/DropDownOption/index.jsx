import { div } from 'framer-motion/client'
import { useState } from 'react'
import { AnimationWrapper } from '../../common'

const DropDownOptions = ({ options, className, setSelectOption, other, selectOption }) => {

    const [showDropDownOption, setShowDropDownOption] = useState(false)

    const handleSelectOption = (e) => {
        setSelectOption(e.target.innerText)
        setShowDropDownOption(false)

    }

    return (
        <div className='w-full relative  '>
            <button type='button'
               
                onClick={() => setShowDropDownOption(prev => !prev)} className='px-4 focus:ring-2 focus:ring-blue-500 text-[16px] py-2 border w-full text-start border-gray-300 rounded-lg '>{selectOption == "" ? options[0] : selectOption}</button>

            {showDropDownOption &&
                <>
                    <div className="w-0 h-0 z-0 absolute top-[50px] left-20 
                                border-l-[8px] border-l-transparent 
                                border-r-[8px] border-r-transparent 
                                border-b-[8px] border-b-blue-400"
                    >
                    </div>
                    <div className='absolute top-[58px] z-20 right-0 w-full'>


                        <div className={className + " bg-white  w-full z-20 border-2 border-blue-400 shadow-md "}>
                            {
                                options.map((option, index) => {
                                    if (index !== 0) {
                                        return <div className={` px-4 py-2 z-3 cursor-pointer hover:bg-blue-100 `} key={index} onClick={handleSelectOption}>
                                            {option}
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default DropDownOptions