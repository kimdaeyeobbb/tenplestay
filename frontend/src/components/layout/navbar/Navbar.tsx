import { useState } from 'react';

const Navbar = () => {
  const numberOfItems = 2; // 항목의 개수

  const [hoveredItems, setHoveredItems] = useState(
    new Array(numberOfItems).fill(false),
  ); // hover되는 대상 개수

  const handleMouseEnter = (index: number) => {
    setHoveredItems((prev) => {
      const newHoveredItems = [...prev];
      newHoveredItems[index] = true;
      return newHoveredItems;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredItems((prev) => {
      const newHoveredItems = [...prev];
      newHoveredItems[index] = false;
      return newHoveredItems;
    });
  };

  const renderItem = (index: number, text: string) => (
    <li
      className="group w-full "
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
      key={index}
    >
      <a
        href="#"
        className={`flex items-center  text-grayscale-400 text-2xl px-4 py-6 rounded-lg ${
          hoveredItems[index] ? 'hover:bg-grayscale-800 hover:text-white' : ''
        }`}
      >
        <img
          src={`public/assets/images/icon/${
            hoveredItems[index] ? 'link_white' : 'link_gray'
          }.png`}
          alt="링크 이미지"
        />
        <div>
          <span className="mx-4 my-6">{text}</span>
        </div>
      </a>
    </li>
  );

  return (
    <nav className="min-w-[16.66667%] border-r border-brand-dark ">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-3 font-medium">
          {renderItem(0, '링크 리스트')}
          {renderItem(1, '서비스 소개')}
          {/* 추가적인 항목이 있다면 여기에 renderItem을 추가하면 됩니다 */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// useState를 통해 hover 여부로 상태 관리
// onMouseEnter와 onMouseLeaver 이벤트를 사용해서 hover 여부에 따라 클래스를 추가하거나 제거함
// 해당 이벤트들은 li 요소에 직접 바인딩하는 대신에 li 요소 안에 위치한 a 태그에 이벤트를 바인딩하도록 수정하면 사이드바 전체에 hover되는 것이 아니라 해당 li 태그의 요소에 hover됨
