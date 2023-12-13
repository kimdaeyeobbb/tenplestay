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
    const redirectURI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const endpoint = oauthEndPoint[platform];

    const url = `${redirectURI}${endpoint}?code=${code}`;
    const response = await axios.get(url);

    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
