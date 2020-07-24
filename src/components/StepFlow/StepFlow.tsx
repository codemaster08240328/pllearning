import React from 'react';
import { IProps } from './types';
import './styles.scss';

const StepFlow: React.FC<IProps> = ({ total, step }) => {
  return (
    <div className="mmk-step-flow-wrapper">
      {new Array(total).fill(0).map((item, index) => {
        let className = 'mmk-step-flow-wrapper-item ';
        if (index > 0) {
          className += 'ml-8 ';
        }

        if (index < step) {
          className += 'active ';
        }

        return <div className={className} key={index.toString()} />;
      })}
    </div>
  );
};

export default StepFlow;
