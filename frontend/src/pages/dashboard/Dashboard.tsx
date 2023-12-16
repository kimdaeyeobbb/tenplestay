import { useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import { fetchAllScrapingUrl } from "../../apis/scrapingUrlApis";

interface ScrapingUrl {
  id: number;
  lastScrapingLog: string | null;
  website: string;
  websiteName: string;
  websiteFavicon: string;
  keywords: string;
  isStatic: boolean;
  isActivate: boolean;
  phoneNumber: string | null;
  scrapingGroup: number;
  user: number;
  mainNotiPlatform: number | null;
  subNotiPlatform: number | null;
  createdAt: string;
  updatedAt: string;
}


const Wrapper = styled.div`
  width: 100%;
  background-color: #101013;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 60px;
  margin-left: 50px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 52px;
  letter-spacing: -0.6px;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
`;

const TableRow = styled.tr`
  & > th:nth-child(1), & > td:nth-child(1) {
    width: 36px;
    max-width: 36px;
    
    text-align: center;
  }

  & > th:nth-child(2), & > td:nth-child(2) {
    width: 200px;
    max-width: 200px;
  }

  & > td:last-child > div {
    display: flex;
    width: 40px;
    max-width: 40px;
    gap: 20px;
  }
`;

const TableHeader = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: white;
  border-bottom: 1px solid var(--GrayScale-800, #1E293B);
  width: 100px;
  max-width: 100px;
  height: 64px;
  max-height: 64px;
  overflow: scroll;
  word-break: break-all;
  text-align: center;
`;

const TableCheckBox = styled.input`
  border-bottom: 1px solid var(--GrayScale-900, #0A0A0D);
  background: var(--GrayScale-800, #1E293B);
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid var(--GrayScale-800, #1E293B);
  width: 100px;
  max-width: 100px;
  height: 64px;
  max-height: 64px;
  word-break: break-all;
  text-align: center;
  overflow: scroll;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap; // 텍스트가 넘칠 경우 말줄임표로 처리
`;

const TableCellMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & > img {
    width: 36px;
    height: 36px;
    border-radius: var(--Radious-4, 4px);
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
    margin-right: 10px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TableCellSpan = styled.span`
    color: var(--GrayScale-500, #64748B);
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.2px;
`;

const TableKeywordWrapper = styled.div`
  display: flex;
  height: 64px;
  padding: 4px var(--Spacing-24, 24px);
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const TableKeyword = styled.div`
  border-radius: 999999px;
  border: 1px solid var(--GrayScale-500, #64748B);
  padding: 6px 16px 6px 16px;
`;

const TableButton = styled.button`
  border-radius: 999999px;
  background: var(--GrayScale-800, #1E293B);
  padding: 6px 16px 6px 16px;

  &:hover {
    background: var(--brand-primary, #4353FF);
  }
`;

const TableImg = styled.img`
  color: white;
`;


const PaginationWrapper = styled.div`
  margin: 30px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

interface PaginationButtonProps {
  isCurrent: boolean;
}

const PaginationButtonCurrentStyle = css`
  border-radius: var(--Radious-circle, 99999px);
  background: var(--GrayScale-700, #334155);
  width: 32px;
  height: 32px;
  padding: var(--Spacing-0, 0px) 2px;
  color: white;
  font-weight: 800;
`;

const PaginationButton = styled.button<PaginationButtonProps>`
  margin: 10px;
  color: var(--GrayScale-600, #475569);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;

  /* 조건부 스타일 적용 */
  ${props => props.isCurrent && PaginationButtonCurrentStyle}

  &:hover {
    color: white;
  }
`;

const Dashboard = () => {
  const [scrapingUrls, setScrapingUrls] = useState<ScrapingUrl[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null,
  });

  // 문자열로 받은 데이터를 특정 포멧으로 바꾸기
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 받은 url로부터 domain 값만 추출하기
  const getDomain = (url: string) => {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  };

  // 키워드 문자열에서 , 로 분리 및 컴포넌트로 추출
  const renderKeywordComponent = (keyword: string) => {
    if (!keyword || keyword.length <= 0) {
      return <TableKeyword>키워드가 없습니다.</TableKeyword>
    }

    const keyword_list = keyword.split(",")
    let keyword_comps = [];
    for (let i = 0; i < keyword_list.length; i++) {
      keyword_comps.push(
        <TableKeyword>
          {keyword_list[i]}
        </TableKeyword>
      )
    }
    return keyword_comps;
  };

  const getAllScrapingUrl = async (page: number = 1) => {
    const { data: { data } } = await fetchAllScrapingUrl(page);
    setScrapingUrls(data.results);
    setPaginationInfo({
      total: data.total,
      pageSize: data.pageSize,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      next: data.links.next,
      previous: data.links.previous,
    });
  };

  const handlePageChange = async (newPage: number) => {
    await getAllScrapingUrl(newPage);
  };

  // 페이지네이션 버튼 생성
  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= paginationInfo.totalPages; i++) {
      pages.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={paginationInfo.currentPage === i}
          isCurrent={paginationInfo.currentPage === i}
        >
          {i}
        </PaginationButton>
      );
    }
    return pages;
  };


  useEffect(() => {
    getAllScrapingUrl(1);
  }, []);

  return (
    <Wrapper>
      <Title>등록된 링크</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>
              <TableCheckBox type="checkbox" />
            </TableHeader>
            <TableHeader>사이트</TableHeader>
            <TableHeader>키워드</TableHeader>
            <TableHeader>등록일</TableHeader>
            <TableHeader>최근 업데이트</TableHeader>
            <TableHeader>상태</TableHeader>
            <TableHeader> </TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {scrapingUrls.map(url => (
            <TableRow key={url.id}>
              <TableCell>
                <TableCheckBox type="checkbox" />
              </TableCell>
              <TableCell>
                <TableCellMain>
                  <TableImg src={url.websiteFavicon} />
                  <div>
                    <span>{(url.websiteName) ? url.websiteName : getDomain(url.website)}</span>
                    <TableCellSpan>{url.website}</TableCellSpan>
                  </div>
                </TableCellMain>
              </TableCell>
              <TableCell>
                <TableKeywordWrapper>
                  {renderKeywordComponent(url.keywords)}
                </TableKeywordWrapper>
              </TableCell>
              <TableCell>{formatDate(url.createdAt)}</TableCell>
              <TableCell>{formatDate(url.updatedAt)}</TableCell>
              <TableCell>{url.isActivate ? <TableButton>활성상태</TableButton> : <TableButton>비활성상태</TableButton>}</TableCell>
              <TableCell>
                <div>
                  <TableImg src="assets/images/icon/share-2.png" />
                  <TableImg src="assets/images/icon/trash-2.png" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationWrapper>
        <PaginationButton
          onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
          disabled={paginationInfo.currentPage === 1}
          isCurrent={false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M19.3333 22.6666L12.6667 15.9999L19.3333 9.33325" stroke="#CBD5E1" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </PaginationButton>
        {renderPageNumbers()}
        <PaginationButton
          onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
          disabled={paginationInfo.currentPage === paginationInfo.totalPages}
          isCurrent={false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M12.6667 22.6666L19.3333 15.9999L12.6667 9.33325" stroke="#CBD5E1" stroke-width="2.22222" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </PaginationButton>
      </PaginationWrapper>
    </Wrapper>
  );
};

export default Dashboard;
