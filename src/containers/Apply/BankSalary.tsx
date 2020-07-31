import React, { useState, useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import Button from 'components/Button';

import Select from 'components/Select';
import { TOption } from 'components/Select/types';
import { Modal, BottomModal } from 'components/Modal';
import { CloseIcon, BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';
import { TRouterParam } from './types';

import { IPLAppData } from 'services/getPLApplication/types';
import { IParam } from 'services/saveApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';
import { saveApplication } from 'redux/actions/plApplication';

import { usePrevious } from 'utitlity/helper';
import { fetchBankItems } from 'services/getBankList/service';

import HDFCBank from 'assets/bank/hdfc-bank-salary.png';
import ICICIBank from 'assets/bank/icici-bank-salary.png';
import SBIBank from 'assets/bank/sbi-bank-salary.png';
import PNBBank from 'assets/bank/punjab-bank-salary.png';

import ErrorIconSmall from 'assets/error.png';
import ErrorIconMedium from 'assets/error@2x.png';
import ErrorIconLarge from 'assets/error@3x.png';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  savePLApplication: (param: IParam) => void;
}

type TBankTypes = 'PREFBNK' | 'NONPREFBNK' | 'NOBNK' | string;

const bankItems = [
  { key: 'hdfcbank', img: HDFCBank },
  { key: 'icicibank', img: ICICIBank },
  { key: 'pnbbank', img: PNBBank },
  { key: 'sbibank', img: SBIBank },
];

const BankSalary: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [bank, setBank] = useState<string>('');
  const [bankType, setBankType] = useState<TBankTypes>('PREFBNK');
  const [bankListOptions, setbankListOptions] = useState<Array<TOption>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAccountModal, setopenAccountModal] = useState(false);

  const history = useHistory();

  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      const salaryAmt =
        plApplication.data.list.applicationDetails.netMonthlySalary;

      const companyName =
        plApplication.data.list.applicationDetails.employerName;

      const isFintechEligible = plApplication.data.list.isFintechEligibility;

      if (isFintechEligible === 'Y') {
        if (parseInt(salaryAmt || '0') >= 30000 && companyName !== '') {
          history.push(`/application-greatnews`);
        } else {
          history.push(`/apply/7/short`);
        }
      } else {
        history.push(`/apply/7/short`);
      }
    }

    setBank(plApplication.data.list.applicationDetails.salaryCreditBank || '');
    setBankType(
      plApplication.data.list.applicationDetails.salaryCreditedBankType || ''
    );
  }, [plApplication]);

  const checkDisabled = () => {
    return !bank;
  };

  const onNext = () => {
    if (bank !== bankItems[0].key) {
      setopenAccountModal(true);
    } else {
      saveChangedApplication('1');
    }
  };

  const onYes = () => {
    saveChangedApplication('1');
  };

  const onNo = () => {
    saveChangedApplication('0');
  };

  const saveChangedApplication = (hdfc: string) => {
    const param: IParam = {
      salaryCreditBank: bank || null,
      salaryCreditedBankType: bankType || null,
      hdfcSavingsAccount: hdfc,
    };

    savePLApplication(param);
  };

  const fetchBankList = async (value: string) => {
    const bankLists = await fetchBankItems(value);

    const bankItems: Array<TOption> = bankLists.data.map((bank) => ({
      value: bank.bankCode || '',
      label: bank.bankName || '',
    }));

    setbankListOptions(bankItems);
  };

  return (
    <>
      <Link to={`/apply/5/short`} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={10} step={6} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">
          Which bank did you receive your salary in?
        </h3>

        <div className="mmk-bank-salary-items">
          {bankItems.map((item, index) => {
            let clsName = 'mmk-bank-salary-item ';
            if (bank === item.key) {
              clsName += 'mmk-bank-salary-item-selected ';
            }
            return (
              <div
                className={clsName}
                onClick={() => {
                  setBank(item.key);
                  setBankType('PREFBNK');
                }}
                key={index.toString()}
              >
                <img src={item.img} alt={item.key} />
              </div>
            );
          })}
        </div>

        <div className="mmk-bank-salary-select">
          <div
            onClick={() => {
              setBankType('NONPREFBNK');
              setBank('');
            }}
            className={
              bankType === 'NONPREFBNK'
                ? 'mmk-loan-duration-item item-clicked'
                : 'mmk-loan-duration-item'
            }
          >
            My Bank is not listed
          </div>
          {bankType === 'NONPREFBNK' && (
            <Select
              options={bankListOptions}
              selectItem={bank ? { value: bank, label: bank } : undefined}
              placeholder="Type your bank name"
              onSelect={(v) => {
                setBank(v.label);
                setBankType('NONPREFBNK');
              }}
              onChange={(v) => fetchBankList(v)}
            />
          )}
          <div
            onClick={() => setOpenModal(true)}
            className={
              openModal
                ? 'mmk-loan-duration-item mt-16 item-clicked'
                : 'mmk-loan-duration-item mt-16'
            }
          >
            I receive salary in cash
          </div>
        </div>
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
          <Modal>
            <div
              onClick={() => setOpenModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <div className="mmk-modal-content-img">
              <img
                width="72"
                height="72"
                alt="erroricon"
                src={ErrorIconSmall}
                srcSet={`${ErrorIconMedium}, ${ErrorIconLarge}`}
              />
            </div>
            <h3 className="mmk-company-modal-title">Sorry...</h3>
            <div className="mmk-bank-salary-modal-content">
              We are unable to source the best Personal Loan deals if you
              receive your salary in cash.
            </div>
            <h5 className="mt-24 mmk-bank-salary-modal-gold-loan">
              But we can help you with Gold Loan
            </h5>
            <div className="mt-16 mb-24 mmk-bank-salary-modal-gold-loan">
              <Button text="WHAT IS GOLD LOAN?" />
            </div>
          </Modal>
        )}
        {openAccountModal && (
          <BottomModal>
            <div
              onClick={() => setopenAccountModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <h3 className="mmk-company-modal-title">
              Do you have a Savings Account with HDFC?
            </h3>

            <div className="mmk-bank-modal-actions">
              <Button text="YES" type="ghost" onClick={onYes} />

              <Button text="NO" type="ghost" onClick={onNo} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BankSalary);
