import axios from 'axios';

// The base URL should match your backend server
const API_URL = 'http://localhost:3000/api/user';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const authService = {
    login: async (credentials, role) => {
        try {
            const response = await api.post(`/login/${role}`, credentials);
            console.log('Login response:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'An error occurred during login' };
        }
    },

    register: async (userData, role) => {
        try {
            console.log('Attempting registration with:', { ...userData, role });
            const response = await api.post(`/register/${role}`, userData);
            console.log('Registration response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'An error occurred during registration' };
        }
    },

    // Google OAuth methods
    googleAuth: async (googleToken, role) => {
        try {
            console.log('Attempting Google auth with role:', role);
            const response = await api.post(`/google-auth/${role}`, {
                googleToken,
                role
            });
            console.log('Google auth response:', response.data);

            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            console.error('Google auth error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'An error occurred during Google authentication' };
        }
    },

    verifyOtp: async ({ email, otp, role }) => {
        try {
            console.log('Verifying OTP for:', { email, role });
            const response = await api.post(`/register/${role}/otp-verify`, { email, otp });
            console.log('OTP verification response:', response.data);
            return response.data;
        } catch (error) {
            console.error('OTP verification error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to verify OTP' };
        }
    },

    resendOtp: async (email, role) => {
        try {
            console.log('Resending OTP to:', { email, role });
            const response = await api.post(`/resend-otp/${role}`, { email });
            console.log('Resend OTP response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Resend OTP error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to resend OTP' };
        }
    },

    forgotPassword: async (email, role) => {
        try {
            console.log('Requesting password reset for:', { email, role });
            const response = await api.post(`/forgot-password/${role}`, { email });

            return response.data;
        } catch (error) {
            console.error('Forgot password error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to request password reset' };
        }
    },
    resetPassword: async (email, otp, newPassword, role) => {
        try {
            console.log('Resetting password for:', { email, otp, role });
            const response = await api.post(`/reset-password/${role}`, { email, otp, newPassword });


            console.log('Password reset response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Reset password error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to reset password' };
        }
    }
    ,
    logout: () => {
        localStorage.removeItem('token');
    },

    updatePhoneProfileImage: async (data) => {

        try {

            const response = await api.post(`/update-phone-image`, data);
            return response.data;
        } catch (error) {
            console.error('OTP verification error:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to verify OTP' };
        }
    },

    getToken: () => {
        const rawToken = localStorage.getItem('token');
        const token = rawToken ? JSON.parse(rawToken) : null;

        return token;
    },

    getUserProfile: async () => {
        try {
            const rawToken = localStorage.getItem('token');
            const token = rawToken ? JSON.parse(rawToken) : null;
            if (!token) {
                throw new Error('No user is currently logged in');
            }
            const response = await api.get(`/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error.response?.data || error.message);
            throw error.response?.data || { message: 'Failed to fetch user profile' };
        }
    }
};

export default authService; 