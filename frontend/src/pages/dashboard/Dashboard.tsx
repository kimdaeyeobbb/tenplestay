import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllScrapingUrl } from "../../apis/scrapingUrlApis";

interface ScrapingUrl {
  id: number;
  lastScrapingLog: string | null;
  website: string;
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

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  > button {
    margin: 10px;
  }
`;

const Title = styled.h1`
  margin-top: 60px;
  margin-left: 50px;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
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
    width: 150px;
    max-width: 150px;
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
  overflow: scroll;
  word-break: break-all;
  text-align: center;
`;

const TableButton = styled.button`
  border-radius: 999999px;
  background: var(--GrayScale-800, #1E293B);
  padding: 6px 16px 6px 16px;
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


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
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
        <button key={i} onClick={() => handlePageChange(i)} disabled={paginationInfo.currentPage === i}>
          {i}
        </button>
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
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {scrapingUrls.map(url => (
            <TableRow key={url.id}>
              <TableCell>
                <TableCheckBox type="checkbox" />
              </TableCell>
              <TableCell>{url.website}</TableCell>
              <TableCell>{url.keywords}</TableCell>
              <TableCell>{formatDate(url.createdAt)}</TableCell>
              <TableCell>{formatDate(url.updatedAt)}</TableCell>
              <TableCell>{url.isActivate ? <TableButton>활성상태</TableButton> : <TableButton>비활성상태</TableButton>}</TableCell>
              <TableCell><button>삭제</button></TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationWrapper>
        <button
          onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
          disabled={paginationInfo.currentPage === 1}>
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
          disabled={paginationInfo.currentPage === paginationInfo.totalPages}>
          &gt;
        </button>
      </PaginationWrapper>
    </Wrapper>
  );
};

export default Dashboard;
