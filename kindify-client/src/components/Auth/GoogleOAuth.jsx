import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GoogleOAuth = ({ role, mode = 'login' }) => {
    const { googleAuth } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await googleAuth(credentialResponse.credential, role);
            
            // Navigate based on role
            if (role === 'donor') {
                navigate('/donor-home');
            } else if (role === 'ngo') {
                navigate('/ngo-home');
            } else {
                navigate('/donor-home'); // Default fallback
            }

            toast.success(mode === 'login' ? 'Successfully logged in with Google!' : 'Successfully signed up with Google!');
        } catch (error) {
            console.error('Google auth error:', error);
            toast.error(error.message || 'Failed to authenticate with Google. Please try again.');
        }
    };

    const handleGoogleError = () => {
        toast.error('Google authentication failed. Please try again.');
    };

    return (
        <div className="w-full">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text={mode === 'login' ? 'signin_with' : 'signup_with'}
                shape="rectangular"
                width="100%"
                locale="en"
            />
        </div>
    );
};

export default GoogleOAuth; 