import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

import Button from 'components/Button';
import Input from 'components/Input';
import { getPINCodeDetail } from 'services/getPINCodeDetails/service';
import { pinCodeValidation } from 'utitlity/helper';

type TAddressDetail = { [key: string]: string | number | null };

const addressDetailItems = [
  {
    key: 'addressLine1',
    placeholder: 'Flat number, floor, building',
  },
  {
    key: 'addressLine2',
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
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
    seqNo: null,
    addressType: 'OFFICE',
    isActive: null,
    source: null,
    zipCode: null,
  });
  const [pin, setPin] = useState<string>('');
  const [pinFound, setpinFound] = useState(true);
  const [validPin, setvalidPin] = useState(true);

  const history = useHistory();
  const isDisable = () => {
    return !(
      address.addressLine2 &&
      address.city &&
      address.state &&
      address.addressLine1 &&
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

  const enterPinCode = async (value: string) => {
    if (value.length > 6) return;

    setvalidPin(true);
    setPin(value);

    if (value.length === 6) {
      const res = await getPINCodeDetail(value);
      if (res.error) {
        setpinFound(false);
        return;
      }
      setpinFound(true);
      setAddress({
        ...address,
        state: res.data.state,
        city: res.data.city,
      });
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
            onChange={(v) => enterPinCode(v)}
            placeholder="Enter 6 digit of your office PIN code"
            type="number"
            error={!validPin}
          />
        </div>

        {!pinFound && <div className="pin-notfound">Pincode not found</div>}

        {pinFound && (
          <div
            className="mt-16 mb-8"
            style={{ width: '100%', textAlign: 'left' }}
          >
            <label>Address Detail</label>
          </div>
        )}
        {pinFound &&
          addressDetailItems.map((item, index) => (
            <div className="mb-16" key={index.toString()}>
              <Input
                onChange={(v) => {
                  const newAddress_: TAddressDetail = {
                    ...address,
                    [item.key]: v,
                  };
                  setAddress(newAddress_);
                }}
                value={address[item.key]?.toString()}
                placeholder={item.placeholder}
                disabled={index > 1}
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
