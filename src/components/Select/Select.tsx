import React, { useState, useEffect } from 'react';
import { IProps, TOption } from './types';

import './styles.scss';
import { ArrowIcon } from '../Icons';

const Select: React.FC<IProps> = ({
  label,
  placeholder,
  options,
  noMatch,
  onSelect,
  value,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(value || '');
  const [selectedLabel, setSelectedLabel] = useState<string>(
    options.filter((option) => option.value === value)[0]?.label
  );
  const [filteredOptions, setFilteredOptions] = useState<Array<TOption>>(
    options
  );

  useEffect(() => {
    setSelectedValue(value || '');
    setSelectedLabel(
      options.filter((option) => option.value === value)[0]?.label
    );
  }, [value]);

  const filterOptions = (v: string) => {
    let array: Array<TOption>;

    if (!!v) {
      array = options.filter((item) =>
        item.label.toLowerCase().includes(v.toLowerCase())
      );
    } else {
      array = options;
    }

    setFilteredOptions(array);
    setSelectedLabel(v);
  };

  const selectOption = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    setOpen(false);

    onSelect && onSelect(value);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      {label && <label>{label}</label>}
      <div className="mmk-select-wrapper">
        <div className="mmk-select">
          <input
            className="mmk-select-input"
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            // onBlur={() => setOpen(false)}
            value={selectedLabel}
            onChange={(e) => filterOptions(e.target.value)}
          />
          <div onClick={() => setOpen(!open)}>
            <ArrowIcon direction={open ? 'up' : 'down'} />
          </div>
        </div>

        {open && (
          <div className="mmk-dropdown">
            {filteredOptions.map((option, index) => {
              return (
                <div
                  onClick={() => selectOption(option.value, option.label)}
                  className="mmk-dropdown-item"
                  key={index.toString()}
                >
                  {option.label}
                </div>
              );
            })}
            <div
              className="mmk-dropdown-item mmk-dropdown-item-no-border"
              onClick={() =>
                selectOption(
                  noMatch?.value || 'none',
                  noMatch?.label || 'No matched item'
                )
              }
            >
              {noMatch && noMatch.label}
              {!noMatch && 'No matched item'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
