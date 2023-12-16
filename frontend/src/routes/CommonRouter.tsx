import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import RegisterURL from '../pages/registerURL/RegisterURL';
import { userCheckApi } from '../apis/userCheckApi';
import { useState, useEffect } from 'react';
import Dashboard from '../pages/dashboard/Dashboard';

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

  useEffect(() => {
    console.log('권한 확인 전 로그인 상태: ', loginStatus);
    checkAuthorization();
    console.log('권한 확인 후 로그인 상태: ', loginStatus);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* 로그인 상태에 따라 리디렉션 처리 */}
      <Route
        path="/"
        element={
          loginStatus ? (
            <Navigate to="/registerurl" replace />
          ) : (
            <Navigate to="/landing" replace />
          )
        }
      />

      {/* 항상 렌더링되는 라우트 */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/registerurl" element={<RegisterURL />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 추가적인 라우트는 여기에 추가 */}
    </Routes>
  );
}

export default CommonRouter;
