const Footer = () => {
  return (
    <footer className="footer flex-col p-10 border-t border-brand-dark py-8 px-6 text-grayscale-500">
      <div className="space-y-16">
        <div className="flex">
          <aside className="w-1/2">
            <div className="mb-8 md:mb-0 md:mr-4 text-center md:text-left">
              <div className="text-xl font-semibold leading-7 mb-2">
                Check our Notion
              </div>
              <div className=" text-base">텐플스테이 노션</div>
            </div>
          </aside>
          <nav className="space-y-2.5 text-grayscale-500">
            <header className="footer-title text-xl ">MAKERS</header>
            <div className="flex text-base space-x-11">
              <a>MAKERS</a>
              <a>MAKERS</a>
              <a>MAKERS</a>
              <a>MAKERS</a>
            </div>
          </nav>
        </div>
        <div className="text-base">@2023 tenplestay.all rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
