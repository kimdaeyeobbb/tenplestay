import { useEffect } from 'react';
import { getGoogleAuthURL } from '../../../apis/googleLogin';
import { oauthApicallByCode } from '../../../apis/oauthApicallByCode';


// 버튼 클릭시 Google OAuth 로그인 페이지로 리디렉션
const GoogleLoginButton = () => {

  const login = async () => {
    // URL에서 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      await oauthApicallByCode(code);
    }
  }

  useEffect(() => {
    login()
  }, [])

  const handleGoogleLogin = () => {
    const authURL = getGoogleAuthURL();
    window.location.href = authURL;
    console.log('URL 확인: ', authURL);
  };

  return <button onClick={handleGoogleLogin}>구글 로그인</button>;
};

export default GoogleLoginButton;
