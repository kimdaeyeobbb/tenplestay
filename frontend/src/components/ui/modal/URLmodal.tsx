import { SetStateAction, useEffect, useState } from 'react';
import { postURL } from '../../../apis/scraping/postURL';
import LoadingSpinner from '../../../pages/registerURL/LoadingSpinner';
import RegisterKeyword from '../../../pages/registerURL/RegisterKeyword';
import ClovaArea from '../../../pages/registerURL/ClovaArea';

interface ModalProps {
  closeModal: () => void;
  isCheckedKakao: boolean;
  isCheckedEmail: boolean;
  toggleKakao: () => void;
  toggleEmail: () => void;
}

const URLmodal: React.FC<ModalProps> = ({
  closeModal,
  isCheckedKakao,
  isCheckedEmail,
  toggleKakao,
  toggleEmail,
}) => {
  /* 로딩스피너 */
  const [loading, setLoading] = useState(false);

  /* URL 등록 후 API 호출 */
  const [inputURL, setInputURL] = useState('');
  function onChangeURL(event: { target: { value: SetStateAction<string> } }) {
    setInputURL(event.target.value);
  }

  const [clovaKeywords, setClovaKeywords] = useState<string[]>([]);

  const onClickRegisterURL = async () => {
    setLoading(true); // api 호출 전에 true로 변경해서 로딩화면 띄우기
    try {
      const response = await postURL(inputURL);
      // console.log('URL 등록후 response: ', response);
      // console.log(
      //   'url 등록 후 response 중 필요한 데이터 : ',
      //   response.data.data.result,
      // );
      const { summarization, tokens } = response.data.data.result;
      console.log('URL 등록 후 요약본: ', summarization);
      console.log('URL 등록 후 키워드: ', tokens);

      // tokens 배열을 사용하여 화면에 키워드를 노출
      if (tokens && tokens.length > 0) {
        const keywords = tokens.map(([keyword]: string) => keyword);
        setClovaKeywords(keywords);
        console.log('키워드들: ', keywords);
        // 여기에서 키워드를 사용하여 원하는 방식으로 화면에 노출
      }

      setLoading(false); // api 호출 완료시 false로 변경해서 로딩화면 숨김
      return response;
    } catch (error) {
      console.log('URL 등록시 에러: ', error);
    }
  };

  useEffect(() => {
    console.log('input에 넣는 URL 확인: ', inputURL);
  });

  /* 키워드 예외처리 */
  const [keyword, setKeyword] = useState<string>('');

  const [error, setError] = useState<boolean>(false);
  // const [cellphoneError, setCellphoneError] = useState<boolean>(false);
  // const [emailError, setEmailError] = useState<boolean>(false);

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

  /* 키워드 추가 */
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);

  const addItem = () => {
    if (
      items.length < 3 &&
      keyword.length <= 5 &&
      !items.some((item) => item.text === keyword)
    ) {
      setItems([...items, { id: items.length + 1, text: keyword }]);
      setKeyword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  /* 키워드 삭제 */

  const onDeleteKeyword = (id: any) => {
    setItems(items.filter((item) => item.id !== id));
  };

  /* 클로바 추천 키워드 컨트롤 */
  const handleClovaKeywordClick = (clickedKeyword: string) => {
    // 네이버 클로바가 추천한 키워드를 클릭한 이후에 일어나기를 원하는 동작을 기술
    console.log('클릭된 키워드: ', clickedKeyword);
  };

  /* 안내 받을 수단 선택 */
  const checkedRadioPath = 'assets/images/button/radio_checked.png';
  const uncheckedRadioPath = 'assets/images/button/radio_unchecked.png';

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-grayscale-700 px-12 pb-8 rounded-xl">
        {/* 버튼 이외의 영역 */}
        <article className="w-[558px]">
          <section className="border-b border-gray-400 flex pt-10 pb-6 justify-between items-center text-white">
            <div className="text-2xl font-semibold">알림 받을 사이트 등록</div>
            <div className=" justify-center items-center flex">
              <button className="close" onClick={closeModal}>
                <img src="assets/images/icon/x.png" alt="Placeholder" />
              </button>
            </div>
          </section>
          {/* 사이트 URL 및 키워드 입력  */}
          <section className="self-stretch h-56 mt-8 flex-col justify-start items-start gap-8 flex">
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
                    onChange={onChangeURL}
                    className="grow shrink basis-0 px-4 py-3 rounded-lg justify-start items-center flex text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight"
                    disabled={loading}
                  />
                  {/* 로딩 스니퍼 */}
                  {loading && <LoadingSpinner />}
                </div>
                <div className="">
                  <button
                    onClick={onClickRegisterURL}
                    disabled={loading}
                    className="w-24 h-[52px] self-stretch px-3 py-2 bg-slate-800 rounded-lg justify-center items-center flex text-white text-base font-normal font-['SUIT']"
                  >
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
                  최대 3개의 키워드까지 등록됩니다.
                </div>
              )}
            </div>
          </section>

          {/* 키워드 등록 */}
          <RegisterKeyword items={items} onDeleteKeyword={onDeleteKeyword} />
          <button onClick={addItem}>키워드 추가</button>

          {/* 클로바가 추천한 키워드 */}
          <ClovaArea
            keywords={clovaKeywords}
            onClickKeyword={handleClovaKeywordClick}
          />
          {/* 안내 받을 수단 선택   */}
          <section className="self-stretch h-20 flex-col justify-start items-start gap-4 flex">
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
                    문자메시지 수신
                  </div>
                </div>

                {/* 핸드폰 번호 입력 필드 */}
                {/* <div
                  className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex  ${
                    cellphoneError ? 'border border-error-primary' : ''
                  }`}
                > */}
                <div
                  className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex`}
                >
                  <input
                    type="text"
                    placeholder="010-0000-0000"
                    className={`grow self-stretch px-4 py-3 rounded-lg basis-0 text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight`}
                  />
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

                {/* 이메일 input 영역 */}
                {/* <div
                  className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex  ${
                    emailError ? 'border border-error-primary' : ''
                  }`}
                > */}
                <div
                  className={`self-stretch h-[52px] bg-slate-600 rounded-lg justify-start items-center inline-flex`}
                >
                  <input
                    type="email"
                    placeholder="abcd@gmail.com"
                    className={`grow self-stretch px-4 py-3 rounded-lg basis-0 text-slate-400 bg-slate-600 text-lg font-medium font-['SUIT'] leading-7 tracking-tight`}
                  />
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* 버튼 */}
        <div className="self-stretch flex-col justify-center items-center gap-2.5 flex mt-24">
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

export default URLmodal;
