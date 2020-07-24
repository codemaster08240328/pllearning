import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from '../../components/Icons';
import StepFlow from '../../components/StepFlow';

type TSelectItem = {
  value: string;
};

const numbers = [
  'No Dependants',
  '1 person',
  '2 persons',
  '3 persons',
  'More than 3 persons',
];

const Dependants = () => {
  const [number, setNumber] = useState('');
  const history = useHistory();

  const SelectItem: React.FC<TSelectItem> = ({ value }) => {
    let className = 'mmk-loan-dependants-item ';
    if (number === value) {
      className += 'item-clicked ';
    }

    return (
      <div
        className={className}
        onClick={() => {
          setNumber(value);
          setTimeout(() => history.push('/apply/11'), 1000);
        }}
      >
        {value}
      </div>
    );
  };

  return (
    <>
      <Link to="/apply/9/long" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={10} />
      <div className="mmk-loan-dependants">
        <h3 className="color-text-blue-dark">Number of dependants</h3>
        <div className="mmk-loan-dependants-items">
          {numbers.map((item) => (
            <SelectItem value={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dependants;
