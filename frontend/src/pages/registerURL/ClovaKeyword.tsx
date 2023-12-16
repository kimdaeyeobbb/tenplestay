interface ClovaKeywordProps {
  keyword: string;
  onClick: () => void;
}

const ClovaKeyword: React.FC<ClovaKeywordProps> = ({ keyword, onClick }) => {
  return (
    <div className="self-stretch justify-start items-start gap-2 inline-flex">
      <div
        className="px-4 py-1.5 rounded-full border border-slate-500 justify-start items-center gap-2 flex"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="w-4 h-4 relative">
          <img className="absolute" src="assets/images/icon/plus.svg" />
        </div>
        <div className="text-white text-base font-normal font-['SUIT'] leading-7 tracking-tight">
          {keyword}
        </div>
      </div>
    </div>
  );
};

export default ClovaKeyword;
