import React from 'react';
import { IProps } from './types';
import './styles.scss';

const Input: React.FC<IProps> = ({
  value,
  placeholder,
  onChange,
  leftIcon,
  rightIcon,
  disabled,
  defaultValue,
  error,
  type,
  className: componentClassName,
}) => {
  let className = 'mmk-input-box ';
  if (disabled) {
    className += 'input-disabled ';
  }

  if (error) {
    className += 'mmk-input-error ';
  }

  if (componentClassName) {
    className += componentClassName;
  }

  return (
    <div className={className}>
      {leftIcon && <div className="left-icon">{leftIcon}</div>}
      <input
        className="mmk-input-box-input"
        placeholder={placeholder || ''}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        value={value}
        type={type}
      />
      {rightIcon}
    </div>
  );
};

export default Input;
