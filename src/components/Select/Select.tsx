import React, { useState } from 'react';
import { IProps } from './types';
import _ from 'lodash';

import './styles.scss';
import { ArrowIcon } from '../Icons';

const Select: React.FC<IProps> = ({
  label,
  placeholder,
  options,
  onSelect,
  onChange,
  selectItem,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const selectOption = (value: string, label: string) => {
    setOpen(false);
    onSelect && onSelect({ value, label });
  };

  const inputChange = _.debounce((value) => {
    onChange && onChange(value);
  }, 1000);

  return (
    <div style={{ textAlign: 'left' }}>
      {label && <label>{label}</label>}
      <div className="mmk-select-wrapper">
        <div className="mmk-select">
          {selectItem && !open && (
            <span onClick={() => setOpen(true)} className="mmk-select-input">
              {selectItem.label}
            </span>
          )}
          {(!selectItem || open) && (
            <input
              className="mmk-select-input"
              placeholder={placeholder}
              onFocus={() => setOpen(true)}
              onChange={(e) => inputChange(e.target.value)}
              autoFocus={open}
              defaultValue={selectItem?.label}
            />
          )}
          <div onClick={() => setOpen(!open)}>
            <ArrowIcon direction={open ? 'up' : 'down'} />
          </div>
        </div>

        {open && (
          <div className="mmk-dropdown">
            {options.map((option, index) => {
              return (
                <div
                  onClick={() => selectOption(option.value, option.label)}
                  className={
                    index === options.length - 1
                      ? 'mmk-dropdown-item mmk-dropdown-item-no-border'
                      : 'mmk-dropdown-item'
                  }
                  key={index.toString()}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
