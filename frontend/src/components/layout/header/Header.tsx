import { useEffect, useState } from 'react';
import Input from '../../ui/Input';
import LoginModal from '../../ui/modal/LoginModal';
import { userCheckApi } from '../../../apis/userCheckApi';
// import { useState, useEffect } from 'react';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState("");


  const checkAuthorization = async () => {
    try {
      const response = await userCheckApi();
      if (response.status === 200) {
        setLoginStatus(true);
        const { data: { data: { email } } } = response;
        setUserName(email);
      }
    } catch (error) {
      console.log('에러 확인: ', error);
    }
  };

  const handleButtonClick = (text: string) => {
    if (text === '로그아웃') {
      // 로그아웃 클릭 시 로그아웃 처리
      // ... your logout logic ...
    } else if (text === '로그인') {
      // 로그인 클릭 시 모달을 엽니다.
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    // 모달을 닫습니다.
    setIsModalOpen(false);
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <header className="border-b border-brand-dark py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap justify-between items-center gap-x-2 max-lg:gap-y-6">
        <a href="/">
          <div className="flex items-center">
            <img src="assets/images/logo.svg" alt="logo" />
            <div className="text-grayscale-400 text-2xl font-semibold leading-9">
              공지드롭
            </div>
          </div>
        </a>

        <ul className="flex items-center lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:block max-lg:w-full">
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Input
              type="text"
              label="search"
              name=""
              error={false}
              labelTxt={''}
              showSearchIcon={true}
              placeholder="검색어 입력"
            />
          </li>

          {(loginStatus) ?
            (<li className="max-lg:border-b max-lg:py-2 px-3">
              <a
                href="#"
                className="lg:hover:text-[#007bff] text-grayscale-400 block font-semibold text-[15px]"
              >
                {userName}
              </a>
            </li>)
            :
            (<li className="max-lg:border-b max-lg:py-2 px-3">
              <a
                href="#"
                className="lg:hover:text-[#007bff] text-grayscale-400 block font-semibold text-[15px]"
                onClick={() => handleButtonClick('로그인')}
              >
                로그인
              </a>
            </li>)
          }
        </ul>
      </div>
      {/* 모달 */}
      <LoginModal show={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
