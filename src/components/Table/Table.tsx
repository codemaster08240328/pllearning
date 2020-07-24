import React from 'react';

import { IProps } from './types';

import './styles.scss';

const clsNames = ['even-row', 'odd-row'];

const Table: React.FC<IProps> = ({ fields, items }) => {
  return (
    <div className="mmk-table-wrapper">
      {fields.map((field, index) => (
        <div className={clsNames[index % 2]}>
          <div className="label-field">{field.label}</div>

          <div className="value-field">
            {field.component || (items && items[field.key])}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
