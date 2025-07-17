import { useState } from 'react'
import { AnimationWrapper } from '../../common'
import { toast } from 'react-hot-toast'
import contactAndHelpDatabaseService from '../../databaseService/contactAndHelp.database.service';

const ContactAndHelpComponent = () => {

    const [isModalOpen, setIsModalOpen] = useState({
        open: false,
        type: '',
        color: ''
    });

    const [submitQuery, setSubmitQuery] = useState({
        phone: '',
        subject: '',
        message: ''
    })

    const [activeTab, setActiveTab] = useState('Reach Us');

    // status of queries object tag 
    const queryStatus = [
        "Open",
        "Progress",
        "resolved",
        "closed"
    ]

    const [helpStatusTag, setHelpStatusTab] = useState("Open");

    const colorClassMap = {
        input: {
            blue: "focus:ring-blue-400",
            orange: "focus:ring-orange-400",
            pink: "focus:ring-pink-400",
            purple: "focus:ring-purple-400"
        },
        button: {
            blue: 'bg-blue-600 hover:bg-blue-700 ',
            orange: 'bg-orange-600 hover:bg-orange-700 ',
            pink: 'bg-pink-600 hover:bg-pink-700 ',
            purple: 'bg-purple-600 hover:bg-purple-700 ',
        }
        // add more if needed
    };

    const handleTabChange = (e) => {
        const tag = e.target.innerText;
        setActiveTab(tag);
    }
    const handleHelpStatusTabChnage = (e) => {
        const tag = e.target.innerText;
        setHelpStatusTab(tag);
    }

    const handleModalOpen = ({ type, color }) => {
        setIsModalOpen({
            open: true,
            type: type,
            color: color
        });
    }

    const resetForm = () => {
        setSubmitQuery({
            phone: '',
            subject: '',
            message: ''
        });
    }

    const handleModalClose = () => {
        setIsModalOpen({
            open: false,
            type: '',
            color: ''
        });
        resetForm();
    }

    // Import the contactAndHelpDatabaseService from your service file
    const QuerySubmittionFunction = async (data) => {

        await toast.promise(
            contactAndHelpDatabaseService.submitContactForm(data),
            {
                loading: 'Submitting your query...',
                success: (response) => {
                    handleModalClose();
                    console.log(response)
                    return `Query submitted successfully!`;
                },
                error: (error) => {
                    console.error("Error submitting query:", error);
                    return `Error submitting query: ${error.message}`;
                }
            }
        );

    }

    const handleQueryFromSubmit = (e) => {

        e.preventDefault();

        if (submitQuery.phone === '' && (isModalOpen.type === "phone" || isModalOpen.type === "partnership")) {
            toast.error("Phone number is required field.");
        }

        if (submitQuery.subject === '') {
            toast.error("subject are required fields.");
        }

        let formatedData = {
            type: isModalOpen.type,
            phone: submitQuery.phone,
            subject: submitQuery.subject,
            message: submitQuery.message

        }
        // switch case to handle different types of queries
        switch (isModalOpen.type) {
            case "general":
                QuerySubmittionFunction(formatedData);
                break;
            case "phone":
                QuerySubmittionFunction(formatedData);
                break;
            case "report":
                QuerySubmittionFunction(formatedData);
                break;
            case "partnership":
                QuerySubmittionFunction(formatedData);
                break;
            default:
                toast.error("This feature is not implemented yet.");
                break;
        }
    }





    return (
        <AnimationWrapper>

            <main className='relative flex flex-col max-lg:justify-start max-lg:items-center gap-4 items-start border-t-[1px] py-8 border-gray-200 mt-4 mb-6'>

                <div className='flex justify-between items-center w-full'>

                    {/*tag based filterig of all NGOs */}
                    <div onClick={handleTabChange} className='flex flex-wrap items-center gap-4 w-full max-lg:px-3 px-5'>
                        <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 cursor-pointer font-semibold text-sm hover:bg-indigo-100 ${activeTab == 'Help Desk' ? "bg-indigo-100" : ""} transition duration-200 ease-in-out `}>Help Desk</span>
                        <span className={`border-2 rounded-full border-indigo-200 px-4 py-1 cursor-pointer font-semibold text-sm hover:bg-indigo-100 ${activeTab == 'Reach Us' ? "bg-indigo-100" : ""} transition duration-200 ease-in-out`}>Reach Us</span>
                    </div>
                </div>


                {
                    activeTab === 'Reach Us' ?
                        (
                            <>
                                <div className='flex flex-col  items-center w-full'>

                                    {/* header section */}
                                    <div className='flex flex-col md:items-center gap-2 max-md:px-6  w-full'>
                                        <h1 className='text-3xl font-medium  text-gray-500 '>Reach us</h1>
                                        <p className='text-gray-500 md:text-center text-[16px] w-full'>We are here to help you with any questions or concerns you may have.</p>
                                    </div>

                                    {/* helping card */}
                                    <div className='grid mt-16 items-center content-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-4 w-full max-lg:px-3 px-5'>

                                        {/* general enquiry card */}
                                        <div onClick={() => handleModalOpen({ type: "general", color: "blue" })} className='cursor-pointer p-4 py-6 rounded-md border flex flex-col items-center border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out'>
                                            <span className='flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 '>
                                                <i className="fi fi-sr-user-headset text-4xl hover:text-blue-600 text-blue-500"></i>
                                            </span>
                                            <h2 className='text-lg font-semibold'>Contact Us</h2>
                                            <p className='text-gray-500 text-sm font-semibold text-center'>Have a <span className='text-blue-500'>questions</span> about donations, NGOs, your account, or how our platform works?</p>
                                        </div>

                                        {/* Phone call request */}
                                        <div onClick={() => handleModalOpen({ type: "phone", color: "orange" })} className='cursor-pointer p-4 rounded-md border flex flex-col items-center border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out'>
                                            <span className='flex items-center justify-center h-20 w-20 rounded-full bg-orange-100 '>
                                                <i className="fi fi-sr-chat-bubble-call text-4xl mt-2 text-orange-400 hover:text-orange-500"></i>
                                            </span>
                                            <h2 className='text-lg font-semibold mt-2'>Request a Call</h2>
                                            <p className='text-gray-500 text-sm font-semibold text-center'>
                                                Need help or have <span className='text-orange-400'>questions</span>? Tap here to request a callback from our support team.
                                            </p>
                                        </div>

                                        {/* report  */}

                                        <div onClick={() => handleModalOpen({ type: "report", color: "pink" })} className='cursor-pointer p-4 rounded-md border flex flex-col items-center border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out'>
                                            <span className='flex items-center justify-center h-20 w-20 rounded-full bg-pink-100'>
                                                <i className="fi fi-ss-bullhorn text-4xl mt-2 text-pink-500 hover:text-pink-600"></i>
                                            </span>
                                            <h2 className='text-lg font-semibold mt-2'>Report an Issue</h2>
                                            <p className='text-gray-500 text-sm font-semibold text-center'>
                                                Facing a problem or noticed something unusual? Click here to <span className='text-pink-400'>report</span> the issue to our support team.
                                            </p>
                                        </div>

                                        {/* partership  */}

                                        <div onClick={() => handleModalOpen({ type: "partnership", color: "purple" })} className='cursor-pointer p-4 rounded-md border flex flex-col items-center border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out'>
                                            <span className='flex items-center justify-center h-20 w-20 rounded-full bg-purple-100'>
                                                <i className="fi fi-sr-heart-partner-handshake text-4xl mt-2 text-purple-500 hover:text-purple-600"></i>
                                            </span>
                                            <h2 className='text-lg font-semibold mt-2'>Partner With Us</h2>
                                            <p className='text-gray-500 text-sm font-semibold text-center'>
                                                <span className='text-purple-500'>Collaborate</span> with us to create meaningful impact. Join hands to empower causes and expand reach.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* modal section */}

                                {
                                    isModalOpen.open && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300 ease-out">
                                            <div className="bg-white shadow-md rounded-md px-6 py-8 w-full max-w-md relative animate-fade-in">

                                                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-500">
                                                    Quick Connect
                                                    <p className='capitalize text-sm'>{isModalOpen.type} support</p>
                                                </h2>

                                                {/* Form */}
                                                <form
                                                    className="flex flex-col gap-4"
                                                    onSubmit={handleQueryFromSubmit}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleQueryFromSubmit(e);
                                                        }
                                                        if (e.key === 'Escape') {
                                                            setIsModalOpen(false);
                                                        }
                                                    }}
                                                >
                                                    {/* Phone */}
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-[16px] font-semibold  text-gray-600">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            disabled={isModalOpen.type !== "phone" && isModalOpen.type !== "partnership"}
                                                            placeholder={isModalOpen.type !== "phone" && isModalOpen.type !== "partnership" ? "Disabled" : 'Enter your phone number'}
                                                            value={submitQuery.phone}
                                                            onChange={(e) => setSubmitQuery({ ...submitQuery, phone: e.target.value })}
                                                            className={`w-full px-4 py-2 border border-gray-300 disabled:bg-gray-100 placeholder:text-sm rounded-md focus:ring-2 ${colorClassMap.input[isModalOpen.color]} focus:outline-none`}
                                                        />
                                                    </div>

                                                    {/* Subject */}
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-[16px] font-semibold  text-gray-600">Subject</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Brief subject"
                                                            value={submitQuery.subject}
                                                            onChange={(e) => setSubmitQuery({ ...submitQuery, subject: e.target.value })}
                                                            className={`w-full px-4 py-2 border border-gray-300 placeholder:text-sm rounded-md focus:ring-2 focus:ring-${isModalOpen.color}-400 focus:outline-none`}
                                                        />
                                                    </div>

                                                    {/* Message */}
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-[16px] font-semibold text-gray-600">
                                                            Message ( <span className='text-sm text-gray-400 font-normal'><span className="text-red-500 text-md">*</span>Message is optional</span> )
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            placeholder="Write your message..."
                                                            value={submitQuery.message}
                                                            onChange={(e) => setSubmitQuery({ ...submitQuery, message: e.target.value })}
                                                            className={`w-full px-4 py-2 border border-gray-300 placeholder:text-sm rounded-md focus:ring-2 focus:ring-${isModalOpen.color}-400 focus:outline-none`}
                                                        ></textarea>

                                                    </div>

                                                    {/* Submit */}
                                                    <div className='flex justify-end  gap-2'>
                                                        <button type="button" onClick={() => resetForm()} className=' flex-none mr-40'><i className="fi fi-br-refresh text-xl"></i></button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsModalOpen(false)}
                                                            className="w-auto py-1 px-5 border-2 border-gray-600 text-slate-600 rounded-full font-medium hover:bg-gray-700 hover:text-white "
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className={`w-auto py-1 px-5 ${colorClassMap.button[isModalOpen.color]} text-white rounded-full font-medium `}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    )
                                }
                            </>
                        ) :

                        (
                            <>

                                <AnimationWrapper transition={{ duration: 0.5 }}>
                                    <div onClick={handleHelpStatusTabChnage} className='flex flex-wrap items-center gap-4 w-full max-lg:px-3 px-5'>
                                        {queryStatus.map((status, index) => (
                                            <span key={index} className={`border-2 rounded-full border-pink-200 px-4 py-1 cursor-pointer font-semibold text-sm hover:bg-pink-100 ${helpStatusTag == status ? "bg-pink-100" : ""} transition duration-200 ease-in-out `}>{status}</span>
                                        ))}
                                    </div>

                                </AnimationWrapper>

                                <div className='flex gap-3 justify-center lg:justify-start items-center flex-wrap lg:mt-10 w-full mt-7 px-5 max-lg:px-3'>
                                    <div className="flex flex-col gap-2 bg-white shadow-sm hover:shadow-md rounded-lg p-2 py-4 sm:p-4 w-full  sm:w-[350px] max-w-md border border-gray-200">
                                        {/* Top row with icon and status */}
                                        <div className='flex gap-4 items-start'>
                                            <div className='h-12 w-12 flex-none rounded-full bg-green-200 flex items-center justify-center mb-4'>
                                                {/* <img src="" alt="" /> */}
                                            </div>
                                            <div>
                                                <h1 className=' text-lg'>General Enquiry</h1>
                                                <p className='text-sm underline'>donor.test@gmail.com</p>
                                            </div>
                                            <span className='bg-pink-100 ml-auto px-4 py-1 rounded-full text-sm font-semibold '>{helpStatusTag}</span>
                                        </div>

                                        <p className=' rounded-md text-md font-light bg-[#F1F2F7] px-4 py-1 '>this is for subject part</p>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white shadow-sm hover:shadow-md rounded-lg p-2 py-4 sm:p-4 w-full  sm:w-[350px] max-w-md border border-gray-200">
                                        {/* Top row with icon and status */}
                                        <div className='flex gap-4 items-start'>
                                            <div className='h-12 w-12 flex-none rounded-full bg-green-200 flex items-center justify-center mb-4'>
                                                {/* <img src="" alt="" /> */}
                                            </div>
                                            <div>
                                                <h1 className=' text-lg'>General Enquiry</h1>
                                                <p className='text-sm underline'>donor.test@gmail.com</p>
                                            </div>
                                            <span className='bg-pink-100 ml-auto px-4 py-1 rounded-full text-sm font-semibold '>{helpStatusTag}</span>
                                        </div>

                                        <p className=' rounded-md text-md font-light bg-[#F1F2F7] px-4 py-1 '>this is for subject part</p>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white shadow-sm hover:shadow-md rounded-lg p-2 py-4 sm:p-4 w-full  sm:w-[350px] max-w-md border border-gray-200">
                                        {/* Top row with icon and status */}
                                        <div className='flex gap-4 items-start'>
                                            <div className='h-12 w-12 flex-none rounded-full bg-green-200 flex items-center justify-center mb-4'>
                                                {/* <img src="" alt="" /> */}
                                            </div>
                                            <div>
                                                <h1 className=' text-lg'>General Enquiry</h1>
                                                <p className='text-sm underline'>donor.test@gmail.com</p>
                                            </div>
                                            <span className='bg-pink-100 ml-auto px-4 py-1 rounded-full text-sm font-semibold '>{helpStatusTag}</span>
                                        </div>

                                        <p className=' rounded-md text-md font-light bg-[#F1F2F7] px-4 py-1 '>this is for subject part</p>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white shadow-sm hover:shadow-md rounded-lg p-2 py-4 sm:p-4 w-full  sm:w-[350px] max-w-md border border-gray-200">
                                        {/* Top row with icon and status */}
                                        <div className='flex gap-4 items-start'>
                                            <div className='h-12 w-12 flex-none rounded-full bg-green-200 flex items-center justify-center mb-4'>
                                                {/* <img src="" alt="" /> */}
                                            </div>
                                            <div>
                                                <h1 className=' text-lg'>General Enquiry</h1>
                                                <p className='text-sm underline'>donor.test@gmail.com</p>
                                            </div>
                                            <span className='bg-pink-100 ml-auto px-4 py-1 rounded-full text-sm font-semibold '>{helpStatusTag}</span>
                                        </div>

                                        <p className=' rounded-md text-md font-light bg-[#F1F2F7] px-4 py-1 '>this is for subject part</p>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white shadow-sm hover:shadow-md rounded-lg p-2 py-4 sm:p-4 w-full  sm:w-[350px] max-w-md border border-gray-200">
                                        {/* Top row with icon and status */}
                                        <div className='flex gap-4 items-start'>
                                            <div className='h-12 w-12 flex-none rounded-full bg-green-200 flex items-center justify-center mb-4'>
                                                {/* <img src="" alt="" /> */}
                                            </div>
                                            <div>
                                                <h1 className=' text-lg'>General Enquiry</h1>
                                                <p className='text-sm underline'>donor.test@gmail.com</p>
                                            </div>
                                            <span className='bg-pink-100 ml-auto px-4 py-1 rounded-full text-sm font-semibold '>{helpStatusTag}</span>
                                        </div>

                                        <p className=' rounded-md text-md font-light bg-[#F1F2F7] px-4 py-1 '>this is for subject part</p>
                                    </div>
                                    
                                </div>
                            </>
                        )
                }

            </main>
        </AnimationWrapper >
    )
}

export default ContactAndHelpComponent