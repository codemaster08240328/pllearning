import React from 'react';
import { IModalProps } from './types';

import './styles.scss';

const NormalModal: React.FC<IModalProps> = ({ children }) => {
  return (
    <>
      <div className="mmk-modal-back" />
      <div className="mmk-modal-content">{children}</div>
    </>
  );
};

export default NormalModal;
