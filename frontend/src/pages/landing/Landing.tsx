import GoogleLoginButton from '../../components/ui/Button/GoogleLoginButton';
// import { oauthApicallByCode } from '../../apis/oauthApicallByCode';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Landing = () => {

  return (
    <section>
      <h1>랜딩페이지</h1>
      <div>랜딩 페이지 내용 작성 </div>
      <GoogleLoginButton />
    </section>
  );
};

export default Landing;
