import axios from "axios";


const API_URL = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api";

const rawToken = localStorage.getItem('token');
const token = rawToken ? JSON.parse(rawToken) : null;


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
});


const donorDatabaseService = {

    uploadProfileImage:async(image) => {
        try {
            const response = await api.post(`${API_URL}/user/upload-profile-picture`, {image},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error uploading profile image:", error);
            throw error;
        }
    },

    updateDonorPersonalInformation: async (formatedPersonalInformation) => {
        try {
            const response = await api.post(`${API_URL}/donor/update-personal-information`, formatedPersonalInformation);
            return response.data;
        } catch (error) {
            console.error("Error updating personal information:", error);
            throw error;
        }
    },
    
    updateDonorPassword: async (formatedPassword) => {
        try {
            const response = await api.post(`${API_URL}/user/update-password`, formatedPassword);
            return response.data;
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    },

    deleteDonorAccount: async () => {
        try {
            const response = await axios.delete(`${API_URL}/user/delete-account`);
            return response.data;
        } catch (error) {
            console.error("Error deleting donor account:", error);
            throw error;
        }
    }
}


export default donorDatabaseService;