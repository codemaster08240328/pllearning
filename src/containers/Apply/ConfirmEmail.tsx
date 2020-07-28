import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

import Button from 'components/Button';
import Input from 'components/Input';
import { RunIcon } from 'components/Icons';

import { emailValidation } from 'utitlity/helper';

const ConfirmEmail = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [validEmail, setvalidEmail] = useState(true);

  const isDisable = () => {
    return !email;
  };

  const onNext = () => {
    if (emailValidation(email)) {
      history.push('/apply/13');
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
          <Button text="NEXT" disabled={isDisable()} onClick={onNext} />
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
