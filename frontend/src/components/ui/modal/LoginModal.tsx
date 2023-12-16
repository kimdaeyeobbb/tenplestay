import React, { useEffect } from 'react';
import styled from "styled-components";
import { getGoogleAuthURL } from '../../../apis/googleLogin';
import { oauthApicallByCode } from '../../../apis/oauthApicallByCode';

// Props 타입 정의
interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--Radious-12, 12px);
  border: 1px solid var(--GrayScale-700, #334155);
  background: var(--GrayScale-700, #334155);
  width: 420px;
  height: 400px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Span = styled.span`
  color: var(--GrayScale-200, #E2E8F0);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 155.556% */
  letter-spacing: 0.2px;
  margin: 40px;
`;

const LoginButton = styled.div`
  border-radius: var(--Radious-4, 4px);
  background: var(--GrayScale-white, #FFF);
  width: 300px;

  & > button:first-child {
    width: 100%;
    display: flex;
    height: 52px;
    padding: 14px var(--Spacing-16, 16px);
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  & > button:hover {
    background: #E2E8F0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    color: #ddd; // 호버 시 색상 변경
  }
`;


const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const handleGoogleLogin = () => {
    const authURL = getGoogleAuthURL();
    window.location.href = authURL;
    console.log('URL 확인: ', authURL);
  };

  const login = async () => {
    // URL에서 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    // console.log('로그인시 url 추출: ', urlParams);

    const code = urlParams.get('code');
    // console.log('로그인시 code 확인: ', code);
    if (code) {
      const response = await oauthApicallByCode(code);
      console.log('구글 로그인시 response 확인: ', response);
      // 여기까지 오면 성공한거, home으로 보내던가 여기 그대로 두던가 선택
    }
  };

  useEffect(() => {
    login();
  }, []);


  return (
    <Wrapper>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>
          <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M20.3735 21.3052C20.8973 21.392 21.4539 21.2334 21.8579 20.8293L24.2159 18.4714C24.2194 18.4678 24.223 18.4642 24.2265 18.4607L32.466 10.2212C33.1311 9.55602 33.1311 8.47758 32.466 7.81241L30.108 5.45443C29.4428 4.78926 28.3644 4.78926 27.6992 5.45443L20.6535 12.5002L13.6077 5.45444C12.9426 4.78927 11.8641 4.78927 11.199 5.45444L8.84098 7.81242C8.17582 8.47759 8.17582 9.55604 8.84099 10.2212L17.082 18.4622C17.085 18.4652 17.088 18.4683 17.0911 18.4714L19.449 20.8293C19.7102 21.0905 20.035 21.2491 20.3735 21.3052Z" fill="white" />
            <path opacity="0.35" fill-rule="evenodd" clip-rule="evenodd" d="M20.9435 25.3919C21.2784 25.3343 21.5994 25.1763 21.8579 24.9177L24.2159 22.5597C24.2189 22.5568 24.2218 22.5538 24.2248 22.5508L32.466 14.3096C33.1312 13.6444 33.1312 12.566 32.466 11.9008L30.108 9.54282C29.4428 8.87766 28.3644 8.87766 27.6992 9.54282L20.6535 16.5885L13.6078 9.54281C12.9426 8.87764 11.8641 8.87764 11.199 9.54281L8.841 11.9008C8.17583 12.566 8.17583 13.6444 8.841 14.3096L17.0803 22.5489C17.0839 22.5525 17.0875 22.5561 17.0911 22.5597L19.4491 24.9177C19.8557 25.3244 20.4168 25.4824 20.9435 25.3919Z" fill="white" />
            <path opacity="0.65" fill-rule="evenodd" clip-rule="evenodd" d="M21.7802 29.006C21.8067 28.9825 21.8326 28.9582 21.8579 28.9328L24.2159 26.5748C24.2171 26.5737 24.2182 26.5726 24.2193 26.5714L32.466 18.3247C33.1312 17.6596 33.1312 16.5811 32.466 15.916L30.108 13.558C29.4429 12.8928 28.3644 12.8928 27.6992 13.558L20.6536 20.6037L13.6078 13.5579C12.9426 12.8927 11.8642 12.8927 11.199 13.5579L8.84103 15.9159C8.17586 16.5811 8.17586 17.6595 8.84103 18.3247L17.0776 26.5613C17.0821 26.5659 17.0866 26.5704 17.0911 26.5749L19.4491 28.9329C20.0889 29.5727 21.1112 29.5971 21.7802 29.006Z" fill="white" />
            <g filter="url(#filter0_d_567_3836)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5416 33.2702C21.6542 33.2013 21.7605 33.1182 21.8579 33.0207L24.2159 30.6627C24.218 30.6607 24.22 30.6586 24.222 30.6566L32.466 22.4126C33.1312 21.7475 33.1312 20.669 32.466 20.0038L30.108 17.6459C29.4429 16.9807 28.3644 16.9807 27.6992 17.6459L20.6535 24.6916L13.6078 17.6458C12.9426 16.9806 11.8642 16.9806 11.199 17.6458L8.84102 20.0038C8.17585 20.669 8.17585 21.7474 8.84102 22.4126L17.0785 30.6501C17.0827 30.6543 17.0869 30.6586 17.0911 30.6628L19.4491 33.0208C20.0168 33.5885 20.8856 33.6717 21.5416 33.2702Z" fill="white" />
            </g>
            <defs>
              <filter id="filter0_d_567_3836" x="4.25444" y="13.0591" width="32.7982" height="24.5482" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.04392" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_3836" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_3836" result="shape" />
              </filter>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="112" height="28" viewBox="0 0 112 28" fill="none">
            <path d="M86.4014 12.88H96.1614V11.472H86.4014V4.62404H106.049V3.50404H86.4014V0.592041H111.329V7.50404H91.6814V8.62404H111.329V11.472H101.569V12.88H111.329V16.4H86.4014V12.88ZM91.8414 17.296V18.736H105.889V17.296H111.329V27.408H86.4014V17.296H91.8414ZM105.889 23.728V22.448H91.8414V23.728H105.889Z" fill="white" />
            <path d="M82.0456 18H58.3976V0.592041H82.0456V4.30404H63.8376V14.288H82.0456V18ZM58.0776 23.696H82.3656V27.408H58.0776V23.696Z" fill="white" />
            <path d="M39.2258 14.288C39.2258 14.9494 39.3965 15.6 39.7378 16.24C40.1005 16.88 40.5378 17.4774 41.0498 18.032C41.5618 18.5867 42.1058 19.088 42.6818 19.536C43.2578 19.9627 43.7698 20.304 44.2178 20.56V26.768C42.7245 26.0214 41.3272 25.1467 40.0258 24.144C38.7245 23.1627 37.5618 22 36.5378 20.656C35.5138 22 34.3512 23.1627 33.0498 24.144C31.7485 25.1467 30.3618 26.0214 28.8898 26.768V20.56C29.3378 20.304 29.8498 19.9627 30.4258 19.536C31.0018 19.088 31.5458 18.5867 32.0578 18.032C32.5698 17.4774 32.9965 16.88 33.3378 16.24C33.7005 15.6 33.8818 14.9494 33.8818 14.288V4.27204H28.5698V0.592041H44.5378V4.27204H39.2258V14.288ZM47.8978 0.592041H53.3378V27.408H47.8978V0.592041Z" fill="white" />
            <path d="M25.3982 22.64C25.3982 23.6427 25.2489 24.4534 24.9502 25.072C24.6516 25.6907 24.2249 26.1707 23.6702 26.512C23.1369 26.8534 22.4969 27.088 21.7502 27.216C21.0249 27.344 20.2249 27.408 19.3502 27.408H6.48622C5.61155 27.408 4.81155 27.344 4.08622 27.216C3.36088 27.088 2.72088 26.8534 2.16621 26.512C1.63288 26.1707 1.21688 25.6907 0.918215 25.072C0.619548 24.4534 0.470215 23.6427 0.470215 22.64C0.470215 21.6587 0.619548 20.8587 0.918215 20.24C1.21688 19.6 1.63288 19.1094 2.16621 18.768C2.72088 18.4267 3.36088 18.192 4.08622 18.064C4.81155 17.936 5.61155 17.872 6.48622 17.872H19.3502C20.2249 17.872 21.0249 17.936 21.7502 18.064C22.4969 18.192 23.1369 18.4267 23.6702 18.768C24.2249 19.1094 24.6516 19.6 24.9502 20.24C25.2489 20.8587 25.3982 21.6587 25.3982 22.64ZM0.470215 0.592041H25.3982V10.352H19.9582V4.30404H0.470215V0.592041ZM0.470215 11.696H8.63021V7.15204H14.0382V11.696H25.3982V15.408H0.470215V11.696ZM5.91021 22.64C5.91021 23.0667 6.00622 23.344 6.19822 23.472C6.41155 23.6214 6.72088 23.696 7.12622 23.696H18.7102C19.1369 23.696 19.4462 23.6214 19.6382 23.472C19.8515 23.344 19.9582 23.0667 19.9582 22.64C19.9582 22.2134 19.8515 21.936 19.6382 21.808C19.4462 21.6587 19.1369 21.584 18.7102 21.584H7.12622C6.72088 21.584 6.41155 21.6587 6.19822 21.808C6.00622 21.936 5.91021 22.2134 5.91021 22.64Z" fill="white" />
          </svg>
        </Title>
        <Span>
          매번 하나하나 찾아보기 힘들던 공지사항, <br />
          찾지 말고 알림톡으로 받으세요
        </Span>
        <LoginButton>
          <button onClick={handleGoogleLogin}>
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>구글 계정으로 로그인</span>
          </button>
        </LoginButton>
      </ModalContent>
    </Wrapper>
  );
};

export default LoginModal;
