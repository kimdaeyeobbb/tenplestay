import React from 'react';
import styled from "styled-components";


const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--Radious-12, 12px);
  border: 1px solid var(--GrayScale-700, #334155);
  background: var(--GrayScale-700, #334155);
  width: 200px;
  height: 180px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  & > p {
    font-size: 18px;
    margin-bottom: 10px;
  }

  & > div {
    display: flex;
    gap: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    color: #ddd; // 호버 시 색상 변경
  }
`;

const ConfirmButton = styled.button`
  background: rgba(67, 83, 255, 0.5);
  border-radius: 20px;
  padding: 10px;
  &:hover {
    background: var(--brand-primary, #4353FF);
  }
`;

const CancleButton = styled.button`
  background: var(--GrayScale-800, rgba(30, 41, 59, 0.5));
  border-radius: 20px;
  padding: 10px;
  &:hover {
    background: var(--GrayScale-800, rgb(30, 41, 59));
  }
`;


interface ConfirmModalProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onConfirm, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <Wrapper>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <p>삭제하시겠습니까?</p>
        <div>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
          <CancleButton onClick={onClose}>취소</CancleButton>
        </div>
      </ModalContent>
    </Wrapper>
  );
}