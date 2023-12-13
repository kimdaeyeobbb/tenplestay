import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from '../../apis/googleLogin';

const GoogleAuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');

    if (accessToken) {
      getUserInfo(accessToken)
        .then((userInfo) => {
          console.log('사용자 정보 알아냄: ', userInfo);
        })
        .catch((error) => {
          console.log('에러 발견: ', error);
        });
    }
  }, [location.search]);
  return <div>로그인 처리 중...</div>;
};

export default GoogleAuthCallback;

// 구글에서 리디렉션한 다음 토큰을 추출하고 추출한 토큰을 사용해서 사용자 정보를 가져오는 페이지
