import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import RegisterURL from '../pages/registerURL/RegisterURL';
import { userCheckApi } from '../apis/userCheckApi';
import { useState, useEffect } from 'react';

function CommonRouter() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthorization = async () => {
    try {
      const response = await userCheckApi();
      if (response.status === 200) {
        setLoginStatus(true);
      }
    } catch (error) {
      console.log('에러 확인: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 여부 체크하기
  useEffect(() => {
    checkAuthorization();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <Routes>
      {/* 로그인 상태가 아니면 /landing으로 리디렉션 */}
      {!loginStatus && <Route path="*" element={<Navigate to="/landing" replace />} />}

      {/* 로그인 상태일 때 사용할 라우트 */}
      {loginStatus && (
        <>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/registerurl" element={<RegisterURL />}></Route>
          {/* 추가적인 로그인 필요 라우트 여기에 작성 */}
        </>
      )}
    </Routes>
  );
}

export default CommonRouter;
