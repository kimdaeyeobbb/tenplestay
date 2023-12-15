import axios from 'axios';


const oauthEndPoint: {
  google: string;
  naver: string;
  kakao: string;
  [key: string]: string;
} = {
  google: '/api/accounts/google/login/callback',
  naver: '/api/accounts/naver/login/callback',
  kakao: '/api/accounts/kakao/login/callback',
};


export const oauthApicallByCode = async (code: string, platform: string = "google") => {
  try {
    const endpoint = oauthEndPoint[platform];
    const url = `${endpoint}?code=${code}`;
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
