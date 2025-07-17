import React from 'react'

import { useEffect, useState, useRef } from "react";
import InputComponent from "../InputComponent/index.jsx";
import countriesData from '../../content/countries_name.json';
import OtpComponent from '../../components/OTPComponent/index.jsx';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import donorDatabaseService from "../../databaseService/donor.database.service.js";
import authService from "../../services/auth.service.js";
import ngoDatabaseServices from '../../databaseService/ngo.database.service.js'
import axios from 'axios';


// validate validate DARPAN ID format
function isValidDarpanId(darpanId) {
    const darpanRegex = /^[A-Z]{2}\/\d{4}\/\d{7}$/;
    return darpanRegex.test(darpanId.trim());
}

// ifscCode regex
const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;


const NgoSingupComponent = ({ role }) => {
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
    const [ngoDetails, setNgoDetails] = useState({
        officialPhone: "",
        officialEmail: "",
        logoPreview: "https://tse4.mm.bing.net/th?id=OIP.fz29xDdt8iK_0EOsoMF5FwHaHa&pid=Api&P=0&h=180",
        logo: "",
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        upiId: "",
        razorpayPaymentLink: "",
        preferredMethod: "upi",

    });

    const [ifscCode, setIfscCode] = useState("");
    const [message, setMessage] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [isValid, setIsValid] = useState(true);

    const [postalCode, setPostalCode] = useState("");

    const handlePostalCodeChange = (e) => {
        const value = e.target.value;
        setPostalCode(value);
        // Clear error initially
        setError("");
        // Basic format validation (assuming postal code is numeric)
        if (!/^[1-9][0-9]{5}$/.test(value)) {
            setIsValid(true);
            setError("Enter a valid postal code (6 digits)");
            return;
        }
        setIsValid(false)
        // If valid, you can set isValid to true or perform further actions
    };

    const handleIfscCodeChange = async (e) => {
        const value = e.target.value.toUpperCase();
        setIfscCode(value);

        // Clear error initially
        setError("");
        setIsValid(false);

        // Basic format validation
        if (!ifscRegex.test(value)) {
            setError("Enter a valid IFSC code (e.g., PUNB0123456)");
            return;
        }

        try {
            const { data } = await axios.get(`https://ifsc.razorpay.com/${value}`);
            console.log("IFSC Code Data:", data);
            setMessage(`bank - ${data.ADDRESS}, branch - ${data.BRANCH}`);
            setIsValid(true);
        } catch (err) {
            console.error("Invalid IFSC:", err?.response?.data || err.message);
            setError("This IFSC code is not valid or not found.");
        }
    };

    const handleDarpanIdChange = (e) => {
        const value = e.target.value.toUpperCase(); // auto-uppercase
        setRegistrationNumber(value);
        setIsValid(isValidDarpanId(value));
    };

    const handleNgoDetailUpdate = (e) => {
        const { name, value } = e.target;
        setNgoDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerifyRegistrationNumber = async () => {
        console.log("Verifying registration number:", ngoDetails.registrationNumber);
        if (!ngoDetails.registrationNumber) {
            toast.error("Please enter a registration number.");
            return;
        }

        await toast.promise(
            ngoDatabaseServices.verfiyNgoRegistrationNumber(ngoDetails.registrationNumber),
            {
                loading: 'Verifying registration number...',
                success: (response) => {

                    if (response.success) {
                        console.log("Registration number verified successfully:", response);
                        setNgoDetails({ ...ngoDetails, registrationNumber: response.registrationNumber });
                        toast.success("Registration number verified successfully.");
                        setCurrentStep(3); // Move to the next step
                        return "Registration number verified successfully.";
                    } else {
                        throw new Error("Registration number verification failed. Please try again.");
                    }
                },
                error: (error) => {
                    console.error("Error verifying registration number:", error);
                    setError(error.message || "An error occurred while verifying the registration number.");
                    return "An error occurred while verifying the registration number. Please try again.";
                }
            }
        );
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
        setNgoDetails({ ...ngoDetails, logoPreview: URL.createObjectURL(e.target.files[0]) });
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
                        setNgoDetails({ ...ngoDetails, logo: response.image_url, logoPreview: response.image_url });
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
        setFormData({ ...formData, nationality: { name: country.name, code: country.code } });
        setQuery(country.name);
        setFiltered([]);
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
                                setCurrentStep(1);
                                setError("");
                                setIsValid(true);
                                return "Account created successfully!";
                            } else {
                                throw new Error(response.message || "Failed to create account");
                            }
                        },
                        error: (error) => {
                            setError(error.message || "An error occurred while creating the account.");
                            return "An error occurred while creating the account.";
                        }
                    }
                );
                break;
            case 2:
                // setCurrentStep(3);
                if (!registrationNumber || !ngoDetails.officialEmail || !ngoDetails.officialPhone) {
                    toast.error("Please fill in all fields");
                    setError("Please fill in all fields");
                    break;
                }
                await toast.promise(
                    ngoDatabaseServices.registerNgo({
                        email: formData.email,
                        role: role,
                        name: formData.name,
                        registrationNumber: registrationNumber,
                        officialEmail: ngoDetails.officialEmail,
                        officialPhone: ngoDetails.officialPhone,
                    }),
                    {
                        loading: 'Updating profile...',
                        success: (response) => {
                            if (response.success) {
                                console.log("Profile updated successfully:", response);
                                setCurrentStep((prev) => prev + 1);
                                setError("");
                                setIsValid(true);
                                setRegistrationNumber("");
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
            case 3:
                if (!ngoDetails.bankName || !ngoDetails.accountHolderName || !ngoDetails.accountNumber || !ifscCode || !ngoDetails.upiId || !ngoDetails.razorpayPaymentLink) {
                    toast.error("Please fill in all fields");
                    setError("Please fill in all fields");
                    break;
                }
                await toast.promise(
                    ngoDatabaseServices.addAccountDetails({
                        email: formData.email,
                        role: role,
                        bankName: ngoDetails.bankName,
                        accountHolderName: ngoDetails.accountHolderName,
                        accountNumber: ngoDetails.accountNumber,
                        ifscCode: ifscCode,
                        upiId: ngoDetails.upiId,
                        razorpayPaymentLink: ngoDetails.razorpayPaymentLink,
                        preferredMethod: ngoDetails.preferredMethod,
                    }),
                    {
                        loading: 'Adding account details...',
                        success: (response) => {
                            if (response.success) {
                                console.log("Account details added successfully:", response);
                                setCurrentStep((prev) => prev + 1);
                                setError("");
                                return "Account details added successfully!";
                            } else {
                                throw new Error(response.message || "Failed to add account details");
                            }
                        },
                        error: (error) => {
                            console.error("Error adding account details:", error);
                            setError(error.message || "An error occurred while adding account details.");
                            return "An error occurred while adding account details.";
                        }
                    }
                );
                break;
            case 4:
                if(!ngoDetails.logo || !postalCode) {
                    toast.error("Please fill in all fields");
                    setError("Please fill in all fields");
                    break;
                }
                await toast.promise(
                    ngoDatabaseServices.addAddressAndLogo({
                        officialContactEmail: ngoDetails.officialEmail,
                        role: role,
                        logo: ngoDetails.logo,
                        postalCode: postalCode,
                    }),
                    {
                        loading: 'Finalizing setup...',
                        success: (response) => {
                            if (response.success) {
                                console.log("NGO details added successfully:", response);
                                toast.success("redirecting to dashboard...");
                                setError("");

                                setTimeout(() => {
                                    navigate('/');
                                }, 2000); // Redirect after 2 seconds
                                setCurrentStep(0); // Reset to initial step
                                setFormData({
                                    name: "",
                                    email: "",
                                    password: "",   
                                    nationality: {
                                        name: "",
                                        code: "",
                                    }
                                });
                                setNgoDetails({
                                    officialPhone: "",
                                    officialEmail: "",  
                                    logoPreview: "",
                                    logo: "",
                                    bankName: "",
                                    accountHolderName: "",
                                    accountNumber: "",
                                    upiId: "",
                                    razorpayPaymentLink: "",
                                    preferredMethod: "upi",
                                });
                                setIfscCode("");
                                setRegistrationNumber("");
                                setPostalCode("");
                                setImageFile(null);
                                setQuery("");
                                setFiltered([]);

                                setIsValid(true);
                                // Reset any other state variables if needed

                                // Optionally, you can reset any other state variables if needed

                                return "Setup completed successfully!";
                            } else {
                                throw new Error(response.message || "Failed to finalize setup");
                            }
                        },
                        error: (error) => {
                            console.error("Error finalizing setup:", error);
                            setError(error.message || "An error occurred while finalizing the setup.");
                            return "An error occurred while finalizing the setup.";
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
        if (currentStep === 4) {
            // skip the final step and redirect to dashboard
            navigate('/');
            return;
        }
        if (currentStep === 3) {
            // skip to the final step
            setCurrentStep(4);
            return;
        }
    }

    return (
        <>
            <h2 className="text-3xl text-center font-bold text-indigo-600 mb-4">{currentStep === 0 ? "Create Account" : currentStep === 1 ? "Verification Step" : currentStep == 2 ? "Supported Documents" : currentStep == 3 ? "Account Details" : "Quick Setup"} </h2>

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
                {["Basic info", "Verification", "Ngo details", "Account", "Final Submit"].map((label, i) => {
                    const isCompleted = i < currentStep;
                    const isActive = i === currentStep;
                    return (
                        <div key={i} className="flex flex-col items-center">
                            <span className={`text-sm font-semibold ${isCompleted ? 'text-green-600' : isActive ? 'text-indigo-600' : 'text-gray-400'} max-md:hidden`}>{label}</span>
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
                        <InputComponent value={formData.name} onChange={handleFormDataChange} name={"name"} type="text" label="Organization name" required={true} />
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
                                className="peer w-full h-full border-2 border-gray-300 bg-transparent shadow-[inset_0_0_0_1000px_white] text-gray-700 px-6 py-1 rounded-lg text-md outline-none transition-all duration-100 valid:ring-2 valid:border-0 focus:ring-2 focus:border-0 focus:ring-blue-600 valid:ring-blue-600"
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

            {/* Otp verification  */}
            {currentStep === 1 && (
                <div className="mb-6">
                    <OtpComponent role={role} setCurrentStep={setCurrentStep} count={6} emailVerfied={formData.email} />
                </div>
            )}

            {/* ngo details  */}
            {currentStep === 2 && (
                <div className=''>

                    {/* Darpan introduction */}
                    <div className={`bg-gray-100 border-gray-600 text-gray-800 px-4 border-l-2 py-3 text-sm my-3 mb-5`}>
                        <span className="font-semibold gap-1 flex items-center"><i className="fi fi-sr-lock text-lg "></i> DARPAN Verified NGOs only:</span> Please enter your valid <span className="text-indigo-600 font-semibold">DARPAN Registration ID</span> and the official email registered with DARPAN.
                    </div>

                    {/* error display */}
                    {(error || !isValid) && (
                        <div className={`${error || !isValid ? "bg-red-100 border-red-500 text-red-800 truncate" : ""} px-4 border-l-2 py-3 text-sm my-3 mb-5`}>
                            {error ? error : !isValid ? "DARPAN ID is not valid. Please enter a valid DARPAN ID in the format XX/XXXX/XXXXXXX." : ""}
                        </div>
                    )}

                    {/* component form */}
                    <div className="flex justify-between gap-4 my-3">
                        <InputComponent value={registrationNumber} onChange={handleDarpanIdChange} name={"registrationNumber"} type={"text"} label={"Registration Number"} required={true} />
                        <button disabled className='px-4 py-1 text-white font-medium bg-indigo-500 hover:bg-indigo-600 rounded-lg' onClick={handleVerifyRegistrationNumber}>verify</button>
                    </div>

                    <div className='flex max-md:flex-col max-md:items-center gap-5 my-5 mb-3'>
                        <InputComponent value={ngoDetails.officialEmail} onChange={handleNgoDetailUpdate} name={"officialEmail"} type={"email"} label={"Official Email"} required={true} />
                        <InputComponent value={ngoDetails.officialPhone} onChange={handleNgoDetailUpdate} name={"officialPhone"} type={"phone"} label={"Official Phone"} required={true} />
                    </div>
                </div>
            )}

            {/* account details */}
            {currentStep === 3 && (
                <div className="mb-6">
                    {/* Bank Details Introduction */}
                    <div className="bg-gray-100 border-gray-600 text-gray-800 px-4 border-l-2 py-3 text-sm my-3 mb-5">
                        <span className="font-semibold gap-1 flex items-center">
                            <i className="fi fi-sr-bank text-lg"></i> Bank Account Details:
                        </span>{" "}
                        Provide your official payment details used for NGO fund collection.
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-100 border-red-500 text-red-800 px-4 border-l-2 py-3 text-sm my-3 mb-5">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-blue-100 border-blue-500 text-gray-800 px-4 border-l-2 py-3 text-sm my-3 mb-5">
                            {message}
                        </div>
                    )}

                    {/* Bank & Holder Name */}
                    <div className="flex max-md:flex-col gap-5 mb-5">
                        <InputComponent
                            value={ngoDetails.bankName}
                            onChange={handleNgoDetailUpdate}
                            name="bankName"
                            type="text"
                            label="Bank Name"
                            required
                        />
                        <InputComponent
                            value={ngoDetails.accountHolderName}
                            onChange={handleNgoDetailUpdate}
                            name="accountHolderName"
                            type="text"
                            label="Account Holder Name"
                            required
                        />
                    </div>

                    {/* Account Number & IFSC */}
                    <div className="flex max-md:flex-col gap-5 mb-5">
                        <InputComponent
                            value={ngoDetails.accountNumber}
                            onChange={handleNgoDetailUpdate}
                            name="accountNumber"
                            type="text"
                            label="Account Number"
                            required
                        />
                        <InputComponent
                            value={ifscCode}
                            onChange={handleIfscCodeChange}
                            name="ifscCode"
                            type="text"
                            label="IFSC Code"
                            required
                        />
                    </div>

                    {/* UPI & Razorpay */}
                    <div className="flex max-md:flex-col gap-5 mb-5">
                        <InputComponent
                            value={ngoDetails.upiId}
                            onChange={handleNgoDetailUpdate}
                            name="upiId"
                            type="text"
                            label="UPI ID"
                            required={true}
                        />
                        <InputComponent
                            value={ngoDetails.razorpayPaymentLink}
                            onChange={handleNgoDetailUpdate}
                            name="razorpayPaymentLink"
                            type="text"
                            label="Razorpay Payment Link"
                            required={true}
                        />
                    </div>

                    {/* Preferred Method */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preferred Payment Method</p>
                        <div className="flex gap-6">
                            {["upi", "bank", "razorpay"].map(method => (
                                <label key={method} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                    <input
                                        type="radio"
                                        name="preferredMethod"
                                        value={method}
                                        checked={ngoDetails.preferredMethod === method}
                                        onChange={handleNgoDetailUpdate}
                                        className="accent-indigo-600"
                                    />
                                    {method.charAt(0).toUpperCase() + method.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* final address and logo  */}
            {currentStep === 4 && (
                <div>
                    {error && <p className='py-2 px-3 my-3 truncate leading-7 bg-red-100 border-l-2 border-red-400 w-full'>{error}</p>}
                    <p className="text-sm text-gray-500">
                        <strong>Oragnization Logo</strong> and <strong>State</strong> are optional.
                        You can skip them now or update them later from your <strong>account settings</strong>.
                    </p>
                    <div className="flex max-md:flex-col max-md:items-center gap-5 mt-6 justify-between items-start">

                        {/* Left side: inputs */}
                        <div className="flex  max-md:w-full w-1/2 flex-col gap-5">

                            <InputComponent
                                type="text"
                                name="logo"
                                value={ngoDetails.logo}
                                onChange={handleNgoDetailUpdate}
                                label="Orangaization logo URL"
                                required={true}

                            />
                            <InputComponent
                                name="postalCode"
                                type="tel"
                                label="Pin code of area"
                                value={postalCode}
                                onChange={handlePostalCodeChange}
                                required={true}
                            />
                        </div>

                        {/* Right side: image preview */}

                        <div className='  flex max-md:mt-2 -mt-4 max-md:w-full w-1/2 gap-5'>
                            <span onClick={() => fileInputRef.current.click()} className='relative flex-none overflow-hidden group bg-white border-2 border-slate-400 rounded-full w-32 h-32'>
                                {/* image */}
                                <img src={ngoDetails.logoPreview} alt="Profile" className=' rounded-full object-contain' />

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
                    {(currentStep == 4 || currentStep == 3) && (
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

export default NgoSingupComponent