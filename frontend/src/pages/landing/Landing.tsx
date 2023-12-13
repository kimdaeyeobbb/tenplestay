import GoogleLoginButton from '../../components/ui/Button/GoogleLoginButton';
import axios from 'axios';
import { useEffect } from 'react';

const Landing = () => {
  useEffect(() => {
    // URL에서 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // 코드가 존재하는 경우에만 API 호출
    if (code) {
      apicallByCode(code);
    }
  }, []); // 페이지 로드 시 한 번만 실행하도록 설정

  const apicallByCode = async (code: string) => {
    try {
      const baseURL = 'https://tenplestay.kro.kr'; // 실제 기본 URL로 교체
      const endpoint = '/api/accounts/google/login/callback';

      // 기본 URL, 엔드포인트 및 쿼리 매개변수를 결합
      const url = `${baseURL}${endpoint}?code=${code}`;

      // GET 요청 수행
      const response = await axios.get(url);

      // 응답 처리 (필요에 따라 데이터 활용)
      console.log(response.data); // 또는 데이터에 대한 다른 처리 수행
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <h1>랜딩페이지</h1>
      <div>랜딩 페이지 내용 작성 </div>
      <GoogleLoginButton />
    </section>
  );
};

export default Landing;
