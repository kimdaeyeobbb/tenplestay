import { ChangeEvent } from '../../../types/Events';
import Input from '../../ui/Input';

const Header = () => {
  return (
    <header className="border-b border-brand-dark py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap justify-between items-center gap-x-2 max-lg:gap-y-6">
        <a href="javascript:void(0)">
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
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
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
              onChange={function (e: ChangeEvent): void {
                throw new Error('Function not implemented.');
              }}
            />
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-[#007bff] text-grayscale-400 block font-semibold text-[15px]"
            >
              유저 123님
            </a>
          </li>
          <li className="text-[#D9D9D9]">|</li>
          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href="javascript:void(0)"
              className="lg:hover:text-[#007bff] text-grayscale-400 block font-semibold text-[15px]"
            >
              로그아웃
            </a>
          </li>
        </ul>

        {/* input 영역 */}
      </div>
    </header>
  );
};

export default Header;
