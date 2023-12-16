import ClovaHeader from './ClovaHeader';
import ClovaKeyword from './ClovaKeyword';

interface ClovaAreaProps {
  keywords: string[];
  onClickKeyword: (clickedKeyword: string) => void; // Change prop name to onClickKeyword
}

const ClovaArea: React.FC<ClovaAreaProps> = ({ keywords, onClickKeyword }) => {
  return (
    <div className="w-[558px] h-28 flex-col justify-start items-start gap-4 inline-flex">
      <ClovaHeader />
      <div className="flex gap-2">
        {keywords.map((keyword, index) => (
          <ClovaKeyword
            key={index}
            keyword={keyword}
            onClick={() => onClickKeyword(keyword)} // Pass the keyword to the onClick event handler
          />
        ))}
      </div>
    </div>
  );
};

export default ClovaArea;
