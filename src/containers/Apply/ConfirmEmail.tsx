import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

import Button from 'components/Button';
import Input from 'components/Input';
import { RunIcon } from 'components/Icons';

import { emailValidation } from 'utitlity/helper';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { addEmail } from 'redux/actions/plApplication';

import { usePrevious } from 'utitlity/helper';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  addPLWorkEmail: (param: IParam) => void;
}

const ConfirmEmail: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  addPLWorkEmail,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [validEmail, setvalidEmail] = useState(true);

  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/13');
    }

    setEmail(
      plApplication.data.list.emailInformationDetails.filter(
        (email) => email.isActive === 1 && email.emailType === 'OFFICE'
      )[0]?.emailAddress || ''
    );
  }, [plApplication]);

  const isDisable = () => {
    return !email;
  };

  const onNext = () => {
    if (emailValidation(email)) {
      const param: IParam = {
        emailAddresses: [
          ...plApplication.data.list.emailInformationDetails.map((email) => {
            if (email.emailType === 'OFFICE') {
              return {
                emailType: email.emailType,
                emailAddress: email.emailAddress,
                isActive: 0,
                seqNo: email.seqNo,
              };
            }

            return email;
          }),

          {
            emailAddress: email,
            emailType: 'OFFICE',
            isActive: 1,
            seqNo: -1,
          },
        ],
      };

      addPLWorkEmail(param);
    } else {
      setvalidEmail(false);
    }
  };

  return (
    <>
      <Link to="/apply/11" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={12} />
      <div className="mmk-loan-confirm-email">
        <h3 className="color-text-blue-dark">
          Confirm your work email address
        </h3>
        <div className="mt-16">
          <Input
            onChange={(v) => {
              setEmail(v);
              setvalidEmail(true);
            }}
            value={email}
            placeholder="Type your work email address"
            error={!validEmail}
            type="email"
          />
        </div>

        <div className="mmk-loan-confirm-email-notify mt-8">
          <RunIcon />
          <div className="mmk-loan-confirm-email-notify-text">
            Providing work email could get approval faster by avoiding physical
            address verification.
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="next-btn-wrapper">
          <Button
            text="NEXT"
            disabled={isDisable()}
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
      addPLWorkEmail: (param) => addEmail(param),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
