import React, { useState } from 'react';

interface ModalProps {
  closeModal: () => void;
  isCheckedKakao: boolean;
  isCheckedEmail: boolean;
  toggleKakao: () => void;
  toggleEmail: () => void;
}

const Modal: React.FC<ModalProps> = ({
  closeModal,
  isCheckedKakao,
  isCheckedEmail,
  toggleKakao,
  toggleEmail,
}) => {
  /* 로딩스피너 */

  /* 키워드 예외처리 */
  const [keyword, setKeyword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);

    // 입력된 키워드의 길이를 검증
    if (newKeyword.length > 5) {
      setError(true);
    } else {
      setError(false);
    }
  };

  /* 안내 받을 수단 선택 */
  const checkedRadioPath = '/public/assets/images/button/radio_checked.png';
  const uncheckedRadioPath = '/public/assets/images/button/radio_unchecked.png';

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-grayscale-700 px-12 pb-16 rounded-xl">
        {/* 버튼 이외의 영역 */}
        <article className="w-[558px]">
          <section className="border-b border-gray-400 flex pt-10 pb-6 justify-between items-center text-white">
            <div className="text-2xl font-semibold">알림 받을 사이트 등록</div>
            <div className=" justify-center items-center flex">
              <button className="close" onClick={closeModal}>
                <img src="/public/assets/images/icon/x.png" alt="Placeholder" />
              </button>
            </div>
          </section>
          {/* 사이트 URL 및 키워드 입력  */}
          <section className="self-stretch h-[260px] mt-12 flex-col justify-start items-start gap-8 flex">
            {/* 사이트 URL */}
            <div className="self-stretch h-24 flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch text-slate-50 text-xl font-semibold font-['SUIT'] leading-7">
                사이트 URL
              </div>
              <div className="self-stretch justify-start items-end gap-[17px] inline-flex relative">
                <div className="grow shrink basis-0 h-[52px] py-3 bg-slate-600 rounded-lg justify-start items-center flex relative">
                  <input
                    type="text"
                    placeholder="http://example.com"
                    className="grow shrink basis-0 px-4 py-3 rounded-lg justify-start items-center flex text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight"
                  />
                  {/* 로딩 스니퍼 */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <i className="loader animate-around border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600 relative inline-block" />
                  </div>
                </div>
                <div className="">
                  <button className="w-24 h-[52px] self-stretch px-3 py-2 bg-slate-800 rounded-lg justify-center items-center flex text-white text-base font-normal font-['SUIT']">
                    등록
                  </button>
                </div>
              </div>
            </div>

            {/* 키워드 입력 */}
            <div className="self-stretch h-[132px] flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch justify-start items-end gap-2 inline-flex">
                <div className="text-slate-50 text-xl font-semibold font-['SUIT'] leading-7">
                  키워드 입력
                </div>
                <div>
                  <span className="text-indigo-400 text-base font-bold font-['SUIT'] leading-7 tracking-wide">
                    *{' '}
                  </span>
                  <span className="text-slate-400 text-base font-bold font-['SUIT'] leading-7 tracking-wide">
                    선택사항
                  </span>
                </div>
              </div>

              <div
                className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex  ${
                  error ? 'border border-error-primary' : ''
                }`}
              >
                <input
                  type="text"
                  placeholder="5글자 이내 키워드"
                  value={keyword}
                  onChange={handleInputChange}
                  className={`grow self-stretch px-4 py-3 rounded-lg basis-0 text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight`}
                />
              </div>

              {error && (
                <div
                  className={`self-stretch ${
                    error ? 'text-error-primary' : 'text-slate-400'
                  } 
                     text-sm font-normal font-['SUIT'] leading-normal tracking-tight`}
                >
                  최대 5개의 키워드까지 등록됩니다.
                </div>
              )}
            </div>
            <div>테스트입력</div>
          </section>

          {/* 안내 받을 수단 선택   */}
          <section className="self-stretch h-[88px] flex-col justify-start items-start gap-8 flex">
            <div className="self-stretch text-slate-50 text-xl font-semibold font-['SUIT'] leading-7">
              안내 받을 수단 선택
            </div>
            <div className="self-stretch justify-start items-start gap-12 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-center items-start gap-4 inline-flex">
                <div
                  className={`justify-start items-center gap-4 inline-flex cursor-pointer ${
                    isCheckedKakao ? 'text-indigo-600' : 'text-slate-300'
                  }`}
                  onClick={toggleKakao}
                >
                  <img
                    className="w-6 h-6 rounded-full "
                    src={isCheckedKakao ? checkedRadioPath : uncheckedRadioPath}
                    alt="Kakao"
                  />
                  <div className="text-lg font-medium font-['SUIT'] leading-7 tracking-tight">
                    카카오톡 수신
                  </div>
                </div>
                <div className="self-stretch px-4 py-3 bg-slate-600 rounded-lg justify-start items-center inline-flex">
                  <div className="text-slate-400 text-base font-normal font-['SUIT'] leading-7 tracking-tight">
                    010 0000 0000
                  </div>
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-center items-start gap-4 inline-flex">
                <div
                  className={`w-[167.67px] h-7 justify-start items-center gap-4 inline-flex cursor-pointer ${
                    isCheckedEmail ? 'text-indigo-600' : 'text-slate-300'
                  }`}
                  onClick={toggleEmail}
                >
                  <img
                    className="w-6 h-6 rounded-full"
                    src={
                      isCheckedEmail
                        ? '/src/assets/images/button/radio_checked.png'
                        : '/src/assets/images/button/radio_unchecked.png'
                    }
                    alt="Email"
                  />
                  <div className="text-lg font-medium font-['SUIT'] leading-7 tracking-tight">
                    E-Mail 수신
                  </div>
                </div>
                <div className="self-stretch px-4 py-3 opacity-40 bg-slate-600 rounded-lg justify-start items-center inline-flex">
                  <div className="text-slate-400 text-base font-normal font-['SUIT'] leading-7 tracking-tight">
                    abcd@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* 버튼 */}
        <div className="self-stretch flex-col justify-center items-center gap-2.5 flex">
          <div className="w-[260px] h-[60px] px-3 py-2 bg-indigo-600 rounded-full justify-center items-center gap-2 inline-flex">
            <button
              className="text-white text-2xl font-bold font-['SUIT'] leading-9 close"
              onClick={closeModal}
            >
              링크 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterURL: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isCheckedKakao, setIsCheckedKakao] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);

  const toggleKakao = () => {
    setIsCheckedKakao(!isCheckedKakao);
  };

  const toggleEmail = () => {
    setIsCheckedEmail(!isCheckedEmail);
  };

  return (
    <section>
      <h1>URL 등록 페이지</h1>
      {/* 구글 로그인 버튼 */}
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
      </div>

      {/* 모달 열기 버튼 */}
      <button onClick={openModal}>모달 열기</button>

      {modalOpen && (
        <Modal
          closeModal={closeModal}
          isCheckedKakao={isCheckedKakao}
          isCheckedEmail={isCheckedEmail}
          toggleKakao={toggleKakao}
          toggleEmail={toggleEmail}
        />
      )}
    </section>
  );
};

export default RegisterURL;
