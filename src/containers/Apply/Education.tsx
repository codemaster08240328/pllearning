import React, { useState, useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

export const educations: Array<TSelectItem> = [
  {
    value: 'PLEDU01',
    label: 'PhD',
  },
  {
    value: 'PLEDU02',
    label: 'Masters',
  },
  {
    value: 'PLEDU03',
    label: 'Bachelors',
  },
  {
    value: 'PLEDU04',
    label: 'Diploma',
  },
  {
    value: 'PLEDU05',
    label: 'High School',
  },
];

const Education: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [education, setEducation] = useState('');
  const history = useHistory();
  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/12');
    }
    setEducation(
      plApplication.data.list.applicationDetails.educationalQualification || ''
    );
  }, [plApplication]);

  const onNext = (value: string) => {
    setEducation(value);

    const param: IParam = {
      educationalQualification: value,
    };

    savePLApplication(param);
  };

  const SelectItem: React.FC<TSelectItem> = ({ value, label }) => {
    let className = 'mmk-loan-dependants-item ';
    if (education === value) {
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
      <Link to="/apply/10" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={11} />
      <div className="mmk-loan-dependants">
        <h3 className="color-text-blue-dark">Last educational qualification</h3>
        <div className="mmk-loan-dependants-items">
          {educations.map((item) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(Education);
