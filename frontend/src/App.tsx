import CommonRouter from './routes/CommonRouter';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PcOnlyModal from './components/ui/modal/PcOnlyModal';

function App() {
  const [isPc, setIsPc] = useState(true);

  useEffect(() => {
    // 윈도우 크기가 변경될 때마다 모바일 여부를 체크
    const handleResize = () => {
      const mobileThreshold = 1020; // 모바일로 간주할 기준값
      setIsPc(window.innerWidth < mobileThreshold);
    };

    // 페이지 로드 시 초기 체크
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        {/* router가 있는 위치 */}
        {/* MainLayout의 children 자리에 들어가게 됨 */}
        <CommonRouter />
        {/* PC가 아닌 경우에만 모달 표시 */}
        {isPc && <PcOnlyModal />}
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
