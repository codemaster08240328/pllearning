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

const LoanAmount = () => {
  const [loanamt, setLoanamt] = useState<string | undefined>(undefined);
  const [plApp, setplApp] = useState<IPLAppData>();
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setLoanamt(
        res.data.list.applicationDetails.requiredPLAmount || undefined
      );
    });
  }, []);

  const onNext = () => {
    setLoading(true);

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
      param.requiredPLAmount = loanamt || null;

      savePLApplicationDetails(param).then((res) => {
        console.log(res);
        setLoading(false);

        history.push('/apply/2');
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to={'/'} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={10} step={1} />
      <div className="mmk-loan-apply-content-wrapper">
        <div className="mmk-loan-amt-hello">Hi Rajesh,</div>
        <h3 className="mt-8 color-text-blue-dark">
          How much loan do you need?
        </h3>
        <div className="mt-16">
          <Input
            placeholder="25,000 to 10,000,000"
            leftIcon={<CurrencyIcon size={48} />}
            onChange={(value) => setLoanamt(value)}
            type="number"
            value={loanamt}
          />
        </div>
        <div className="flex-1" />
        <div className="next-btn-wrapper">
          <Button
            text="NEXT"
            disabled={!loanamt}
            onClick={onNext}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default LoanAmount;
