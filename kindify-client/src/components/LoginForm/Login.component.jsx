import { useState } from "react";
import InputComponent from "../InputComponent";
import { toast } from "react-hot-toast";
import authService from "../../services/auth.service";
import OtpComponent from "../OTPComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginComponent = ({ role }) => {
    const { setUser,setLoading } = useAuth(); // ✅ fix useAuth usage

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            return;
        }

        const credentials = {
            email: formData.email,
            password: formData.password,
        };

        await toast.promise(
            authService.login(credentials, role),
            {
                loading: 'Logging in...',
                success: async (response) => {
                    if (response.success) {
                        setError("");

                        // Clear form
                        setFormData({ email: "", password: "" });

                        // ✅ fetch user profile after login and set globally
                        try {
                            setLoading(true)
                            const profile = await authService.getUserProfile();
                            if (profile && profile.user) {
                                setUser(profile.user);
                                setLoading(false);
                                setTimeout(() => {
                                    navigate(`/${role}-home`);
                                }, 100);
                                return 'Login successful';
                            }
                        } catch (e) {
                            console.error("Error fetching user profile after login", e);
                        }


                    } else {
                        setError(response.message || "Login failed");
                        throw new Error(response.message || "Login failed");
                    }
                },
                error: (error) => {
                    setError(error.message || "An error occurred during login.");
                    return 'Login failed';
                }
            }
        );
    };

    const handleForgotPasswordRequest = async () => {
        setError("");

        if (!formData.email) {
            setError("Please enter your email to reset your password.");
            return;
        }

        await toast.promise(
            authService.forgotPassword(formData.email, role),
            {
                loading: 'Sending reset password Otp...',
                success: (response) => {
                    if (response.success) {
                        setForgotPassword(true);
                        setError("");
                        return 'OTP sent to your email';
                    } else {
                        setError(response.message || "Failed to send reset password OTP");
                        throw new Error(response.message || "Failed to send reset password OTP");
                    }
                },
                error: (error) => {
                    setError(error.message || "An error occurred while sending OTP.");
                    return 'Failed to send reset password OTP';
                }
            }
        );
    };

    return (
        <>
            <h2 className="text-3xl text-center font-bold text-indigo-600 mb-4">
                {forgotPassword ? "Change Password" : "Welcome Back"}
            </h2>

            {forgotPassword ? (
                <OtpComponent
                    setForgotPassword={setForgotPassword}
                    count={6}
                    role={role}
                    emailVerfied={formData.email}
                    classname={" flex-col items-center "}
                    ispassword={true}
                />
            ) : (
                <>
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        {/* Google Auth */}
                        <div className="cursor-pointer hover:shadow-md transition duration-200 ease-in-out w-36 rounded-full border border-gray-300 flex items-center justify-center px-2 pr-4 text-gray-500">
                            <div className="h-10 w-10 flex items-center">
                                <img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" alt="Google" />
                            </div>
                            <span className="text-[15px] font-semibold">Google</span>
                        </div>

                        {/* LinkedIn Auth */}
                        <div className="cursor-pointer hover:shadow-md rounded-full border border-gray-300 flex items-center justify-center px-4 pr-4 text-gray-500">
                            <div className="h-10 w-10 flex items-center">
                                <img
                                    src="https://gmlconsult.com/wp-content/uploads/2021/10/Illustration-of-Linkedin-icon-on-transparent-background-PNG.png"
                                    alt="LinkedIn"
                                    className="h-7 w-7"
                                />
                            </div>
                            <span className="text-[15px] font-semibold">Linkedin</span>
                        </div>
                    </div>

                    {error && (
                        <p className='py-2 px-3 my-5 truncate leading-7 bg-red-100 border-l-2 border-red-400 w-full'>
                            {error}
                        </p>
                    )}

                    <div className="grid grid-cols-1 gap-5 mb-4">
                        <InputComponent
                            value={formData.email}
                            onChange={handleFormDataChange}
                            name="email"
                            type="email"
                            label="Enter email"
                            required
                        />
                        <InputComponent
                            value={formData.password}
                            onChange={handleFormDataChange}
                            name="password"
                            type="password"
                            label="Password"
                            required
                        />
                    </div>

                    <div className="flex justify-end mb-2">
                        <button
                            onClick={handleForgotPasswordRequest}
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="mt-4 w-full rounded-lg hover:shadow-md bg-indigo-500 py-2 font-medium text-white hover:bg-indigo-600"
                    >
                        Next
                    </button>
                </>
            )}
        </>
    );
};

export default LoginComponent;
