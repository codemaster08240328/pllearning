import React, { useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import StepFlow from '../../components/StepFlow';
import { TRouterParam } from './types';
import { BackIcon } from '../../components/Icons';

type TSelectItem = {
  value: string;
};

const years = [
  'Less than 1 year',
  '1 year',
  '2 years',
  '3 years',
  'More than 3 years',
];

const CityDuration = () => {
  const [year, setYear] = useState<string | undefined>(undefined);
  const history = useHistory();
  const { type } = useParams<TRouterParam>();

  const onNext = (value: string) => {
    setYear(value);

    if (type === 'short') {
      setTimeout(() => history.push(`/apply/analyze/${type}`), 1000);
    } else {
      setTimeout(() => history.push(`/apply/10`), 1000);
    }
  };

  const SelectItem: React.FC<TSelectItem> = ({ value }) => {
    let className = 'mmk-loan-duration-item ';
    if (year === value) {
      className += 'item-clicked ';
    }

    return (
      <div className={className} onClick={() => onNext(value)}>
        {value}
      </div>
    );
  };

  return (
    <>
      <Link to={`/apply/8/${type}`} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={type === 'short' ? 10 : 15} step={9} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">Years at current city</h3>

        <div className="mmk-loan-duration">
          {years.map((item) => (
            <SelectItem value={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CityDuration;
