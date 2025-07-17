import React from 'react'

import { useEffect, useState, useRef } from "react";
import InputComponent from "../InputComponent/index.jsx";
import countriesData from '../../content/countries_name.json';
import OtpComponent from '../../components/OTPComponent/index.jsx';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import donorDatabaseService from "../../databaseService/donor.database.service.js";
import authService from "../../services/auth.service.js";

const DonorSignupComponent = ({ role }) => {

    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        nationality: {
            name: "",
            code: "",
        }
    });

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // personal info update state niclude image url
    const [personalInfoUpdate, setPersonalInfoUpdate] = useState({
        phone: "",
        previewImage: "https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180",
        imageUrl: ""

    });

    const handlePersonalInfoUpdate = (e) => {
        const { name, value } = e.target;
        setPersonalInfoUpdate((prev) => ({ ...prev, [name]: value }));
    };


    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    // select image from local machine
    const handleImageUplaod = (e) => {
        // check if the file is selected
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setImageFile(e.target.files[0]);
        setPersonalInfoUpdate({ ...personalInfoUpdate, previewImage: URL.createObjectURL(e.target.files[0]) });
    }


    //  upload image to cloudinary
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
                        setPersonalInfoUpdate({ ...personalInfoUpdate, previewImage: response.image_url, imageUrl: response.image_url }); // Assuming the response contains the image URL
                        setImageFile(null); // Clear the file input after successful upload
                        return "Image uploaded successfully.";
                    } else {
                        throw new Error("Image upload failed. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error uploading image:", error);
                    setError(error.message || "An error occurred while uploading the image.");
                    return "An error occurred while uploading the image. Please try again.";
                }
            }
        );

    }


    // country name and code search functionality
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (query.trim() === "") {
            setFiltered([]);
        } else {
            const filteredList = countriesData.filter((country) =>
                country.name.toLowerCase().includes(query.toLowerCase())
            );
            setFiltered(filteredList);
        }
    }, [query]);

    const handleSelectCountry = (country) => {
        setFiltered([]);
        setFormData({ ...formData, nationality: { name: country.name, code: country.code } });
        setQuery(country.name);
    };

    const handleNext = async () => {

        switch (currentStep) {
            case 0:
                if (currentStep === 0 && (!formData.name || !formData.email || !formData.password || !formData.nationality.name)) {
                    toast.error("Please fill in all fields");
                    setError("Please fill in all fields");
                    // account creation logic here
                    break;
                }

                await toast.promise(
                    authService.register(formData, role),
                    {
                        loading: 'Creating account...',
                        success: (response) => {
                            if (response.success) {
                                setCurrentStep((prev) => prev + 1);
                                setError("");
                                return "Account created successfully!";
                            } else {
                                throw new Error(response.message || "Failed to create account");
                            }
                        },
                        error: (error) => {
                            console.error("Error creating account:", error);
                            setError(error.message || "An error occurred while creating the account.");
                            return "An error occurred while creating the account.";
                        }
                    }
                );
                break;
            case 2:
                // Validate phone if provided
                if (personalInfoUpdate.phone) {
                    const phoneRegex = /^\+?[0-9]{7,15}$/;
                    if (!phoneRegex.test(personalInfoUpdate.phone)) {
                        setError("Please enter a valid phone number.");
                        return;
                    }
                }
                if(!personalInfoUpdate.imageUrl) {
                    personalInfoUpdate.imageUrl = personalInfoUpdate.previewImage;
                }

                await toast.promise(
                    authService.updatePhoneProfileImage({
                        email: formData.email,
                        role: role,
                        phone: personalInfoUpdate.phone,
                        code: formData.nationality.code,
                        imageUrl: personalInfoUpdate.imageUrl
                    }),
                    {
                        loading: 'Updating profile...',
                        success: (response) => {
                            if (response.success) {
                                console.log("Profile updated successfully:", response);
                                setError("");
                                navigate(`/login/${role}`);
                                return "Profile updated successfully!";
                            } else {
                                throw new Error(response.message || "Failed to update profile");
                            }
                        },
                        error: (error) => {
                            console.error("Error updating profile:", error);
                            setError(error.message || "An error occurred while updating the profile.");
                            return "An error occurred while updating the profile.";
                        }
                    }
                );
                break;
            default:
                toast.error("Invalid step");
                break;
        }


    };

    // handle skip button
    const handleSkip = () => {
        if (currentStep === 2) {
            // skip the final step and redirect to dashboard
            navigate('/');
            return;
        }
        setCurrentStep((prev) => prev + 1);
    }
    return (
        <>
            <h2 className="text-3xl text-center font-bold text-indigo-600 mb-4">{currentStep === 0 ? "Create Account" : currentStep === 1 ? "Verification Step" : "Quick Setup"}</h2>
            {
                currentStep === 0 && (
                    <div className="flex items-center justify-center space-x-4 mb-6">

                        {/* google auth */}
                        <div className="cursor-pointer hover:shadow-md transition duration-200 ease-in-out w-36  rounded-full border border-gray-300 flex items-center justify-center px-2 pr-4 text-gray-500" >
                            <div

                                className="h-10 w-10 flex items-center"
                            >
                                <img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" alt="" />
                            </div>
                            <span className="text-[15px] font-semibold">Google</span>
                        </div>

                        {/* linkedin auth */}
                        <div className="cursor-pointer hover:shadow-md rounded-full border border-gray-300 flex items-center justify-center px-4 pr-4 text-gray-500">
                            <div

                                className="h-10 w-10 flex items-center"
                            >
                                <img src="https://gmlconsult.com/wp-content/uploads/2021/10/Illustration-of-Linkedin-icon-on-transparent-background-PNG.png" alt="" className="h-7 w-7" />
                            </div>
                            <span className="text-[15px] font-semibold">Linkedin</span>
                        </div>
                    </div>
                )
            }
            {/* Step Progress */}
            <div className="flex items-center justify-center mb-10 space-x-8 text-gray-600">
                {["Personal info", "Verification", "Final Submit"].map((label, i) => {
                    const isCompleted = i < currentStep;
                    const isActive = i === currentStep;
                    return (
                        <div key={i} className="flex flex-col items-center">
                            <span className={`text-sm font-semibold ${isCompleted ? 'text-green-600' : isActive ? 'text-indigo-600' : 'text-gray-400'}`}>{label}</span>
                            <span className={`mt-1 h-6 w-6 rounded-full text-center text-sm font-bold flex items-center justify-center ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{i + 1}</span>
                        </div>
                    );
                })}
            </div>

            {/* Step Forms */}
            {currentStep === 0 && (
                <>
                    {error && <p className='py-2 px-3 my-5 truncate leading-7 bg-red-100 border-l-2 border-red-400 w-full'>{error}</p>}
                    <div className="grid max-sm:grid-cols-1 grid-cols-2 max-sm:gap-8 gap-5 mb-4">
                        <InputComponent value={formData.name} onChange={handleFormDataChange} name={"name"} type="text" label="Full name" required={true} />
                        <InputComponent value={formData.email} onChange={handleFormDataChange} name={"email"} type="email" label="Enter email" required={true} />
                        <InputComponent value={formData.password} onChange={handleFormDataChange} type="password" name="password" label="Enter password" required={true} />
                        <div className="relative w-full h-10">
                            <input
                                type="text"
                                name={"nationality"}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                required
                                placeholder=" "
                                className="peer w-full h-full border-2 border-gray-300 bg-transparent shadow-[inset_0_0_0_1000px_white] text-gray-700 px-6 py-1 rounded-lg text-[15px] outline-none transition-all duration-100 valid:ring-2 valid:border-0 focus:ring-2 focus:border-0 focus:ring-blue-600 valid:ring-blue-600"
                            />
                            <label htmlFor="nationality" className="absolute left-6 -top-1 text-gray-500 text-[15px] bg-white px-2 transition-all duration-200 transform scale-100 translate-y-2 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:scale-90 peer-valid:scale-90 peer-focus:-translate-y-4 peer-valid:-translate-y-4 peer-focus:-translate-x-4 peer-valid:-translate-x-4 peer-focus:text-gray-500 peer-focus:font-normal peer-focus:text-[15px] peer-valid:font-normal peer-valid:text-[15px] pointer-events-none z-30">Nationality</label>
                            {filtered.length > 0 && (
                                <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md max-h-48 overflow-y-auto shadow-md">
                                    {filtered.map((country) => (
                                        <li key={country.code} onClick={() => handleSelectCountry(country)} className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer">
                                            {country.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </>
            )}

            {currentStep === 1 && (
                <div className="mb-6">
                    <OtpComponent role={role} setCurrentStep={setCurrentStep} count={6} emailVerfied={formData.email} />
                </div>
            )}

            {currentStep === 2 && (
                <div>
                    {error && <p className='py-2 px-3 my-3 truncate leading-7 bg-red-100 border-l-2 border-red-400 w-full'>{error}</p>}
                    <p className="text-sm text-gray-500">
                        <strong>Profile image</strong> and <strong>phone number</strong> are optional.
                        You can skip them now or update them later from your <strong>account settings</strong>.
                    </p>
                    <div className="flex max-md:flex-col max-md:items-center gap-5 mt-6 justify-between items-start">

                        {/* Left side: inputs */}
                        <div className="flex  max-md:w-full w-1/2 flex-col gap-5">

                            <InputComponent
                                type="text"
                                name="imageUrl"
                                value={personalInfoUpdate.imageUrl}
                                onChange={handlePersonalInfoUpdate}
                                label="Profile Picture URL"
                                required={false}

                            />
                            <InputComponent
                                name="phone"
                                type="tel"
                                label="Phone Number"
                                value={personalInfoUpdate.phone}
                                onChange={handlePersonalInfoUpdate}
                                required={false}
                            />
                        </div>

                        {/* Right side: image preview */}

                        <div className='  flex max-md:mt-2 -mt-4 max-md:w-full w-1/2 gap-5'>
                            <span onClick={() => fileInputRef.current.click()} className='relative flex-none overflow-hidden group bg-white border-2 border-slate-400 rounded-full w-32 h-32'>
                                {/* image */}
                                <img src={personalInfoUpdate.previewImage} alt="Profile" className=' rounded-full object-contain' />

                                {/* overlay effect on the top of image  */}
                                <div className='absolute top-0 left-0 w-full h-full hidden group-hover:flex bg-black/30 rounded-full items-center justify-center transition'>
                                    <i className="fi fi-sr-add-image text-white text-3xl"></i>
                                </div>
                                <input type="file" ref={fileInputRef} accept='.jpg,.png,.jpeg' hidden onChange={handleImageUplaod} className=' z-10' />
                            </span>
                            <span className='flex flex-col justify-center items-start gap-2'>
                                <button onClick={handleUploadImageToServer} className='mt-2 w-fit flex items-center text-sm bg-indigo-100 text-slate-600 font-medium px-4 py-[5px] rounded-md hover:scale-[1.01]'>
                                    <i className="fi fi-sr-cloud-upload-alt text-lg mr-2 mt-1"></i>Uplaod
                                </button>
                                <p className='text-[10px] text-gray-400 ml-2'><span className='text-red-500 text-[16px] '>*</span>JPG, JPEG or PNG.(1MB max) </p>
                            </span>

                        </div>
                    </div>


                </div>
            )}

            {
                <div className="flex gap-5">
                    {currentStep == 2 && (
                        <button
                            onClick={handleSkip}
                            className="mt-4 w-full rounded-lg hover:shadow-md bg-indigo-500 py-2 font-medium text-white hover:bg-indigo-600"
                        >
                            Skip
                        </button>
                    )}
                    {currentStep !== 1 && <button
                        onClick={handleNext}
                        className="mt-4 w-full rounded-lg hover:shadow-md bg-indigo-500 py-2 font-medium text-white hover:bg-indigo-600"
                    >
                        Next
                    </button>}
                </div>
            }
        </>
    )
}

export default DonorSignupComponent