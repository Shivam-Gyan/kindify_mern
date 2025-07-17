import axios from "axios";


const API_URL = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api";

const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbWd1cHRhMTlhQGdtYWlsLmNvbSIsInJvbGUiOiJkb25vciIsImlhdCI6MTc1MDUxMzk1OSwiZXhwIjoxNzUwNjAwMzU5fQ.WFYKKj6ZIpexg9pDtAJZNjaQ4qE4N9b8LkBICyWnVIs'


const contactAndHelpDatabaseService = {

    submitContactForm: async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/contact/${formData.type}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Assuming you store the token in localStorage
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error submitting contact form:", error);
            throw error;
        }
    },

};

export default contactAndHelpDatabaseService;