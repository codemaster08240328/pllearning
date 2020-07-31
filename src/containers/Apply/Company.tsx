import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import Button from 'components/Button';
import { AlertIcon, ArrowIcon, CloseIcon, BackIcon } from 'components/Icons';
import Select from 'components/Select';
import { TOption } from 'components/Select/types';
import { BottomModal, Modal } from 'components/Modal';
import StepFlow from 'components/StepFlow';
import { TRouterParam } from './types';

import { getCompanyList } from 'services/getCompanyList/service';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { saveApplication } from 'redux/actions/plApplication';

import ErrorIconSmall from 'assets/error.png';
import ErrorIconMedium from 'assets/error@2x.png';
import ErrorIconLarge from 'assets/error@3x.png';

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
  const [openModal, setopenModal] = useState(false);
  const [options, setoptions] = useState<Array<TOption>>([]);
  const history = useHistory();

  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push(`/apply/6/short`);
    }

    if (!!plApplication.data.list.applicationDetails.employerName) {
      setCompany({
        value: plApplication.data.list.applicationDetails.employerName,
        label: plApplication.data.list.applicationDetails.employerName,
      });
    } else if (!!plApplication.data.list.applicationDetails.organizationType) {
      setCompany({
        value: noMatchOption.value,
        label: noMatchOption.label,
      });
    }

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
    const previousEmployerName =
      plApplication.data.list.applicationDetails.employerName;

    if (
      (previousEmployerName === '' && company?.label !== noMatchOption.label) ||
      (previousEmployerName !== '' && company?.label === noMatchOption.label)
    ) {
      setopenModal(true);
      return;
    }
    changeAnyway();
  };

  const changeAnyway = () => {
    setopenModal(false);
    const param: IParam = {
      employerName: company
        ? company.value === noMatchOption.value
          ? ''
          : company.label
        : null,
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
      <StepFlow total={10} step={5} />
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
        {openModal && (
          <Modal>
            <div
              onClick={() => setopenModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <div className="mmk-modal-content-img">
              <img
                width="72"
                height="72"
                src={ErrorIconSmall}
                srcSet={`${ErrorIconMedium}, ${ErrorIconLarge}`}
              />
            </div>
            <h3 className="mmk-modal-content-title">Are you sure?</h3>
            <div className="mmk-modal-content-desc">
              You might lose your previous offer if you change this information
            </div>

            <div className="mt-24 mb-16 mmk-bank-salary-modal-gold-loan">
              <Button text="CANCEL" onClick={() => setopenModal(false)} />
            </div>
            <div
              className="mb-24 color-text-blue-dark"
              style={{ letterSpacing: '2px' }}
              onClick={changeAnyway}
            >
              CHANGE ANYWAY
            </div>
          </Modal>
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
