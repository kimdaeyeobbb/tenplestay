import styled from "styled-components";

const CopyrightWrapper = styled.div`
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <footer className="footer flex-col p-10 border-t border-brand-dark py-8 px-6 text-grayscale-500">
      <div>
        <div className="flex">
          <aside className="w-1/2">
            <div className="mb-8 md:mb-0 md:mr-4 text-center md:text-left">
              <div className="text-xl font-semibold leading-7 mb-2">
                Check our Notion
              </div>
              <div className="flex text-base">
                저희의 협업 이야기를 알고 싶으신가요? 저희의&nbsp;
                <b><a href="https://bit.ly/tenplestay">"노션"</a></b>
                &nbsp;을 방문해보세요
              </div>
            </div>
          </aside>
          <nav className="space-y-2.5 text-grayscale-500">
            <header className="font-semibold text-xl ">Team Tenplestay</header>
            <div className="flex text-base space-x-11">
              <a>정현우</a>
              <a>박한솜</a>
              <a>안재윤</a>
              <a>김대엽</a>
            </div>
          </nav>
        </div>
        <CopyrightWrapper className="text-base">
          &copy;2023 tenplestay.all rights reserved
        </CopyrightWrapper>
      </div>
    </footer>
  );
};

export default Footer;
