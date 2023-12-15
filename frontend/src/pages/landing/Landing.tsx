import GoogleLoginButton from '../../components/ui/Button/GoogleLoginButton';
// import { oauthApicallByCode } from '../../apis/oauthApicallByCode';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Landing = () => {
  useEffect(() => {
    const location = useLocation();
    console.log('위치 확인: ', location);
  }, []);
  // useEffect(() => {
  //   const pathname = new URLSearchParams(window.location.pathname);
  //   console.log("hostname뒤의 '/' 문자 뒤의 경로: ", pathname);

  //   const urlParams = new URLSearchParams(window.location.search);
  //   console.log('urlparmas 확인: ', urlParams);

  //   const code = urlParams.get('code');
  //   const scope = urlParams.get('scope');
  //   console.log('코드 확인: ', 'scope 확인: ', scope);

  //   if (code && scope) {
  //     const platform = scope.includes('google') ? 'google' : 'kakao';
  //     oauthApicallByCode(code, platform);
  //   }
  // }, []);

  return (
    <section>
      <h1>랜딩페이지</h1>
      <div>랜딩 페이지 내용 작성 </div>
      <GoogleLoginButton />
    </section>
  );
};

export default Landing;
