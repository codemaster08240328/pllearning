import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { CurrencyIcon, BackIcon } from '../../components/Icons';
import StepFlow from '../../components/StepFlow';

import { getPLApplicationDetails } from '../../services/getPLApplication/service';
import { IPLAppData } from '../../services/getPLApplication/types';
import { savePLApplicationDetails } from '../../services/saveApplication/service';
import { IParam } from '../../services/saveApplication/types';

const Salary = () => {
  const [salary, setSalary] = useState<string | undefined>(undefined);
  const [loading, setloading] = useState(false);
  const [plApp, setplApp] = useState<IPLAppData>();
  const history = useHistory();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setSalary(res.data.list.applicationDetails.netMonthlySalary || undefined);
    });
  }, []);

  const onNext = () => {
    setloading(true);
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
      param.netMonthlySalary = salary || null;

      savePLApplicationDetails(param).then((res) => {
        console.log(res);
        setloading(false);
        if (parseInt(salary || '0') >= 30000) {
          history.push('/apply/5/long');
        } else {
          history.push('/apply/5/short');
        }
      });
    }
  };

  return (
    <>
      <Link to={'/apply/3'} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={10} step={4} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">
          What is the salary deposited in your bank every month?
        </h3>
        <div className="mt-16">
          <Input
            placeholder="25,000 to 10,000,000"
            leftIcon={<CurrencyIcon size={48} />}
            onChange={(value) => setSalary(value)}
            type="number"
            value={salary}
          />
        </div>
        <div className="flex-1" />
        <div className="next-btn-wrapper">
          <Button
            text="NEXT"
            disabled={!salary}
            onClick={onNext}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Salary;
