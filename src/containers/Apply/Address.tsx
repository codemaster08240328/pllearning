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
import { saveApplication, addAddress } from 'redux/actions/plApplication';
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

  return res.map((item) => item.zipCode);
};

const Address: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  addPLAddress,
}) => {
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
    addressType: 'RESIDENCE',
  });
  const [openAddressDetail, setOpenAddressDetail] = useState<boolean>(false);
  const [validPin, setvalidPin] = useState(true);
  const [pinFound, setpinFound] = useState(true);
  const [openNewAddModal, setopenNewAddModal] = useState(false);
  const [flat, setflat] = useState('');
  const [street, setstreet] = useState('');
  const [pinCodeList, setpinCodeList] = useState<Array<string | null>>([]);
  const [addressList, setaddressList] = useState<Array<TAddressDetail>>([]);

  const [city, setcity] = useState<string>('');
  const [state, setstate] = useState<string>('');

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
    setPinInput(pinCode || '');
    setpinCodeList(
      getPINCodeList(plApplication.data.list.addressInformationDetails)
    );

    if (!!pinCode) {
      setOpenModal(false);

      const list =
        plApplication.data.list.addressInformationDetails.filter(
          (address) =>
            address.zipCode === pinCode && address.addressType === 'RESIDENCE'
        ) || [];

      console.log(list);

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
    setOpenAddressDetail(true);
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
    console.log(item);
    setPinInput(item);
    setPin(item);

    setaddressList(
      plApplication.data.list.addressInformationDetails.filter(
        (address) =>
          address.zipCode === item && address.addressType === 'RESIDENCE'
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

    setEnterPin(false);
    setOpenAddressDetail(false);
    setTimeout(() => setOpenModal(false), 100);
  };

  const onNext = () => {
    if (!pinCodeValidation(pin)) {
      setvalidPin(false);
      return;
    }

    let param: IParam = {};

    console.log(enterPin);

    if (!enterPin) {
      console.log(addressList);
      param = {
        addressInformation: [
          ...plApplication.data.list.addressInformationDetails.filter(
            (item) => item.addressType !== 'RESIDENCE'
          ),
          ...addressList,
        ],
      };
    } else {
      param = {
        addressInformation: [
          ...plApplication.data.list.addressInformationDetails.map((item) => {
            if (item.addressType === 'RESIDENCE') {
              return {
                addressLine1: item.addressLine1,
                addressLine2: item.addressLine2,
                seqNo: item.seqNo,
                city: item.city,
                state: item.state,
                addressType: item.addressType,
                zipCode: item.zipCode,
                source: item.source,
                isActive: 0,
              };
            }

            return item;
          }),
          {
            zipCode: pin,
            addressLine1: flat,
            addressLine2: street,
            city: city,
            state: state,
            isActive: 1,
            source: 'CUSTINPUT',
            addressType: 'RESIDENCE',
            seqNo: -new Date().getTime(),
          },
        ],
      };
    }

    console.log(param);

    addPLAddress(param);
  };

  const checkDisabled = () => {
    let res = !!pinInput && !enterPin;

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
                onChange={enterPinCode}
                placeholder="Enter your 6 digit PIN code"
                value={pin || undefined}
                type="number"
                error={!validPin}
              />
            </div>
          </>
        )}
        {openAddressDetail && pinFound && (
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
                      ? flat
                      : index === 1
                      ? street
                      : index === 2
                      ? city
                      : state
                  }
                  disabled={index > 1}
                  placeholder={item.placeholder}
                  onChange={(value) => {
                    if (index === 0) {
                      setflat(value);
                    } else {
                      setstreet(value);
                    }
                    setAddress({
                      city: city,
                      state: state,
                      zipCode: pin,
                      addressType: 'RESIDENCE',
                      seqNo: new Date().getTime(),
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

        {openAddressDetail && !pinFound && (
          <div className="pin-notfound">Pincode not found</div>
        )}
        {!!pinInput && !enterPin && (
          <>
            <div className="mt-24" style={{ width: '100%', textAlign: 'left' }}>
              <label>Select your current address</label>
            </div>
            {addressList.map((address, index) => (
              <div
                className="mmk-address-item"
                key={index.toString()}
                onClick={() => {
                  setaddressList([
                    ...addressList.map((item) => {
                      if (item.seqNo === address.seqNo) {
                        return {
                          addressLine1: item.addressLine1,
                          addressLine2: item.addressLine2,
                          seqNo: item.seqNo,
                          city: item.city,
                          state: item.state,
                          addressType: item.addressType,
                          zipCode: item.zipCode,
                          source: item.source,
                          isActive: 1,
                        };
                      }
                      return {
                        addressLine1: item.addressLine1,
                        addressLine2: item.addressLine2,
                        seqNo: item.seqNo,
                        city: item.city,
                        state: item.state,
                        addressType: item.addressType,
                        zipCode: item.zipCode,
                        source: item.source,
                        isActive: 0,
                      };
                    }),
                  ]);
                }}
              >
                <div className="mmk-address-item-text">{`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.zipCode}`}</div>
                <CircledCheckIcon
                  color={address.isActive === 1 ? '#37d47e' : '#e2e2e2'}
                  checked={address.isActive === 1}
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
            loading={plApplication.loading}
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
                  setPin(null);
                  setEnterPin(true);
                  setPinInput('Add new PIN code');
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
                  setaddressList([
                    ...addressList.map((address) => ({
                      addressLine1: address.addressLine1,
                      addressLine2: address.addressLine2,
                      seqNo: address.seqNo,
                      city: address.city,
                      state: address.state,
                      addressType: address.addressType,
                      zipCode: address.zipCode,
                      source: address.source,
                      isActive: 0,
                    })),
                    {
                      addressLine1: flat,
                      addressLine2: street,
                      seqNo: -new Date().getTime(),
                      city: getAddressInfoFromPIN(pin || '').city || '',
                      state: getAddressInfoFromPIN(pin || '').state || '',
                      zipCode: pin,
                      addressType: 'RESIDENCE',
                      isActive: 1,
                      source: 'CUSTINPUT',
                    },
                  ]);
                  setopenNewAddModal(false);
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
