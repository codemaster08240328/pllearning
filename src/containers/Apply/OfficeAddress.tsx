import React, { useState, useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

import Button from 'components/Button';
import Input from 'components/Input';
import { getPINCodeDetail } from 'services/getPINCodeDetails/service';
import { pinCodeValidation } from 'utitlity/helper';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { addAddress } from 'redux/actions/plApplication';
import { usePrevious } from 'utitlity/helper';
import { platform } from 'os';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  addPLAddress: (param: IParam) => void;
}

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

const OfficeAddress: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  addPLAddress,
}) => {
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

  const previousLoading = usePrevious(plApplication.loading);
  const history = useHistory();

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/15/long');
    }

    setPin(
      plApplication.data.list.addressInformationDetails.filter(
        (item) => item.addressType === 'OFFICE' && item.isActive === 1
      )[0]?.zipCode || ''
    );

    setAddress(
      plApplication.data.list.addressInformationDetails.filter(
        (item) => item.addressType === 'OFFICE' && item.isActive === 1
      )[0] || {
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        seqNo: null,
        addressType: 'OFFICE',
        isActive: null,
        source: null,
        zipCode: null,
      }
    );
  }, [plApplication]);

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
      const param: IParam = {
        addressInformation: [
          ...plApplication.data.list.addressInformationDetails.map((item) => {
            if (item.addressType === 'OFFICE') {
              item.isActive = 0;
            }

            return item;
          }),
          {
            addressLine1: address.addressLine1?.toString() || '',
            addressLine2: address.addressLine2?.toString() || '',
            city: address.city?.toString() || '',
            state: address.state?.toString() || '',
            seqNo: -1,
            addressType: 'OFFICE',
            isActive: 1,
            source: address.source?.toString() || '',
            zipCode: address.zipCode?.toString() || '',
          },
        ],
      };

      addPLAddress(param);
    } else {
      setvalidPin(false);
    }
  };

  const enterPinCode = async (value: string) => {
    if (value.length > 6) return;

    setPin(value);
    setvalidPin(true);

    if (value.length === 6) {
      const res = await getPINCodeDetail(value);
      if (res.error) {
        setpinFound(false);
        return;
      }
      setpinFound(true);
      setAddress({
        addressType: 'OFFICE',
        state: res.data.state,
        city: res.data.city,
        addressLine1: '',
        addressLine2: '',
        seqNo: -1,
        isActive: 1,
        source: 'CUSTINPUT',
        zipCode: value,
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
            value={pin}
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
      addPLAddress: (param) => addAddress(param),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OfficeAddress);
