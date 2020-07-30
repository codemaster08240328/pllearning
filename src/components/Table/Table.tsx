import React from 'react';

import { IProps } from './types';

import './styles.scss';

const clsNames = ['even-row', 'odd-row'];

const Table: React.FC<IProps> = ({ fields, items }) => {
  return (
    <div className="mmk-table-wrapper">
      {fields.map(({ label, component, key, error }, index) => (
        <div className={clsNames[index % 2]}>
          <div
            className={
              error && error() ? 'status-range error-field' : 'status-range'
            }
          >
            <div className="label-field">{label}</div>

            <div className="value-field">
              {component && component()}
              {!component && items && items[key]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
