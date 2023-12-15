import { useEffect } from "react";
import styled from "styled-components";
import { fetchAllScrapingUrl } from "../../apis/scrapingUrlApis";

const Wrapper = styled.div`
  width: 100%;
  background-color: #101013;
  color: white;
  display: flex;
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

const ScrapingUrlWrapper = styled.div`
  
`;

const Dashboard = () => {

  const getAllScrapingUrl = async () => {
    const { data: { data: { results } } } = await fetchAllScrapingUrl();
    console.log(results);
  }

  useEffect(() => {
    getAllScrapingUrl();
  }, []);

  return (
    <Wrapper>
      <Title>등록된 링크</Title>
      <ScrapingUrlWrapper>

      </ScrapingUrlWrapper>
    </Wrapper>
  );
};

export default Dashboard;
