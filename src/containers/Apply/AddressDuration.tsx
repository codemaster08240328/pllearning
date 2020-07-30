import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { TRouterParam } from './types';
import StepFlow from 'components/StepFlow';
import { BackIcon } from 'components/Icons';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { saveApplication } from 'redux/actions/plApplication';
import { usePrevious } from 'utitlity/helper';

import Loading from 'components/Loading';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  savePLApplication: (param: IParam) => void;
}

type TSelectItem = {
  value: string;
  label: string;
};

export const years = [
  {
    value: 'PLCADD01',
    label: 'Less than 1 year',
  },
  {
    value: 'PLCADD02',
    label: '1 year',
  },
  {
    value: 'PLCADD03',
    label: '2 years',
  },
  {
    value: 'PLCADD04',
    label: '3 years',
  },
  {
    value: 'PLCADD05',
    label: 'More than 3 years',
  },
];

const AddressDuration: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [year, setYear] = useState<string | undefined>(undefined);
  const history = useHistory();
  const { type } = useParams<TRouterParam>();
  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push(`/apply/9/${type}`);
    }

    setYear(
      plApplication.data.list.applicationDetails.yrsAtCurrentResidence ||
        undefined
    );
  }, [plApplication]);

  const onNext = (value: string) => {
    setYear(value);

    const param: IParam = {
      yrsAtCurrentResidence: value,
    };

    // console.log(param);

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
      <Link to={`/apply/7/${type}`} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={type === 'short' ? 10 : 15} step={8} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">Years at current address</h3>

        <div className="mmk-loan-duration">
          {years.map((item) => (
            <SelectItem
              value={item.value}
              label={item.label}
              key={item.value}
            />
          ))}
        </div>
      </div>
      {plApplication.loading && <Loading />}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressDuration);
