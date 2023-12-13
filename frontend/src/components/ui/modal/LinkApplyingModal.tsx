interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
};

const LinkApplyingModal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        {/* 모달 내용이 들어갈 자리 */}
        <p>로그인을 할 수 있는 내용</p>
        <div className="flex items-center justify-center">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>구글 계정으로 로그인</span>
          </button>
        </div>{' '}
        <div></div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default LinkApplyingModal;
