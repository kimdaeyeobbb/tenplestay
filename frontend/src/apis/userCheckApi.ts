import axios from 'axios';


export const userCheckApi = async () => {
  try {
    const endpoint = 'api/accounts/user';
    const response = await axios.get(endpoint);
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
