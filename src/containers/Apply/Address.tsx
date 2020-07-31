import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import Button from 'components/Button';
import { BottomModal } from 'components/Modal';
import StepFlow from 'components/StepFlow';
import {
  CloseIcon,
  ArrowIcon,
  CircledCheckIcon,
  CircledPlusIcon,
  BackIcon,
} from 'components/Icons';
import Input from 'components/Input';
import { pinCodeValidation } from 'utitlity/helper';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { addAddress } from 'redux/actions/plApplication';
import { TRouterParam } from './types';
import { getPINCodeDetail } from 'services/getPINCodeDetails/service';

import { usePrevious } from 'utitlity/helper';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  addPLAddress: (param: IParam) => void;
}

const INF = Math.pow(10, 1000);

type TAddressDetail = {
  city: string | null;
  state: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  zipCode: string | null;
  seqNo: number | null;
  addressType: string | null;
  isActive: number | null;
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

  return res
    .map((item) => item.zipCode)
    .filter((v, i, a) => a.indexOf(v) === i);
};

const Address: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  addPLAddress,
}) => {
  const [openPinModal, setOpenPinModal] = useState<boolean>(true);
  const [pin, setPin] = useState<string | null>('');
  const [newPin, setNewPin] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');

  const [city, setcity] = useState<string>('');
  const [state, setstate] = useState<string>('');
  const [validPin, setvalidPin] = useState(true);
  const [pinFound, setpinFound] = useState(true);
  const [openNewAddModal, setopenNewAddModal] = useState(false);
  const [pinCodeList, setpinCodeList] = useState<Array<string | null>>([]);

  const [addressList, setaddressList] = useState<Array<TAddressDetail>>([]);
  const [selectedAddressNo, setSelectedAddressNo] = useState<number | null>(
    null
  );

  const history = useHistory();
  const { type } = useParams<TRouterParam>();
  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push(`/apply/8/${type}`);
    }

    const pinCode =
      plApplication.data.list.addressInformationDetails.filter(
        (address) =>
          address.isActive === 1 && address.addressType === 'RESIDENCE'
      )[0]?.zipCode || '';

    setPin(pinCode || '');
    setpinCodeList(
      getPINCodeList(plApplication.data.list.addressInformationDetails)
    );

    if (!!pinCode) {
      setOpenPinModal(false);

      const list =
        plApplication.data.list.addressInformationDetails.filter(
          (address) =>
            address.zipCode === pinCode && address.addressType === 'RESIDENCE'
        ) || [];

      list.forEach((item) => {
        if (item.isActive === 1) {
          console.log('called');
          setSelectedAddressNo(item.seqNo);
        }
      });

      setaddressList(list);
    }
  }, [plApplication]);

  const getAddressInfoFromPIN = (
    pin: string
  ): {
    [key: string]: string;
  } => {
    const address = plApplication?.data.list.addressInformationDetails.filter(
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
      setcity(res.data.city || '');
      setstate(res.data.state || '');
    }
  };

  const onSelectPin = (item: string | null) => {
    setNewPin(false);
    setPin(item);

    setaddressList(
      plApplication.data.list.addressInformationDetails.filter(
        (address) =>
          address.zipCode === item && address.addressType === 'RESIDENCE'
      ) || []
    );

    setTimeout(() => setOpenPinModal(false), 100);
  };

  const onNext = () => {
    if (!pinCodeValidation(pin)) {
      setvalidPin(false);
      return;
    }

    if (newPin) {
      const param: IParam = {
        addressInformation: [
          ...plApplication.data.list.addressInformationDetails.map(
            (address) => {
              if (address.addressType === 'RESIDENCE') {
                address.isActive = 0;
              }

              return address;
            }
          ),
          {
            zipCode: pin,
            city: city,
            state: state,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            seqNo: -new Date().getTime(),
            addressType: 'RESIDENCE',
            isActive: 1,
            source: 'CUSTINPUT',
          },
        ],
      };

      addPLAddress(param);
    } else if (newAddress) {
      const param: IParam = {
        addressInformation: [
          ...plApplication.data.list.addressInformationDetails.map(
            (address) => {
              if (address.addressType === 'RESIDENCE') {
                address.isActive = 0;
              }

              return address;
            }
          ),
          {
            zipCode: pin,
            city,
            state,
            addressLine1,
            addressLine2,
            seqNo: -1,
            addressType: 'RESIDENCE',
            isActive: 1,
            source: 'CUSTINPUT',
          },
        ],
      };

      addPLAddress(param);
    } else {
      const param: IParam = {
        addressInformation: [
          ...plApplication.data.list.addressInformationDetails.map(
            (address) => {
              if (
                address.addressType === 'RESIDENCE' &&
                address.seqNo !== selectedAddressNo
              ) {
                address.isActive = 0;
              } else if (address.addressType === 'RESIDENCE') {
                address.isActive = 1;
              }

              return address;
            }
          ),
        ],
      };

      addPLAddress(param);
    }
  };

  const checkDisabled = () => {
    if (newPin) {
      return !pin || !addressLine1 || !addressLine2;
    }

    return !pin || !selectedAddressNo;
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
          onClick={() => setOpenPinModal(!openPinModal)}
        >
          <div>
            {pin && !newPin && (
              <span className="mmk-company-type-value">{pin}</span>
            )}
            {newPin && (
              <span className="mmk-company-type-value">Add new PIN code</span>
            )}
            {!pin && !newPin && (
              <span className="mmk-company-type-placeholder">
                Select your PIN code
              </span>
            )}
          </div>
          <div>
            <ArrowIcon direction="down" />
          </div>
        </div>
        {newPin && (
          <>
            <div
              className="mt-16 mb-8"
              style={{ width: '100%', textAlign: 'left' }}
            >
              <label>Enter PIN code</label>
            </div>
            <div>
              <Input
                onChange={enterPinCode}
                placeholder="Enter your 6 digit PIN code"
                value={pin || undefined}
                type="number"
                error={!validPin}
              />
            </div>
          </>
        )}
        {pin && newPin && pinFound && (
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
                    index === 0
                      ? addressLine1
                      : index === 1
                      ? addressLine2
                      : index === 2
                      ? city
                      : state
                  }
                  disabled={index > 1}
                  placeholder={item.placeholder}
                  onChange={(value) => {
                    if (index === 0) {
                      setAddressLine1(value);
                    } else {
                      setAddressLine2(value);
                    }
                    // setAddress({
                    //   city: city,
                    //   state: state,
                    //   zipCode: pin,
                    //   addressType: 'RESIDENCE',
                    //   seqNo: new Date().getTime(),
                    //   addressLine1: index === 0 ? value : flat,
                    //   addressLine2: index === 1 ? value : street,
                    //   source: 'CUSTINPUT',
                    //   isActive: 0,
                    // });
                  }}
                />
              </div>
            ))}
          </>
        )}

        {newPin && pin && !pinFound && (
          <div className="pin-notfound">Pincode not found</div>
        )}
        {!newPin && pin && (
          <>
            <div className="mt-24" style={{ width: '100%', textAlign: 'left' }}>
              <label>Select your current address</label>
            </div>
            {addressList.map((address, index) => (
              <div
                className="mmk-address-item"
                key={index.toString()}
                onClick={() => {
                  setNewPin(false);
                  setNewAddress(false);
                  setSelectedAddressNo(address.seqNo);
                  // setaddressList([
                  //   // ...addressList.map((item) => {
                  //   //   // if (item.seqNo === address.seqNo) {
                  //   //   //   return {
                  //   //   //     addressLine1: item.addressLine1,
                  //   //   //     addressLine2: item.addressLine2,
                  //   //   //     seqNo: item.seqNo,
                  //   //   //     city: item.city,
                  //   //   //     state: item.state,
                  //   //   //     addressType: item.addressType,
                  //   //   //     zipCode: item.zipCode,
                  //   //   //     source: item.source,
                  //   //   //     isActive: 1,
                  //   //   //   };
                  //   //   // }
                  //   //   // return {
                  //   //   //   addressLine1: item.addressLine1,
                  //   //   //   addressLine2: item.addressLine2,
                  //   //   //   seqNo: item.seqNo,
                  //   //   //   city: item.city,
                  //   //   //   state: item.state,
                  //   //   //   addressType: item.addressType,
                  //   //   //   zipCode: item.zipCode,
                  //   //   //   source: item.source,
                  //   //   //   isActive: 0,
                  //   //   // };
                  //   // }),
                  // ]);
                }}
              >
                <div className="mmk-address-item-text">{`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.zipCode}`}</div>
                <CircledCheckIcon
                  color={
                    address.seqNo === selectedAddressNo ? '#37d47e' : '#e2e2e2'
                  }
                  checked={address.seqNo === selectedAddressNo}
                />
              </div>
            ))}
            <div
              className="mmk-address-add"
              onClick={() => {
                setopenNewAddModal(true);
                setNewAddress(true);
                setNewPin(false);
                setcity(getAddressInfoFromPIN(pin || '').city);
                setstate(getAddressInfoFromPIN(pin || '').state);
              }}
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
            loading={plApplication.loading}
          />
        </div>
        {openPinModal && (
          <BottomModal>
            <div
              onClick={() => setOpenPinModal(false)}
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
                  setPin(null);
                  setNewPin(true);
                  setNewAddress(false);
                  setTimeout(() => setOpenPinModal(false), 100);
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
            <span className="mmk-address-modal-city">{city}</span>
            <div className="mmk-company-modal-types">
              <Input
                placeholder="Flat number, floor, building"
                className="mt-24"
                onChange={(flat) => setAddressLine1(flat)}
              />
              <Input
                placeholder="Street name, number"
                onChange={(street) => setAddressLine2(street)}
                className="mt-16"
              />
              <Button
                text="ADD THIS ADDRESS"
                className="mt-16 mb-32"
                disabled={newPin && (!addressLine1 || !addressLine2)}
                onClick={() => {
                  setaddressList([
                    ...addressList,
                    {
                      addressLine1,
                      addressLine2,
                      seqNo: -1,
                      city,
                      state,
                      zipCode: pin,
                      addressType: 'RESIDENCE',
                      isActive: 1,
                      source: 'CUSTINPUT',
                    },
                  ]);

                  setSelectedAddressNo(-1);
                  setopenNewAddModal(false);
                  onNext();
                }}
              />
            </div>
          </BottomModal>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
