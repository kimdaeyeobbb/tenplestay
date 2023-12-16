import React from 'react';
import { userCheckApi } from '../../../apis/userCheckApi';

const StartButton = () => {
  const handleStartClick = async () => {
    try {
      // userCheckApi 호출
      const response = await userCheckApi();
      console.log('response 확인: ', response);

      // 여기에서 응답(response)에 대한 로직을 추가하세요
      if (response.status === 200) {
        // 로그인 성공 시의 동작
        console.log('사용자 로그인 상태 확인: 로그인됨');
      } else if (response.status === 401) {
        // 로그인되지 않은 경우의 동작
        console.log('사용자 로그인 상태 확인: 로그인되지 않음');
      }
    } catch (error) {
      // 에러 처리
      console.error('에러 발생:', error);
    }
  };

  return (
    <div>
      <button
        className="w-64 h-14 px-3 py-2 bg-indigo-600 rounded-full justify-center items-center gap-2 inline-flex text-white text-2xl font-bold"
        onClick={handleStartClick}
      >
        시작하기
      </button>
    </div>
  );
};

export default StartButton;
