import React, { useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';

import Select from '../../components/Select';
import { Modal, BottomModal } from '../../components/Modal';
import { CloseIcon, BackIcon } from '../../components/Icons';
import StepFlow from '../../components/StepFlow';
import { TRouterParam } from './types';

import HDFCBank from '../../assets/bank/hdfc-bank-salary.png';
import ICICIBank from '../../assets/bank/icici-bank-salary.png';
import SBIBank from '../../assets/bank/sbi-bank-salary.png';
import PNBBank from '../../assets/bank/punjab-bank-salary.png';

import ErrorIconSmall from '../../assets/error.png';
import ErrorIconMedium from '../../assets/error@2x.png';
import ErrorIconLarge from '../../assets/error@3x.png';

const bankItems = [
  { key: 'hdfc', img: HDFCBank },
  { key: 'icici', img: ICICIBank },
  { key: 'pnb', img: PNBBank },
  { key: 'sbi', img: SBIBank },
];

const BankSalary = () => {
  const [bank, setBank] = useState<string>('');
  const [isTypeBank, setIsTypeBank] = useState<boolean>(false);
  const [bankType, setBankType] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAccountModal, setopenAccountModal] = useState(false);
  const { type } = useParams<TRouterParam>();

  const history = useHistory();

  const checkDisabled = () => {
    return !bank && !bankType;
  };

  const onNext = () => {
    console.log(bank);
    if (bank !== 'hdfc') {
      setopenAccountModal(true);
    } else {
      history.push(`/apply/7/${type}`);
    }
  };

  const onYes = () => {
    history.push(`/apply/7/${type}`);
  };

  const onNo = () => {
    history.push(`/apply/7/${type}`);
  };

  return (
    <>
      <Link to={`/apply/5/${type}`} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={type === 'short' ? 10 : 15} step={6} />
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
                  setIsTypeBank(false);
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
              setIsTypeBank(true);
              setBank('');
            }}
            className={
              isTypeBank
                ? 'mmk-loan-duration-item item-clicked'
                : 'mmk-loan-duration-item'
            }
          >
            My Bank is not listed
          </div>
          {isTypeBank && (
            <Select
              options={[
                { value: 'bank1', label: 'Bank1' },
                { value: 'bank2', label: 'Bank2' },
                { value: 'bank3', label: 'Bank3' },
              ]}
              placeholder="Type your bank name"
              onSelect={(v) => setBankType(v)}
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
          <Button text="NEXT" disabled={checkDisabled()} onClick={onNext} />
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

export default BankSalary;
