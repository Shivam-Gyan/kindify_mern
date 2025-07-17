
// Updated MultiStepForm.jsx

import { motion } from "framer-motion";
import { DonorSignupComponent, Footer } from "../../components";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import NgoSingupComponent from "../../components/SignupForm/ngo.signup.component";
import { AnimationWrapper } from "../../common";



export default function SignupForm() {

    const { role: roleParam } = useParams();

    const [role, setRole] = useState(roleParam || "")

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to reload / refresh '; // Required for Chrome
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>

            <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400  p-4 overflow-hidden">
                {/* Bubble Backgrounds */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                    className="absolute top-10 left-10 h-72 w-72 bg-blue-300 rounded-full border-2 border-white opacity-50"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 0.3, scale: 1.1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                    className="absolute bottom-10 right-10 h-80 w-80 bg-white/20 rounded-full  border-2 border-purple-200 opacity-50"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex w-full max-w-5xl rounded-2xl z-40 shadow-lg"
                >
                    {/* Sidebar */}
                    <div className="w-1/3 bg-indigo-600  p-8 rounded-l-2xl text-white max-md:hidden">
                        <img src="https://res.cloudinary.com/dglwzejwk/image/upload/v1751289094/kindify-logo_white_mqbmgz.png" alt="" className="h-14 -ml-4" />
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold mb-2">Already a <span className="text-red-400 capitalize">{role?role:"account"}</span> ?</h2>
                            <p className="mb-6 text-sm">
                                To keep track on your dashboard please login with your personal info
                            </p>
                            <Link to={`${role?`/login/${role}`:"/login"}`} className="rounded-full border border-white px-6 py-2 text-white hover:bg-white hover:text-indigo-600">
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="max-md:w-full w-2/3 rounded-r-2xl max-md:rounded-2xl bg-white max-sm:px-3 max-sm:py-4 p-10">

                        {
                            !role && (
                                <div className="flex flex-col items-center justify-center mb-8">
                                    <div className="w-full flex justify-start md:hidden"> <img src="https://res.cloudinary.com/dglwzejwk/image/upload/v1750157677/logoblack_ly0mlm.png" alt="" className="max-md:h-5 h-8 ml-2 mb-7" /></div>
                                    <h2 className="text-3xl text-center font-bold text-indigo-600 mb-4">Select your role</h2>
                                    <div className="flex max-md:flex-col max-md:items-center max-md:gap-5 gap-8">
                                        <div className="flex flex-col items-center">
                                            <img className="h-auto w-56 rounded-full" src="https://img.freepik.com/free-vector/young-volunteer-with-food-donation-boxes-concept-illustrations-food-donation-concept-with-character-can-use-web-banner-infographics-hero-images_106796-258.jpg?w=1480" alt="" />
                                            <label className="flex items-center font-bold text-indigo-600  text-lg cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="donor"
                                                    checked={role === "donor"}
                                                    onChange={() => setRole("donor")}
                                                    className="accent-indigo-600 mr-2"
                                                />
                                                Donor
                                            </label>
                                        </div>
                                        <div className="flex flex-col items-center" >
                                            <img className="h-auto w-80 rounded-full" src="https://img.freepik.com/premium-vector/ngo-nongovernmental-organization-serve-specific-social-template-hand-drawn-illustration_2175-7898.jpg?w=2000" alt="" />
                                            <label className="flex items-center font-bold text-indigo-600  text-lg cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value="ngo"
                                                    checked={role === "ngo"}
                                                    onChange={() => setRole("ngo")}
                                                    className="accent-indigo-600 mr-2"
                                                />
                                                NGO
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* <Outlet/> */}
                        {role === "donor" && <AnimationWrapper><DonorSignupComponent role={role} /></AnimationWrapper>}
                        {role === "ngo" && <AnimationWrapper><NgoSingupComponent role={role} /></AnimationWrapper>}


                    </div>
                </motion.div >
            </div >
            <Footer />
        </>
    );
}
