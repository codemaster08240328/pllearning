import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { useHistory, Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import { CurrencyIcon, BackIcon, CloseIcon } from 'components/Icons';
import { Modal } from 'components/Modal';
import StepFlow from 'components/StepFlow';

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

const Salary: React.FC<StateProps & DispatchProps> = ({
  plApplication,
  savePLApplication,
}) => {
  const [salary, setSalary] = useState<string | undefined>(undefined);
  const [openModal, setopenModal] = useState(false);
  const history = useHistory();
  const previousLoading = usePrevious(plApplication.loading);

  useEffect(() => {
    if (previousLoading) {
      history.push('/apply/5/short');
    }

    setSalary(
      plApplication.data.list.applicationDetails.netMonthlySalary || undefined
    );
  }, [plApplication]);

  const onNext = () => {
    const previousSalary =
      plApplication.data.list.applicationDetails.netMonthlySalary;

    if (
      (parseInt(previousSalary || '0') >= 30000 &&
        parseInt(salary || '0') < 30000) ||
      (parseInt(previousSalary || '0') < 30000 &&
        parseInt(salary || '0') >= 30000)
    ) {
      setopenModal(true);
      return;
    }
    changeAnyway();
  };

  const changeAnyway = () => {
    setopenModal(false);
    const param: IParam = {
      netMonthlySalary: salary || null,
    };

    savePLApplication(param);
  };

  return (
    <>
      <Link to={'/apply/3'} className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={10} step={4} />
      <div className="mmk-loan-apply-content-wrapper">
        <h3 className="color-text-blue-dark">
          What is the salary deposited in your bank every month?
        </h3>
        <div className="mt-16">
          <Input
            placeholder="25,000 to 10,000,000"
            leftIcon={<CurrencyIcon size={48} />}
            onChange={(value) => setSalary(value)}
            type="number"
            value={salary}
          />
        </div>
        <div className="flex-1" />
        <div className="next-btn-wrapper">
          <Button
            text="NEXT"
            disabled={!salary}
            onClick={onNext}
            loading={plApplication.loading}
          />
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
          <h3 className="mmk-modal-content-title">Are you sure?</h3>
          <div className="mmk-modal-content-desc">
            You might lose your previous offer if you change this information
          </div>

          <div className="mt-24 mb-16 mmk-bank-salary-modal-gold-loan">
            <Button text="CANCEL" onClick={() => setopenModal(false)} />
          </div>
          <div
            className="mb-24 color-text-blue-dark"
            style={{ letterSpacing: '2px', textAlign: 'center' }}
            onClick={changeAnyway}
          >
            CHANGE ANYWAY
          </div>
        </Modal>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Salary);
