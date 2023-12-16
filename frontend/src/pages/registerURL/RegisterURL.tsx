import React, { useState } from 'react';
import URLmodal from '../../components/ui/modal/URLmodal';

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

      {/* 모달 열기 버튼 */}
      <button onClick={openModal}>URL 등록 모달 열기</button>

      {modalOpen && (
        <URLmodal
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
