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
  width: 420px;
  height: 400px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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


interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <Wrapper>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ModalContent>
    </Wrapper>
  );
}