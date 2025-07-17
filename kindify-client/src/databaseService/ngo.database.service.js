

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


const ngoDatabaseServices = {

    verfiyNgoRegistrationNumber: async (registrationNumber) => {
        try {
            const response = await api.post(`${API_URL}/ngo/verify-registration-number`, { registrationNumber });
            return response.data;
        } catch (error) {
            console.error("Error verifying NGO registration number:", error);
            throw error;
        }
    },
    registerNgo: async (ngoData) => {
        try {

            const response = await api.post(`${API_URL}/ngo/register-ngo`, ngoData);
            return response.data;
        } catch (error) {
            console.error("Error registering NGO:", error);
            throw error;
        }
    },

    addAccountDetails: async (accountDetails) => {
        try {
            const response = await api.post(`${API_URL}/ngo/add-account-details`, accountDetails);
            return response.data;
        } catch (error) {
            console.error("Error adding NGO account details:", error);
            throw error;
        }
    },
    addAddressAndLogo: async (addessAndLogoData) => {
        try {
            const response = await api.post(`${API_URL}/ngo/add-address-and-logo`, addessAndLogoData);
            return response.data;
        } catch (error) {
            console.error("Error adding NGO address and logo:", error);
            throw error;
        }

    },

    filterNgo: async (params) => {
        try {

            const response = await axios.get(`http://localhost:3000/api/ngo/filter-ngos`, {
                params,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true // If your API requires credentials
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ngoDatabaseServices;
