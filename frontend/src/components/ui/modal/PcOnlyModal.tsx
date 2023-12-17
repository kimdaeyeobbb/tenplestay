const PcOnlyModal = () => {
  return (
    <div className="bg-grayscale-800 bg-opacity-100 fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="px-12 pb-8 rounded-xl ">
        <div className="flex items-center justify-center pb-4">
          <img className="" src="assets/images/icon/pconly.svg" />
        </div>
        <div className="flex-col justify-start items-center gap-14 flex">
          <div className="flex-col justify-start items-center gap-3 flex">
            <div className="text-white text-xl font-semibold font-['SUIT'] leading-7">
              공지드롭 서비스 준비중
            </div>
            <div className="text-center text-white text-base font-normal font-['SUIT'] leading-7 tracking-tight">
              <div>보다 더 나은 공지드롭 서비스 경험을 위해 </div>
              <div>서비스를 위해 모바일 페이지를 준비하고 있어요.</div>
              <div>빠른 시일내에 준비하여 찾아뵐게요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcOnlyModal;
