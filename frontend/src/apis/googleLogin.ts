import axios from 'axios';

// Google OAuth 인증 URL을 가져옴
export const getGoogleAuthURL = () => {
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const responseType = 'code';
  const scope = 'profile email'; // 필요한 권한에 따라 조절
  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}`;
  return authURL;
};

// 사용자의 정보를 가져옴
export const getUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
