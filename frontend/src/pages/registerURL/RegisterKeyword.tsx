import { useState } from 'react';

interface RegisterKeywordProps {
  items: { id: number; text: string }[];
  onDeleteKeyword: (id: number) => void;
}

const RegisterKeyword: React.FC<RegisterKeywordProps> = ({
  items,
  onDeleteKeyword,
}) => {
  const [keywordToDelete, setKeywordToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setKeywordToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (keywordToDelete !== null) {
      onDeleteKeyword(keywordToDelete);
      setKeywordToDelete(null);
    }
  };

  return (
    <div>
      <div className="w-[558px] my-4 h-10 justify-start items-start gap-2 inline-flex">
        {items.map((item) => (
          <div
            key={item.id}
            className="px-4 py-1 rounded-full border border-slate-500 justify-start items-center gap-2 flex"
          >
            {/* 키워드 삭제 버튼 */}
            <div className="w-4 h-4 relative ite">
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="absolute"
              >
                <img
                  src="../../../public/assets/images/icon/x.svg"
                  alt="Delete Keyword"
                />
              </button>
            </div>

            {/* 키워드명 */}
            <div className="text-white text-base font-normal font-['SUIT'] leading-7 tracking-tight">
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for keyword deletion confirmation */}
      {keywordToDelete !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-grayscale-700 px-4 py-2 rounded-md text-white">
            <p>정말로 삭제하시겠습니까?</p>
            <button onClick={handleConfirmDelete}>확인</button>
            <button onClick={() => setKeywordToDelete(null)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterKeyword;
