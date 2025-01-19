import axios from 'axios';

// Create an Axios instance for shared configurations
const apiClient = axios.create({
    baseURL: 'https://example.com/api',
    timeout: 5000, // Set a timeout for requests
});

// Fetch data from an external API
export const fetchData = async (): Promise<any> => {
    try {
        const response = await apiClient.get('/data');
        return response.data; // Return the data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Send data to an external API
export const postData = async (data: any): Promise<any> => {
    try {
        const response = await apiClient.post('/data', data);
        return response.data; // Return the response from the external API
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
