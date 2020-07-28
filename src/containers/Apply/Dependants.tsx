import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

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

const numbers: Array<TSelectItem> = [
  {
    value: 'PLNOFD01',
    label: 'No Dependants',
  },
  {
    value: 'PLNOFD02',
    label: '1 person',
  },
  {
    value: 'PLNOFD03',
    label: '2 persons',
  },
  {
    value: 'PLNOFD04',
    label: '3 persons',
  },
  {
    value: 'PLNOFD05',
    label: 'More than 3 persons',
  },
];

const Dependants: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [number, setNumber] = useState('');
  const history = useHistory();

  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/11');
    }
    setNumber(plApplication.data.list.applicationDetails.noOfDependants || '');
  }, [plApplication]);

  const onNext = (value: string) => {
    setNumber(value);

    const param: IParam = {
      noOfDependants: value,
    };

    savePLApplication(param);
  };

  const SelectItem: React.FC<TSelectItem> = ({ value, label }) => {
    let className = 'mmk-loan-dependants-item ';
    if (number === value) {
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
      <Link to="/apply/9/long" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={10} />
      <div className="mmk-loan-dependants">
        <h3 className="color-text-blue-dark">Number of dependants</h3>
        <div className="mmk-loan-dependants-items">
          {numbers.map((item) => (
            <SelectItem
              value={item.value}
              key={item.value}
              label={item.label}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dependants);
