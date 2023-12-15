import axios from 'axios';
// import instance from './index';

// auth 토큰값 기반으로 사용자의 정보를
export const userCheckApi = async () => {
  try {
    const endpoint = `api/accounts/user/`;
    // /return instance.get(endpoint);
    const response = await axios.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};
