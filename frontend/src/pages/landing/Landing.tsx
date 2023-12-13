import GoogleLoginButton from '../../components/ui/Button/GoogleLoginButton';
import { oauthApicallByCode } from '../../apis/oauthApicallByCode';
import { useEffect } from 'react';

const Landing = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');

    if (code && scope) {
      const platform = (scope.includes("google") ? "google" : "kakao");
      oauthApicallByCode(code, platform);
    }
  }, []);

  return (
    <section>
      <h1>랜딩페이지</h1>
      <div>랜딩 페이지 내용 작성 </div>
      <GoogleLoginButton />
    </section>
  );
};

export default Landing;
