import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link } from 'react-router-dom';
import StepFlow from 'components/StepFlow';
import { BackIcon } from 'components/Icons';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { saveApplication } from 'redux/actions/plApplication';

import { usePrevious } from 'utitlity/helper';

type TSelectItem = {
  value: string;
  label: string;
};

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  savePLApplication: (param: IParam) => void;
}

export const years: Array<TSelectItem> = [
  {
    value: 'PLRY01',
    label: '1 year',
  },
  {
    value: 'PLRY02',
    label: '2 years',
  },
  {
    value: 'PLRY03',
    label: '3 years',
  },
  {
    value: 'PLRY04',
    label: '4 years',
  },
  {
    value: 'PLRY05',
    label: '5 years',
  },
];

const LoanDuration: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [year, setYear] = useState<string | undefined>(undefined);
  const history = useHistory();
  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/3');
    } else {
      setYear(
        plApplication.data.list.applicationDetails.repayableYears || undefined
      );
    }
  }, [plApplication]);

  const onNext = (value: string) => {
    setYear(value);

    const param: IParam = {
      repayableYears: value || null,
    };

    savePLApplication(param);
  };

  const SelectItem: React.FC<TSelectItem> = ({ value, label }) => {
    let className = 'mmk-loan-duration-item ';
    if (year === value) {
      className += 'item-clicked ';
    }

    return (
      <div className={className} onClick={() => onNext(value)}>
        {label}
      </div>
    );
  };

  return (
    <>
      <Link to={'/apply/1'} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={10} step={2} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">
          How long do you need the loan for?
        </h3>

        <div className="mmk-loan-duration">
          {years.map((item) => (
            <SelectItem
              value={item.value}
              key={item.value}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (action: IPLAppState): StateProps => {
  return { plApplication: action.plApplicationDetail };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      savePLApplication: (param) => saveApplication(param),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoanDuration);
