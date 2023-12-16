import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userCheckApi } from '../../../apis/userCheckApi';

import styled from "styled-components";
import LoginModal from '../modal/LoginModal';

const Wrapper = styled.div`
  margin-top: 80px;
  margin-bottom: 140px;
  text-align: center;
`;

const StartButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartClick = async () => {
    try {
      const response = await userCheckApi();
      if (response.status === 200) {
        navigate('/dashboard');
      } else if (response.status === 401) {
        setIsModalOpen(true);
      }
    } catch (error) {
      // 에러 처리
      console.error('에러 발생:', error);
    }
  };

  const handleCloseModal = () => {
    // 모달을 닫습니다.
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <div>
        <button
          className="w-64 h-14 px-3 py-2 bg-indigo-600 rounded-full justify-center items-center gap-2 inline-flex text-white text-[20px]"
          onClick={handleStartClick}
        >
          시작하기
        </button>
      </div>
      <LoginModal show={isModalOpen} onClose={handleCloseModal} />
    </Wrapper>
  );
};

export default StartButton;
