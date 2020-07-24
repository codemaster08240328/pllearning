import React from 'react';
import { IProps } from './types';
import { ClipLoader } from 'react-spinners';

import './Button.scss';

const Button: React.FC<IProps> = ({
  type,
  className,
  disabled,
  text,
  onClick,
  loading,
}) => {
  let componentClassName = `mmk-button-wrapper `;
  componentClassName +=
    type === 'primary' || type === undefined ? '' : `${type}-button `;

  if (!!className) {
    componentClassName += className + ' ';
  }

  if (disabled) {
    componentClassName += 'btn-disabled ';
  }

  return (
    <div
      className={componentClassName}
      onClick={!disabled ? onClick : () => {}}
    >
      {text}

      {loading && (
        <div className="ml-5" style={{ display: 'inline-flex' }}>
          <ClipLoader size={15} color="#fff" />
        </div>
      )}
    </div>
  );
};

export default Button;
