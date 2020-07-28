import React, { useState, useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from 'components/Icons';
import StepFlow from 'components/StepFlow';

import Button from 'components/Button';
import { BottomModal } from 'components/Modal';
import Input from 'components/Input';
import { CircledPlusIcon, CircledCheckIcon, CloseIcon } from 'components/Icons';

import { emailValidation } from 'utitlity/helper';
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

type TEmailItem = {
  seqNo: number | null;
  emailAddress: string | null;
  isActive: number | null;
  emailType: string | null;
};

const SelectEmail: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [emailList, setemailList] = useState<Array<TEmailItem>>([]);
  const [email, setEmail] = useState<string>('');
  const [openModal, setopenModal] = useState(false);
  const [newEmail, setnewEmail] = useState('');
  const [invalidEmail, setinvalidEmail] = useState(false);
  const history = useHistory();

  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    setemailList(
      plApplication.data.list.emailInformationDetails.filter(
        (email) => email.emailType === 'PERSONAL'
      )
    );
  }, [plApplication]);

  const isDisable = () => {
    return !email;
  };

  const addNewEmail = () => {
    if (emailValidation(newEmail)) {
      setemailList([
        ...emailList,
        {
          emailAddress: newEmail,
          emailType: 'PERSONAL',
          seqNo: new Date().getTime(),
          isActive: 0,
        },
      ]);
      setopenModal(false);
      setEmail(newEmail);
    } else {
      setinvalidEmail(true);
    }
  };

  return (
    <>
      <Link to="/apply/12" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={13} />
      <div className="mmk-loan-email-select">
        <h3 className="color-text-blue-dark">Select contact email address</h3>
        <div className="mt-24" style={{ width: '100%', textAlign: 'left' }}>
          <label>Select an email</label>
        </div>
        {emailList.map((item, index) => (
          <div
            className="mmk-loan-email-select-item"
            key={index.toString()}
            onClick={() => setEmail(item.emailAddress || '')}
          >
            <div className="mmk-loan-email-select-item-text">
              {item.emailAddress}
            </div>

            <CircledCheckIcon
              color={item.emailAddress === email ? '#37d47e' : '#e2e2e2'}
              checked={item.emailAddress === email}
            />
          </div>
        ))}
        <div
          className="mmk-loan-email-select-add"
          onClick={() => setopenModal(true)}
        >
          <h6>ADD NEW EMAIL</h6>
          <CircledPlusIcon color="#3ba3ff" />
        </div>

        <div className="flex-1"></div>
        <div className="next-btn-wrapper">
          <Button
            text="NEXT"
            disabled={isDisable()}
            onClick={() => history.push('/apply/14')}
          />
        </div>
        {openModal && (
          <BottomModal>
            <div
              onClick={() => setopenModal(false)}
              className="mmk-company-modal-close"
            >
              <CloseIcon />
            </div>
            <h3 className="mmk-company-modal-title">Add new email</h3>
            <div className="mmk-company-modal-types">
              <Input
                placeholder="Enter your email"
                onChange={(email) => setnewEmail(email)}
                error={invalidEmail}
              />
              <Button
                disabled={!newEmail}
                className="mt-16 mb-32"
                text="ADD THIS EMAIL"
                onClick={addNewEmail}
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
      savePLApplication: (param) => saveApplication(param),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectEmail);
