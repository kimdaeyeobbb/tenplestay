import CommonRouter from './routes/CommonRouter';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PcOnlyModal from './components/ui/modal/PcOnlyModal';
import { Helmet } from 'react-helmet';

function App() {
  const [isPc, setIsPc] = useState(true);

  useEffect(() => {
    // 윈도우 크기가 변경될 때마다 모바일 여부를 체크
    const handleResize = () => {
      const mobileThreshold = 1280; // 모바일로 간주할 기준값
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

  // 미리보기 이미지 및 내용을 설정
  const ogImage = '/preview.png';
  const ogTitle = '공지드롭';
  const ogDescription =
    '매번 찾아봐야했던 공지사항들, 찾지 않아도 알려주는 공지사항 알림 서비스';

  return (
    <BrowserRouter>
      {/* React Helmet을 사용하여 head 태그에 OG 태그 추가 */}
      <Helmet>
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        {/* 기타 OG 태그들을 필요에 따라 추가 */}
      </Helmet>

      <MainLayout>
        {/* router가 있는 위치 */}
        {/* MainLayout의 children 자리에 들어가게 됨 */}
        <CommonRouter />
        {/* PC가 아닌 경우에만 모달 표시 */}
        {/* 페이지 로딩 시에 미리보기 이미지가 보이도록 설정 */}
        {isPc && (
          <>
            <PcOnlyModal />
            <div style={{ display: 'none' }}>
              {/* 페이지 로딩 시에 미리보기 이미지가 보이도록 설정 */}
              <img src={ogImage} alt="OG Image" />
            </div>
          </>
        )}
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
