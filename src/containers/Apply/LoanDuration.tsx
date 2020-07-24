import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import StepFlow from '../../components/StepFlow';
import { BackIcon } from '../../components/Icons';

import { getPLApplicationDetails } from '../../services/getPLApplication/service';
import { IPLAppData } from '../../services/getPLApplication/types';
import { savePLApplicationDetails } from '../../services/saveApplication/service';
import { IParam } from '../../services/saveApplication/types';

type TSelectItem = {
  value: string;
};

const years = ['1 year', '2 years', '3 years', '4 years', '5 years'];

const LoanDuration = () => {
  const [year, setYear] = useState<string | undefined>(undefined);
  const [plApp, setplApp] = useState<IPLAppData>();
  const history = useHistory();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setYear(res.data.list.applicationDetails.repayableYears || undefined);
    });
  }, []);

  const onNext = (value: string) => {
    setYear(value);

    if (!!plApp) {
      let param: IParam = {
        ...plApp.data.list.applicationDetails,
        addressInformation: plApp.data.list.addressInformationDetails,
        emailAddresses: plApp.data.list.emailInformationDetails,
        businessRegistrationNames: plApp.data.list.businessRegistrationDetails,
        isNewApplication: plApp.data.list.isNewApp,
        businessRegistrationType: null, // TODO: should check with BE team
        fastTrackPoint: true, // TODO: should check with BE team
        nonPreferredSalaryCreditedBank: null, // TODO: should check with BE team
      };
      param.repayableYears = value || null;

      savePLApplicationDetails(param).then((res) => {
        console.log(res);
        history.push('/apply/3');
      });
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
            <SelectItem value={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LoanDuration;
