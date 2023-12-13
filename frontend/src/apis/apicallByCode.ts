import axios from 'axios';

export const apicallByCode = async (code: string) => {
  try {
    const redirectURI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const endpoint = '/api/accounts/google/login/callback';

    // Combine base URL, endpoint, and query parameters
    const url = `${redirectURI}${endpoint}?code=${code}`;

    // Make the GET request
    const response = await axios.get(url);

    // Handle the response as needed
    console.log(response.data); // or do something else with the data
  } catch (error) {
    throw error;
  }
};
