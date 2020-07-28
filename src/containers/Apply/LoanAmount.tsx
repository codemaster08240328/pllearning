import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import { CurrencyIcon, BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { saveApplication } from 'redux/actions/plApplication';

import { usePrevious } from 'utitlity/helper';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  savePLApplication: (param: IParam) => void;
}

const LoanAmount: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [loanamt, setLoanamt] = useState<string | undefined>(undefined);
  const history = useHistory();
  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/2');
    }
    setLoanamt(
      plApplication.data.list.applicationDetails.requiredPLAmount || undefined
    );
  }, [plApplication]);

  const onNext = () => {
    const param: IParam = {
      requiredPLAmount: loanamt || null,
    };

    savePLApplication(param);
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
            loading={plApplication.loading}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanAmount);
