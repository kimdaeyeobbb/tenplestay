import StartButton from '../../components/ui/Button/StartButton';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #101013;

  & > section:nth-child(1) {
    height: 320px;
    background-color: rgba(248, 250, 252, 0.05);
  }

`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 80px;
  text-align: center;
  color: var(--GrayScale-white, var(--Color-text-interative-inverse, #FFF)) !important;
  font-family: 'SUIT';
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 52px; /* 130% */
  letter-spacing: -0.6px;
  margin-bottom: 50px;
`;

const SubTitle = styled.h2`
  color: var(--brand-primary, #4353FF);
  text-align: center;
  margin-top: 95px;
  margin-bottom: 55px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 150% */
  letter-spacing: -0.2px;
`;

const DetailTitle = styled.h3`
  color: var(--GrayScale-50, #F8FAFC);
  text-align: center;
  margin: 24px;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 140% */
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;

const DetailSection = styled.div`

`;

const DetailImg = styled.img`

`;

const Span = styled.span`
  color: var(--GrayScale-400, #94A3B8);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 155.556% */
  letter-spacing: 0.2px;
`;


const Landing = () => {
  return (
    <Wrapper>
      <Section>
        <Title>공지 드롭 서비스 소개</Title>
        <Span>매번 하나하나 찾아보기 힘들었던 공지사항, 찾지 말고 알림톡으로 받으세요</Span>
        <Span>공지드롭은 공지사항 링크를 등록하고, 알림받을 키워드를 입력하면 해당 키워드를 포함한 새 공지가 있을 때마다 알려주는 서비스예요!</Span>
      </Section>
      <Section>
        <SubTitle>공지드롭은 이런 기능을 제공하고 있어요</SubTitle>
        <DetailWrapper>
          <DetailSection>
            <DetailImg src='assets/images/landing/landing-detail1.svg' />
            <Span>
              <DetailTitle>공지사항 알림</DetailTitle>
              알림 받을 링크를 추가해두고<br />
              변경될 때 알림을 받으세요!
            </Span>
          </DetailSection>
          <DetailSection>
            <DetailImg src='assets/images/landing/landing-detail2.svg' />
            <Span>
              <DetailTitle>키워드 설정</DetailTitle>
              알림 받을 키워드를 설정하고<br />
              나에게 맞는 알림을 받아보세요!
            </Span>
          </DetailSection>
          <DetailSection>
            <DetailImg src='assets/images/landing/landing-detail3.svg' />
            <Span>
              <DetailTitle>키워드 추천</DetailTitle>
              어떤 키워드로 알림을 받을지<br />
              직접 추천해줄 수 있어요!
            </Span>
          </DetailSection>
          <DetailSection>
            <DetailImg src='assets/images/landing/landing-detail4.svg' />
            <Span>
              <DetailTitle>간편하게 받는 알림</DetailTitle>
              이메일, 알림톡으로<br />
              변경된 정보를 알려드려요!
            </Span>
          </DetailSection>
        </DetailWrapper>
        <StartButton />
      </Section>
    </Wrapper>
  );
};

export default Landing;
