import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import Button from 'components/Button';
import { AlertIcon, ArrowIcon, CloseIcon, BackIcon } from 'components/Icons';
import Select from 'components/Select';
import { TOption } from 'components/Select/types';
import { BottomModal } from 'components/Modal';
import StepFlow from 'components/StepFlow';
import { TRouterParam } from './types';

import { getCompanyList } from 'services/getCompanyList/service';

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

const noMatchOption: TOption = {
  value: 'none',
  label: 'My company is not in the list',
};

const companyTypes = [
  { type: 'LCT04', label: 'Private Company' },
  { type: 'LCT05', label: 'Government Company' },
  { type: 'LCT03', label: 'Partnership' },
  { type: 'LCT06', label: 'Sole Proprietorship' },
];

const Company: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [company, setCompany] = useState<TOption | undefined>(undefined);
  const [companyType, setCompanyType] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [options, setoptions] = useState<Array<TOption>>([]);
  const history = useHistory();
  const { type } = useParams<TRouterParam>();

  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push(`/apply/6/${type}`);
    }

    !!plApplication.data.list.applicationDetails.employerName &&
      setCompany({
        value:
          plApplication.data.list.applicationDetails.employerName ==
          noMatchOption.label
            ? 'none'
            : plApplication.data.list.applicationDetails.employerName || '',
        label: plApplication.data.list.applicationDetails.employerName || '',
      });

    setCompanyType(
      plApplication.data.list.applicationDetails.organizationType || undefined
    );
  }, [plApplication]);

  const fetchOptions = async (val: string) => {
    const res = await getCompanyList(val);
    const filteredOptions: Array<TOption> = res.data.map((item) => ({
      value: item.cin || '',
      label: item.companyName || '',
    }));

    setoptions([...filteredOptions, noMatchOption]);
  };

  const onNext = () => {
    const param: IParam = {
      employerName: company?.label || null,
      organizationType: companyType || null,
    };

    savePLApplication(param);
  };

  const checkDisabled = () => {
    let disabled = !company;
    disabled = disabled || company?.value === 'none';
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
            onSelect={(item) => {
              setCompany(item);
              setCompanyType(undefined);
            }}
            onChange={(value) => fetchOptions(value)}
            selectItem={company}
          />
        </div>
        {company && company.value === 'none' && (
          <div className="mmk-company-warn mt-8">
            <AlertIcon color={'#f9da4b'} />
            <div className="mmk-company-warn-text">
              You're not eligible for a fast track application. Make sure you've
              double checked the list.
            </div>
          </div>
        )}
        {company && company.value === 'none' && (
          <div
            className="mmk-company-type mt-32"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <div>
              {!!companyType && (
                <span className="mmk-company-type-value">
                  {companyTypes.filter((item) => item.type === companyType)[0]
                    ?.label || ''}
                </span>
              )}
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
            loading={plApplication.loading}
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
                    setCompanyType(item.type);
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

export default connect(mapStateToProps, mapDispatchToProps)(Company);
