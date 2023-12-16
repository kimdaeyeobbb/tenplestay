const ClovaHeader = () => {
  return (
    <div className="justify-center items-center gap-1 inline-flex">
      <div className="w-6 h-6 relative">
        <img className="absolute" src="/assets/images/icon/clova.svg" />
      </div>
      <div className="text-white text-base font-normal font-['SUIT'] leading-7 tracking-tight">
        클로바가 추천하는 단어입니다.
      </div>
      <div>
        <span className="text-indigo-400 text-sm font-bold font-['SUIT'] leading-snug tracking-wide">
          *{' '}
        </span>
        <span className="text-slate-400 text-sm font-bold font-['SUIT'] leading-snug tracking-wide">
          선택사항{' '}
        </span>
      </div>
    </div>
  );
};

export default ClovaHeader;
