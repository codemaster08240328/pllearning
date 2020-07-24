import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Button from '../../components/Button';
import {
  AlertIcon,
  ArrowIcon,
  CloseIcon,
  BackIcon,
} from '../../components/Icons';
import Select from '../../components/Select';
import { TOption } from '../../components/Select/types';
import { BottomModal } from '../../components/Modal';
import StepFlow from '../../components/StepFlow';
import { TRouterParam } from './types';

import { getPLApplicationDetails } from '../../services/getPLApplication/service';
import { IPLAppData } from '../../services/getPLApplication/types';
import { savePLApplicationDetails } from '../../services/saveApplication/service';
import { IParam } from '../../services/saveApplication/types';

const options: Array<TOption> = [
  {
    value: 'company1',
    label: 'Company1',
  },
  {
    value: 'company2',
    label: 'Company2',
  },
];

const noMatchOption = {
  value: 'none',
  label: 'My company is not in the list',
};

const companyTypes = [
  { type: 'LCT04', label: 'Private Company' },
  { type: 'LCT05', label: 'Government Company' },
  { type: 'LCT03', label: 'Partnership' },
  { type: 'LCT06', label: 'Sole Proprietorship' },
];

const Company = () => {
  const [company, setCompany] = useState<string | undefined>(undefined);
  const [companyType, setCompanyType] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [plApp, setplApp] = useState<IPLAppData>();
  const history = useHistory();
  const { type } = useParams<TRouterParam>();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setCompany(res.data.list.applicationDetails.employerName || undefined);
    });
  }, []);

  const onNext = () => {
    setloading(true);

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
      param.employerName = company || null;
      param.organizationType = companyType || null;

      savePLApplicationDetails(param).then((res) => {
        console.log(res);
        setloading(false);
        history.push(`/apply/6/${type}`);
      });
    }
  };

  const checkDisabled = () => {
    let disabled = !company;
    disabled = disabled || company === 'none';
    disabled = disabled && !companyType;

    return disabled;
  };

  return (
    <>
      <Link to={'/apply/4'} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={type === 'short' ? 10 : 15} step={5} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">Which company do you work for?</h3>
        <div className="mt-16">
          <Select
            options={options}
            placeholder="Type your company name"
            noMatch={noMatchOption}
            onSelect={(value) => {
              setCompany(value);
              setCompanyType(undefined);
            }}
            value={company}
          />
        </div>
        {company === 'none' && (
          <div className="mmk-company-warn mt-8">
            <AlertIcon color={'#f9da4b'} />
            <div className="mmk-company-warn-text">
              You're not eligible for a fast track application. Make sure you've
              double checked the list.
            </div>
          </div>
        )}
        {company === 'none' && (
          <div
            className="mmk-company-type mt-32"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <div>
              <span className="mmk-company-type-value">{companyType}</span>
              {!companyType && (
                <span className="mmk-company-type-placeholder">
                  Select type of your company
                </span>
              )}
            </div>
            <div>
              <ArrowIcon direction="down" />
            </div>
          </div>
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
        {modalOpen && (
          <BottomModal>
            <div
              onClick={() => setModalOpen(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <h3 className="mmk-company-modal-title">
              Select type of your company
            </h3>
            <div className="mmk-company-modal-types">
              {companyTypes.map((item, index) => (
                <div
                  onClick={() => {
                    setCompanyType(item.label);
                    setTimeout(() => setModalOpen(false), 100);
                  }}
                  className="mmk-loan-duration-item"
                  key={index.toString()}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </BottomModal>
        )}
      </div>
    </>
  );
};

export default Company;
