import { useEffect } from 'react';
import { getGoogleAuthURL } from '../../../apis/googleLogin';
import { useLocation } from 'react-router-dom';

// 버튼 클릭시 Google OAuth 로그인 페이지로 리디렉션
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    useEffect(() => {
      const location = useLocation();
      console.log('위치 확인: ', location);
    }, []);

    const authURL = getGoogleAuthURL();

    window.location.href = authURL;
    console.log('URL 확인: ', authURL);
  };

  return <button onClick={handleGoogleLogin}>구글 로그인</button>;
};

export default GoogleLoginButton;
