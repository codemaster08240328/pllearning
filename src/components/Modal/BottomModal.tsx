import React from 'react';
import { IModalProps } from './types';

import './styles.scss';

const BottomModal: React.FC<IModalProps> = ({ children }) => {
  return (
    <>
      <div className="mmk-modal-back" />
      <div className="mmk-modal-bottom-content">{children}</div>
    </>
  );
};

export default BottomModal;
