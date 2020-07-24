import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { BottomModal } from '../../components/Modal';
import StepFlow from '../../components/StepFlow';
import {
  CloseIcon,
  ArrowIcon,
  CircledCheckIcon,
  CircledPlusIcon,
  BackIcon,
} from '../../components/Icons';
import Input from '../../components/Input';
import { pinCodeValidation } from '../../utitlity/helper';

import { getPLApplicationDetails } from '../../services/getPLApplication/service';
import { IPLAppData } from '../../services/getPLApplication/types';
import { savePLApplicationDetails } from '../../services/saveApplication/service';
import { IParam } from '../../services/saveApplication/types';

import { TRouterParam } from './types';

const INF = Math.pow(10, 1000);

type TAddressDetail = {
  city: string | null;
  state: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  zipCode: string | null;
  seqNo: number;
  addressType: string | null;
  isActive: number;
  source: string | null;
};

const addressDetailItems = [
  {
    key: 'addressLine1',
    placeholder: 'Flat number, floor, building',
  },
  {
    key: 'addressLine1',
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

const getPINCodeList = (addressList: Array<TAddressDetail>) => {
  const res = addressList.filter(
    (address) => address.addressType === 'RESIDENCE'
  );

  return res.map((item) => item.zipCode);
};

const Address = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [pin, setPin] = useState<string | null>('');
  const [pinInput, setPinInput] = useState<string | null>('');
  const [enterPin, setEnterPin] = useState<boolean>(false);
  const [address, setAddress] = useState<TAddressDetail>({
    city: '',
    state: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    isActive: 0,
    source: '',
    seqNo: 0,
    addressType: '',
  });
  const [openAddressDetail, setOpenAddressDetail] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<number>(INF);
  const [validPin, setvalidPin] = useState(true);
  const [openNewAddModal, setopenNewAddModal] = useState(false);
  const [flat, setflat] = useState('');
  const [street, setstreet] = useState('');
  const [plApp, setplApp] = useState<IPLAppData>();
  const [pinCodeList, setpinCodeList] = useState<Array<string | null>>([]);
  const [addressList, setaddressList] = useState<Array<TAddressDetail>>([]);
  const [loading, setloading] = useState(false);

  const history = useHistory();
  const { type } = useParams<TRouterParam>();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setPin(res.data.list.applicationDetails.zipCode || '');
      setPinInput(res.data.list.applicationDetails.zipCode || '');
      setpinCodeList(getPINCodeList(res.data.list.addressInformationDetails));

      if (!!res.data.list.applicationDetails.zipCode) {
        setOpenModal(false);
        setaddressList(
          res.data.list.addressInformationDetails.filter(
            (address) =>
              address.zipCode === res.data.list.applicationDetails.zipCode
          ) || []
        );
      }
    });
  }, []);

  const getAddressInfoFromPIN = (
    pin: string
  ): {
    [key: string]: string;
  } => {
    const address = plApp?.data.list.addressInformationDetails.filter(
      (address) => address.zipCode === pin
    )[0];

    return {
      city: address?.city || '',
      state: address?.state || '',
      zipCode: address?.zipCode || '',
      addressType: address?.addressType || '',
      source: address?.source || '',
    };
  };

  const onSelectPin = (item: string | null) => {
    console.log(item);
    setPinInput(item);
    setPin(item);
    setaddressList(
      plApp?.data.list.addressInformationDetails.filter(
        (address) => address.zipCode === item
      ) || []
    );

    setAddress({
      city: '',
      state: '',
      addressLine1: '',
      addressLine2: '',
      zipCode: '',
      isActive: 0,
      source: '',
      seqNo: 0,
      addressType: '',
    });

    setSelectedAddress(INF);
    setEnterPin(false);
    setOpenAddressDetail(false);
    setTimeout(() => setOpenModal(false), 100);
  };

  const onNext = () => {
    setloading(true);

    if (pinCodeValidation(pin)) {
      if (!!plApp) {
        let param: IParam = {
          ...plApp.data.list.applicationDetails,
          addressInformation: plApp.data.list.addressInformationDetails,
          emailAddresses: plApp.data.list.emailInformationDetails,
          businessRegistrationNames:
            plApp.data.list.businessRegistrationDetails,
          isNewApplication: plApp.data.list.isNewApp,
          businessRegistrationType: null, // TODO: should check with BE team
          fastTrackPoint: true, // TODO: should check with BE team
          nonPreferredSalaryCreditedBank: null, // TODO: should check with BE team
        };
        param.zipCode = pin;

        if (selectedAddress !== INF) {
          param.addressLine1 = plApp.data.list.addressInformationDetails.filter(
            (address) => address.seqNo === selectedAddress
          )[0].addressLine1;
          param.addressLine2 = plApp.data.list.addressInformationDetails.filter(
            (address) => address.seqNo === selectedAddress
          )[0].addressLine2;
          param.city = plApp.data.list.addressInformationDetails.filter(
            (address) => address.seqNo === selectedAddress
          )[0].city;
          param.state = plApp.data.list.addressInformationDetails.filter(
            (address) => address.seqNo === selectedAddress
          )[0].state;
        } else {
          param.addressLine1 = flat;
          param.addressLine2 = street;
          param.city = address.city;
          param.state = address.state;
        }

        savePLApplicationDetails(param).then((res) => {
          console.log(res);
          history.push(`/apply/8/${type}`);
        });
      }
    } else {
      setvalidPin(false);
    }
  };

  const checkDisabled = () => {
    let res = !!pinInput && selectedAddress !== INF;

    res =
      res ||
      (!!pin &&
        !!address.city &&
        !!address.state &&
        !!address.addressLine1 &&
        !!address.addressLine2);
    return !res;
  };

  return (
    <>
      <Link to={`/apply/6/${type}`} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={type === 'short' ? 10 : 15} step={7} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">Confirm your address</h3>
        <div className="mt-16" style={{ width: '100%', textAlign: 'left' }}>
          <label>Select PIN code</label>
        </div>
        <div
          className="mmk-company-type mt-8"
          onClick={() => setOpenModal(!openModal)}
        >
          <div>
            <span className="mmk-company-type-value">{pinInput}</span>
            {!pinInput && (
              <span className="mmk-company-type-placeholder">
                Select your PIN code
              </span>
            )}
          </div>
          <div>
            <ArrowIcon direction="down" />
          </div>
        </div>
        {enterPin && (
          <>
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
                  setOpenAddressDetail(true);
                }}
                placeholder="Enter your 6 digit PIN code"
                type="number"
                error={!validPin}
              />
            </div>
          </>
        )}
        {openAddressDetail && (
          <>
            <div
              className="mt-16 mb-8"
              style={{ width: '100%', textAlign: 'left' }}
            >
              <label>Address Detail</label>
            </div>
            {addressDetailItems.map((item, index) => (
              <div className="mb-16" key={index.toString()}>
                <Input
                  value={
                    index > 1
                      ? getAddressInfoFromPIN(pin || '')[item.key]
                      : index === 1
                      ? street
                      : flat
                  }
                  disabled={index > 1}
                  placeholder={item.placeholder}
                  onChange={(value) => {
                    if (index === 0) {
                      setflat(value);
                    } else if (index === 1) {
                      setstreet(value);
                    }
                    setAddress({
                      city: getAddressInfoFromPIN(pin || '').city,
                      state: getAddressInfoFromPIN(pin || '').state,
                      zipCode: getAddressInfoFromPIN(pin || '').zipCode,
                      addressType: getAddressInfoFromPIN(pin || '').addressType,
                      seqNo: 0,
                      addressLine1: index === 0 ? value : flat,
                      addressLine2: index === 1 ? value : street,
                      source: 'CUSTINPUT',
                      isActive: 0,
                    });
                  }}
                />
              </div>
            ))}
          </>
        )}
        {pinInput && !enterPin && (
          <>
            <div className="mt-24" style={{ width: '100%', textAlign: 'left' }}>
              <label>Select your current address</label>
            </div>
            {addressList.map((address, index) => (
              <div
                className="mmk-address-item"
                key={index.toString()}
                onClick={() => setSelectedAddress(address.seqNo)}
              >
                <div className="mmk-address-item-text">{`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.zipCode}`}</div>
                <CircledCheckIcon
                  color={
                    address.seqNo === selectedAddress ? '#37d47e' : '#e2e2e2'
                  }
                  checked={address.seqNo === selectedAddress}
                />
              </div>
            ))}
            <div
              className="mmk-address-add"
              onClick={() => setopenNewAddModal(true)}
            >
              <h6>ADD NEW ADDRESS</h6>
              <CircledPlusIcon color="#3ba3ff" />
            </div>
          </>
        )}
        <div className="flex-1" />
        <div className="next-btn-wrapper">
          <Button
            text="NEXT"
            disabled={checkDisabled()}
            onClick={onNext}
            loading={loading}
          />
        </div>
        {openModal && (
          <BottomModal>
            <div
              onClick={() => setOpenModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <h3 className="mmk-company-modal-title">Select your PIN code</h3>
            <div className="mmk-company-modal-types">
              {pinCodeList.map((item, index) => (
                <div
                  onClick={() => onSelectPin(item)}
                  className="mmk-loan-duration-item"
                  key={index.toString()}
                >
                  {item}
                </div>
              ))}
              <div
                onClick={() => {
                  setEnterPin(true);
                  setPinInput('Add new PIN code');
                  setSelectedAddress(INF);
                  setTimeout(() => setOpenModal(false), 100);
                }}
                className="mmk-loan-duration-item"
              >
                Add new PIN code
              </div>
            </div>
          </BottomModal>
        )}
        {openNewAddModal && (
          <BottomModal>
            <div
              onClick={() => setopenNewAddModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <h3 className="mmk-company-modal-title">Add new address</h3>
            <h6 className="mt-16">{pin}</h6>
            <span className="mmk-address-modal-city">
              {getAddressInfoFromPIN(pin || '').city}
            </span>
            <div className="mmk-company-modal-types">
              <Input
                placeholder="Flat number, floor, building"
                className="mt-24"
                onChange={(flat) => setflat(flat)}
              />
              <Input
                placeholder="Street name, number"
                onChange={(street) => setstreet(street)}
                className="mt-16"
              />
              <Button
                text="ADD THIS ADDRESS"
                className="mt-16 mb-32"
                disabled={!street || !flat}
                onClick={() => {
                  const index = addressList.length;
                  setaddressList([
                    ...addressList,
                    {
                      addressLine1: flat,
                      addressLine2: street,
                      seqNo: 0,
                      city: getAddressInfoFromPIN(pin || '').city || '',
                      state: getAddressInfoFromPIN(pin || '').state || '',
                      zipCode: getAddressInfoFromPIN(pin || '').zipCode || '',
                      addressType:
                        getAddressInfoFromPIN(pin || '').addressType || null,
                      isActive: 0,
                      source: 'CUSTINPUT',
                    },
                  ]);
                  setopenNewAddModal(false);
                  setSelectedAddress(index);
                }}
              />
            </div>
          </BottomModal>
        )}
      </div>
    </>
  );
};

export default Address;
