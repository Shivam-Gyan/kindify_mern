import React, { useEffect, useRef, useState } from 'react'
import authService from '../../services/auth.service';
import { toast } from 'react-hot-toast';
import { input } from 'framer-motion/client';

const OtpComponent = ({ count, role, setForgotPassword, ispassword = false, emailVerfied, classname, setCurrentStep, value, handleChange }) => {

    const [otps, setOtps] = useState([])
    const [error, setError] = useState("");
    // const [masking, setMasking] = useState(new Array(count).fill(""))
    const inputRefs = useRef([])

    const [password, setPassword] = useState("");

    const [resendTimer, setResendTimer] = useState(30);
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const handleClick = (index) => {
        return (event) => {
            event.target.setSelectionRange(1, 1);
        }
    }

    const handlePaste = (index) => {
        return (event) => {
            // TODO: manage it for index > 0
            const pastedData = event.clipboardData.getData("Text").slice(0, count);
            if (!isNaN(pastedData)) {
                setOtps(pastedData.split(""));
                // setMasking(pastedData.split("").fill("*"));
            }
        };
    }


    const handleKeyUp = (index) => {

        return (event) => {
            const key = event.key;
            let oldOtps = [...otps];
            // let maskingCopy = [...masking];

            // ifkey is ArrowRight

            if (key == 'ArrowRight') {
                moveFocusToRight(index, oldOtps);
                return;
            }

            // if key is ArrowLeft
            if (key == 'ArrowLeft') {
                moveFocusToLeft(index);
                return;
            }


            // if key is backspace move focus to left
            if (key == 'Backspace') {
                oldOtps[index] = "";
                // maskingCopy[index] = ""
                moveFocusToLeft(index);

                setOtps(oldOtps);
                // setMasking(maskingCopy);
                return;
            }

            // if key not a number return
            if (isNaN(key)) return;

            // set the value of otp
            oldOtps[index] = key;
            // maskingCopy[index] = "*";
            // setMasking(maskingCopy);
            setOtps(oldOtps);

            // move focus to next input
            moveFocusToRight(index);

            // send otp to parent component

            // const otpToSend = oldOtps.join("");

            // if (otpToSend.length == count) {
            //     onOTPComplete(otpToSend);
            // }

        }
    }

    const moveFocusToRight = (index, oldOtps) => {

        if (inputRefs.current[index + 1]) {
            if (oldOtps) {

                const tempArray = [...otps];
                const trimedArray = tempArray.fill("*", 0, index);

                // find the index of empty box
                const emptyIndex = trimedArray.indexOf("");
                inputRefs.current[emptyIndex]?.focus();

            } else {
                inputRefs.current[index + 1]?.focus();
            }
        }

    }
    const moveFocusToLeft = (index) => {

        if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    // submit the otp for verfification
    const ConfirmOTPSubmition = async () => {
        const otpToSend = otps.join("");

        if (otpToSend.length == count) {

            switch (ispassword) {
                case true:
                    if (!password || !emailVerfied || !role || !otpToSend) {
                        toast.error("Please fill all the fields");
                        break;
                    }

                    await toast.promise(
                        authService.resetPassword(emailVerfied, otpToSend, password, role),
                        {
                            pending: 'Resetting password...',
                            success: (response) => {
                                if (response.success) {
                                    setForgotPassword(false);
                                    return 'Password reset successfully!';
                                } else {
                                    toast.error(response.message);
                                }
                            },
                            error: (error) => {
                                return `${error.message}`;
                            }
                        }
                    )
                    break;

                case false:
                    await toast.promise(
                        authService.verifyOtp({ email: emailVerfied, otp: otpToSend, role }),
                        {
                            pending: 'Verifying OTP...',
                            success: 'OTP verified!',
                            error: 'OTP verification failed'
                        }
                    ).then(() => {
                        setCurrentStep(2);
                    }).catch(error => {
                        console.error("OTP verification error:", error);
                        toast.error(error.message || "Failed to verify OTP");
                        setError(error.message || "Failed to verify OTP");
                    })
                    break;
                default:
                    console.error("something went wrong in otp component");
                    break;

            }
        } else {
            toast.error("Please fill the OTP");
            setError("Please fill the OTP");
            return;
        }
    }

    useEffect(() => {
        let interval;
        if (isTimerRunning && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [resendTimer, isTimerRunning]);


    // Function to handle resend OTP
    const handleResend = async () => {

        await toast.promise(
            authService.resendOtp(emailVerfied, role),
            {
                pending: 'Resending OTP...',
                success: 'OTP Sent!',
                error: ' Failed to send OTP'
            }
        ).then(() => {
            setResendTimer(30);
            setIsTimerRunning(true);
        }).catch(error => {
            console.error("OTP verification error:", error);
            setError(error.message || "Failed to verify OTP");
        })

    };

    return (
        <>{error && <p className='py-2 px-3 my-3 truncate leading-7 bg-red-100 border-l-2 border-red-400 w-full'>{error}</p>}
            <div className={`flex ${classname ? classname : " max-md:flex-col max-md:items-center w-full justify-center items-center "}  gap-4 py-3`}>
                <div className={`flex max-md:w-full max-md:items-centeritems-start  flex-col gap-3`}>
                    <h1 className='text-xl text-slate-700 font-semibold tracking-wide'>Verification Code</h1>
                    <p className={`max-md:w-80 ${classname ? " w-72 " : " w-56 "} text-sm max-md:text-center font-normal text-slate-600`}>we have sent a verification code to your email address. Please enter the code below</p>

                </div>


                <div className={`flex max-md:w-full ${classname ? " w-[500px] " : " w-1/2 "} min-w-64 gap-5 flex-col items-center justify-center`}>
                    <div className={`px-4 ${classname ? " min-w-72 " : " min-w-64 "} py-2 border-[1px] flex justify-between items-center border-slate-300 rounded-lg text-sm font-mdeium text-slate-500`}>
                        <span>{emailVerfied || "example@gamil.com"}</span>
                        <i className='fi fi-rr-envelope text-lg text-slate-500'></i>
                    </div>
                    {ispassword && (
                        <div className={`px-4 ${classname ? " min-w-72 " : " min-w-64 "} py-2 border-[1px] flex justify-between items-center border-slate-300 rounded-lg text-sm font-mdeium text-slate-500`}>
                            {<input placeholder='enter new password' value={password} onChange={(e) => setPassword(e.target.value)} name={"password"} type={"text"} className='outline-none' />}
                            <i className='fi fi-rr-lock text-lg text-slate-500'></i>
                        </div>
                    )}
                    <div className='relative flex justify-start items-center gap-1'>
                        {
                            new Array(count).fill("").map((_, index) => (
                                <input
                                    ref={(iRef) => inputRefs.current[index] = iRef} //iRef means input reference
                                    key={index}
                                    onChange={(event) => {
                                        const selectedData = event.target.value;
                                        if (selectedData.length === count) {
                                            if (!isNaN(selectedData)) {
                                                setOtps(selectedData.split(""));
                                                setMasking(selectedData.split("").fill("*"));
                                            }
                                        }
                                    }}
                                    onPaste={handlePaste(index)}
                                    inputMode="numeric"
                                    autoComplete='one-time-code'
                                    onClick={handleClick(index)}
                                    className="w-8 h-8 text-center border-[1px] border-slate-300 focus:border-blue-500 hover:border-blue-500 outline-none rounded-lg text-lg font-semibold mx-1"
                                    type="text"
                                    onKeyUp={handleKeyUp(index)}
                                    value={otps[index] ?? ""}

                                />
                            ))
                        }

                        <span
                            className={`absolute top-9 mr-3 right-0 text-sm ${isTimerRunning ? "text-gray-400" : "text-blue-500 cursor-pointer hover:underline"}`}
                            onClick={!isTimerRunning ? handleResend : undefined}
                        >
                            {isTimerRunning ? `Resend in ${resendTimer}s` : "Resend"}
                        </span>
                    </div>
                    <button onClick={ConfirmOTPSubmition} className='w-64 mt-5 cursor-pointer py-1 px-6 border-2 bg-blue-500 text-white font-medium uppercase text-sm border-slate-400 hover:border-blue-600 hover:text-white rounded-lg'>Confirm OTP</button>
                </div>
            </div>
        </>
    )
}

export default OtpComponent;