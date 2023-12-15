import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import RegisterURL from '../pages/registerURL/RegisterURL';
import { userCheckApi } from '../apis/userCheckApi';
import { useState, useEffect } from 'react';

function CommonRouter() {
  const [statusCode, setStatusCode] = useState(0);

  // const checkAuthorization = async () => {
  //   try {
  //     const response = await userCheckApi();
  //     console.log('공통 라우터에서 response확인: ', response);
  //     console.log('공통 라우터에서 상태 코드 확인: ', response.status);
  //     setStatusCode(response.status);
  //     // setIsAuthorized(response.status === 200);
  //   } catch (error) {
  //     console.log('에러 확인: ', error);
  //   }
  // };

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await userCheckApi();
        console.log('공통 라우터에서 response확인: ', response);
        console.log('공통 라우터에서 상태 코드 확인: ', response.status);
        setStatusCode(response.status);
        // setIsAuthorized(response.status === 200);
      } catch (error) {
        console.log('에러 확인: ', error);
      }
    };

    checkAuthorization();
    console.log('유즈 이펙트 돌때마다 체크: ', statusCode);
  }, [statusCode]); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  console.log('밖에서 상태코드 체크: ', statusCode);
  return (
    <Routes>
      <Route>
        {/* 최초 진입시 권한 확인이 되지 않으면 /landing으로 이동 */}
        {/* {statusCode === 401 && (
          <Route path="/" element={<Navigate to="/landing" replace />} />
        )} */}

        <Route
          path="/"
          element={
            statusCode === 200 ? (
              <Navigate to="/submit-form" replace />
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />

        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/registerurl" element={<RegisterURL />}></Route>
      </Route>
    </Routes>
  );
}

export default CommonRouter;
