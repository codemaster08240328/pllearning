import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  SuitcaseIcon,
  UserSmileIcon,
  BackIcon,
  CloseIcon,
} from '../../components/Icons';
import StepFlow from '../../components/StepFlow';
import { Modal } from '../../components/Modal';
import Button from '../../components/Button';

import { getPLApplicationDetails } from '../../services/getPLApplication/service';
import { IPLAppData } from '../../services/getPLApplication/types';
import { savePLApplicationDetails } from '../../services/saveApplication/service';
import { IParam } from '../../services/saveApplication/types';

import ErrorIconSmall from '../../assets/error.png';
import ErrorIconMedium from '../../assets/error@2x.png';
import ErrorIconLarge from '../../assets/error@3x.png';

type TSelectItem = {
  Icon: React.FC<{ color?: string }>;
  text: string;
  value: number;
};

const items = [
  {
    icon: SuitcaseIcon,
    text: 'Salaried',
    value: 1,
  },
  {
    icon: UserSmileIcon,
    text: 'Self Employed',
    value: 0,
  },
];

const IncomeType = () => {
  const [type, setType] = useState<number | undefined>(undefined);
  const [openModal, setopenModal] = useState(false);
  const [plApp, setplApp] = useState<IPLAppData>();
  const history = useHistory();

  useEffect(() => {
    getPLApplicationDetails().then((res) => {
      console.log('res--->', res);
      setplApp(res);
      setType(res.data.list.applicationDetails.employmentType || undefined);
    });
  }, []);

  const selectType = (type: number) => {
    setType(type);

    if (type === 0) {
      setopenModal(true);
    } else {
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
        param.employmentType = type || null;

        savePLApplicationDetails(param).then((res) => {
          console.log(res);
          history.push('/apply/4');
        });
      }
    }
  };

  const SelectItem: React.FC<TSelectItem> = ({ Icon, text, value }) => {
    let className = 'mmk-income-type-item ';
    if (type === value) {
      className += 'item-clicked ';
    }

    return (
      <div
        className={className}
        onClick={() => {
          selectType(value);
        }}
      >
        <Icon color={type === value ? '#fff' : undefined} />
        <label>{text}</label>
      </div>
    );
  };

  return (
    <>
      <Link to={'/apply/2'} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={10} step={3} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">How is your income type?</h3>

        <div className="mmk-income-type">
          {items.map((item) => (
            <SelectItem
              Icon={item.icon}
              key={item.text}
              text={item.text}
              value={item.value}
            />
          ))}
        </div>
      </div>
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
          <h3 className="mmk-modal-content-title">Sorry,</h3>
          <div className="mmk-modal-content-desc">
            We are presently unable to fetch the best personal loan deals for
            our self-employed customers.
          </div>

          <h5 className="mt-24 mmk-modal-sorry">
            Don't worry!
            <br />
            We can get you a Low interest rate Gold Loan in 1 day.
          </h5>

          <div className="mt-16 mb-24 mmk-bank-salary-modal-gold-loan">
            <Button text="WHAT IS GOLD LOAN?" />
          </div>
        </Modal>
      )}
    </>
  );
};

export default IncomeType;
