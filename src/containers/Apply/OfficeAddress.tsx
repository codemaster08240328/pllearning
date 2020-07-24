import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from '../../components/Icons';
import StepFlow from '../../components/StepFlow';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { pinCodeValidation } from '../../utitlity/helper';

type TAddressDetail = {
  flatNumber: string;
  street: string;
  city: string;
  state: string;
};

const addressDetailItems = [
  {
    key: 'flatNumber',
    placeholder: 'Flat number, floor, building',
  },
  {
    key: 'street',
    placeholder: 'Street name, number',
  },
  {
    key: 'city',
    placeholder: 'City',
  },
  {
    key: 'state',
    placeholder: 'State',
  },
];

const OfficeAddress = () => {
  const [address, setAddress] = useState<TAddressDetail>({
    flatNumber: '',
    street: '',
    city: '',
    state: '',
  });
  const [pin, setPin] = useState<string>('');
  const [validPin, setvalidPin] = useState(true);

  const history = useHistory();
  const isDisable = () => {
    return !(
      address.street &&
      address.city &&
      address.state &&
      address.flatNumber &&
      pin
    );
  };

  const onNext = () => {
    if (pinCodeValidation(pin)) {
      history.push('/apply/15/long');
    } else {
      setvalidPin(false);
    }
  };

  return (
    <>
      <Link to="/apply/13" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={14} />
      <div className="mmk-loan-office">
        <h3 className="color-text-blue-dark">Confirm your office address</h3>
        <div
          className="mt-16 mb-8"
          style={{ width: '100%', textAlign: 'left' }}
        >
          <label>Enter PIN code</label>
        </div>
        <div>
          <Input
            onChange={(v) => {
              setPin(v);
              setvalidPin(true);
            }}
            placeholder="Enter 6 digit of your office PIN code"
            type="number"
            error={!validPin}
          />
        </div>

        <div
          className="mt-16 mb-8"
          style={{ width: '100%', textAlign: 'left' }}
        >
          <label>Address Detail</label>
        </div>
        {addressDetailItems.map((item, index) => (
          <div className="mb-16" key={index.toString()}>
            <Input
              onChange={(v) => {
                const newAddress_: TAddressDetail = {
                  ...address,
                  [item.key]: v,
                };
                setAddress(newAddress_);
              }}
              placeholder={item.placeholder}
            />
          </div>
        ))}

        <div className="flex-1"></div>
        <div className="next-btn-wrapper">
          <Button text="NEXT" disabled={isDisable()} onClick={onNext} />
        </div>
      </div>
    </>
  );
};

export default OfficeAddress;
