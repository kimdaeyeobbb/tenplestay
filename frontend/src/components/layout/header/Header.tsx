import { useState } from 'react';
import Input from '../../ui/Input';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        {/* 모달 내용이 들어갈 자리 */}
        <p>로그인을 할 수 있는 내용</p>
        <div className="flex items-center justify-center">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>구글 계정으로 로그인</span>
          </button>
        </div>{' '}
        <div></div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <header className="border-b border-brand-dark py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap justify-between items-center gap-x-2 max-lg:gap-y-6">
        <a href="">
          <div className="flex">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-36"
            />
            <div className="text-grayscale-400 pl-4 text-2xl font-semibold leading-9">
              공지드롭
            </div>
          </div>
        </a>
        <button className="lg:hidden ml-auto">
          <svg
            className="w-7 h-7"
            fill="#000"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
        </button>

        <ul className="flex items-center lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:block max-lg:w-full">
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <Input
              type="text"
              label="search"
              value=""
              name=""
              error={false}
              labelTxt={''}
              showSearchIcon={true}
              placeholder="검색어 입력"
            />
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="#"
              className="lg:hover:text-[#007bff] text-grayscale-400 block font-semibold text-[15px]"
            >
              유저 123님
            </a>
          </li>
          <li className="text-[#D9D9D9]">|</li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="#"
              className="lg:hover:text-[#007bff] text-grayscale-400 block font-semibold text-[15px]"
              onClick={() => handleButtonClick('로그인')}
            >
              로그인
            </a>
          </li>
        </ul>
      </div>
      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
