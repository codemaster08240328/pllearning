import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { TRouterParam } from './types';
import StepFlow from '../../components/StepFlow';
import { BackIcon } from '../../components/Icons';

import { getPLApplicationDetails } from '../../services/getPLApplication/service';
import { IPLAppData } from '../../services/getPLApplication/types';
import { savePLApplicationDetails } from '../../services/saveApplication/service';
import { IParam } from '../../services/saveApplication/types';

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

const AddressDuration = () => {
  const [year, setYear] = useState<string | undefined>(undefined);
  const history = useHistory();
  const [plApp, setplApp] = useState<IPLAppData>();
  const { type } = useParams<TRouterParam>();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setYear(res.data.list.applicationDetails.repayableYears || undefined);
    });
  }, []);

  const SelectItem: React.FC<TSelectItem> = ({ value }) => {
    let className = 'mmk-loan-duration-item ';
    if (year === value) {
      className += 'item-clicked ';
    }

    return (
      <div
        className={className}
        onClick={() => {
          setYear(value);
          setTimeout(() => history.push(`/apply/9/${type}`), 1000);
        }}
      >
        {value}
      </div>
    );
  };

  return (
    <>
      <Link to={`/apply/7/${type}`} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={type === 'short' ? 10 : 15} step={8} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">Years at current address</h3>

        <div className="mmk-loan-duration">
          {years.map((item) => (
            <SelectItem value={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddressDuration;
