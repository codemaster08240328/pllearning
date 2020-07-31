import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { TRouterParam } from '../Apply/types';

import Table from 'components/Table';
import { TFieldItem, TItem } from 'components/Table/types';
import Button from 'components/Button';
import { BackIcon, CheckGreyIcon, CloseIcon } from 'components/Icons';

import { IPLAppData } from 'services/getPLApplication/types';
import { ILoading } from 'redux/reducers/types';
import { IPLAppState } from 'redux/reducers';

import { getUploadedDocu } from 'services/getDocuments/service';
import { IParam, TDocumentInfo } from 'services/getDocuments/types';

import { years as loanDurations } from '../Apply/LoanDuration';
import { years as addressDuration } from '../Apply/AddressDuration';
import { docuTypes } from '../Apply/UploadDocu';

import './ApplicationSummary.scss';
import { createLeadAtBank } from 'services/createLeadAtBank/service';
import { submitPLOnline } from 'services/submitPLOnline/service';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

const ApplicationSummary: React.FC<StateProps> = ({ plApplication }) => {
  const [documents, setDocuments] = useState<Array<TDocumentInfo>>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const history = useHistory();
  const { type } = useParams<TRouterParam>();

  useEffect(() => {
    const param: IParam = {
      appID: (plApplication.data.list.appID || 0).toString(),
    };

    getUploadedDocu(param).then((res) => {
      console.log(res);
      setDocuments(res.documentInfo);
    });
  }, [plApplication]);

  const residenceAddress = plApplication.data.list.addressInformationDetails.filter(
    (item) => item.addressType === 'RESIDENCE' && item.isActive === 1
  )[0];

  const loanDetails: TItem = {
    'loan-amount': `₹ ${
      plApplication.data.list.applicationDetails.requiredPLAmount || ''
    }`,
    'time-to-repay': loanDurations.filter(
      (item) => plApplication.data.list.applicationDetails.repayableYears || ''
    )[0]?.label,
    'income-type':
      plApplication.data.list.applicationDetails.employerType || '',
    'salary-per-month': `₹ ${
      plApplication.data.list.applicationDetails.netMonthlySalary || ''
    }`,
    'company-name':
      plApplication.data.list.applicationDetails.employerName || '',
    'salary-account':
      plApplication.data.list.applicationDetails.salaryCreditBank || '',
  };

  const addressDummyData: TItem = {
    pin: residenceAddress?.zipCode || '',
    address: `${residenceAddress?.addressLine1 || ''}, ${
      residenceAddress?.addressLine2 || ''
    }`,
    city: residenceAddress?.city || '',
    state: residenceAddress?.state || '',
    'years-at-address':
      addressDuration.filter(
        (item) =>
          item.value ===
            plApplication.data.list.applicationDetails.yrsAtCurrentResidence ||
          ''
      )[0]?.label || '',
    'years-at-city':
      addressDuration.filter(
        (item) =>
          item.value ===
            plApplication.data.list.applicationDetails.yrsAtCurrentCity || ''
      )[0]?.label || '',
  };

  const renderLoanDetailTable = () => {
    const fields: Array<TFieldItem> = [
      {
        key: 'loan-amount',
        label: 'Loan Amount',
      },
      {
        key: 'time-to-repay',
        label: 'Time To Repay',
      },
      {
        key: 'income-type',
        label: 'Income Type',
      },
      {
        key: 'salary-per-month',
        label: 'Salary Per Month',
      },
      {
        key: 'company-name',
        label: 'Company Name',
      },
      {
        key: 'salary-account',
        label: 'Salary Account',
      },
    ];

    return <Table fields={fields} items={loanDetails} />;
  };

  const renderAddress = () => {
    const fields: Array<TFieldItem> = [
      {
        key: 'pin',
        label: 'PIN Code',
      },
      {
        key: 'address',
        label: 'Address',
      },
      {
        key: 'city',
        label: 'City',
      },
      {
        key: 'state',
        label: 'State',
      },
      {
        key: 'years-at-address',
        label: 'Years at address',
      },
      {
        key: 'years-at-city',
        label: 'Years at City',
      },
    ];

    return <Table fields={fields} items={addressDummyData} />;
  };

  const renderDocumentTable = () => {
    const fields: Array<TFieldItem> = [
      {
        key: 'document-1',
        label: 'Document 1',
        error: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[0].toLowerCase())
          ).length;

          return isMissing;
        },
        component: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[0].toLowerCase())
          ).length;
          if (isMissing) {
            return (
              <div className="document-table-value">
                <div className="document-table-value-txt">Missing</div>
                <CloseIcon color="#d54c4c" size="16" />
              </div>
            );
          }
          return (
            <div className="document-table-value">
              <div className="document-table-value-txt">Uploaded</div>
              <CheckGreyIcon color="#37d47e" />
            </div>
          );
        },
      },
      {
        key: 'document-2',
        label: 'Document 2',
        error: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[1].toLowerCase())
          ).length;

          return isMissing;
        },
        component: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[1].toLowerCase())
          ).length;
          if (isMissing) {
            return (
              <div className="document-table-value">
                <div className="document-table-value-txt">Missing</div>
                <CloseIcon color="#d54c4c" size="16" />
              </div>
            );
          }
          return (
            <div className="document-table-value">
              <div className="document-table-value-txt">Uploaded</div>
              <CheckGreyIcon color="#37d47e" />
            </div>
          );
        },
      },
      {
        key: 'document-3',
        label: 'Document 3',
        error: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[2].toLowerCase())
          ).length;

          return isMissing;
        },
        component: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[2].toLowerCase())
          ).length;
          if (isMissing) {
            return (
              <div className="document-table-value">
                <div className="document-table-value-txt">Missing</div>
                <CloseIcon color="#d54c4c" size="16" />
              </div>
            );
          }
          return (
            <div className="document-table-value">
              <div className="document-table-value-txt">Uploaded</div>
              <CheckGreyIcon color="#37d47e" />
            </div>
          );
        },
      },
      {
        key: 'document-4',
        label: 'Document 4',
        error: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[3].toLowerCase())
          ).length;

          return isMissing;
        },
        component: () => {
          const isMissing = !documents.filter((item) =>
            item.documentType?.includes(docuTypes[3].toLowerCase())
          ).length;
          if (isMissing) {
            return (
              <div className="document-table-value">
                <div className="document-table-value-txt">Missing</div>
                <CloseIcon color="#d54c4c" size="16" />
              </div>
            );
          }
          return (
            <div className="document-table-value">
              <div className="document-table-value-txt">Uploaded</div>
              <CheckGreyIcon color="#37d47e" />
            </div>
          );
        },
      },
    ];

    return <Table fields={fields} />;
  };

  const onNext = () => {
    const appID = plApplication.data.list.appID;
    if (checkDisable()) {
      createLeadAtBank(appID?.toString() || '');
      history.push('/application-pending');
      return;
    }

    submitPLOnline(appID?.toString() || '');
    history.push('/application-approved');
  };

  const checkDisable = () => {
    let res = false;

    docuTypes.forEach((type) => {
      const docs = documents.filter((item) =>
        item.documentType?.includes(type.toLowerCase())
      );
      res = res || !docs.length;
    });

    return res;
  };

  const isDisable = () => {
    if (checkDisable()) {
      return false;
    } else if (isChecked) {
      return false;
    }

    return true;
  };

  return (
    <div className="application-summary">
      <Link to="/application-saved" className="go-back">
        <BackIcon size={24} />
      </Link>
      <div className="application-summary-content">
        <h3 className="color-text-blue-dark">Application Summary</h3>
        <div className="application-summary-table">
          <label className="ml-16 mb-8">Loan Details</label>
          {renderLoanDetailTable()}
        </div>
        <div className="application-summary-table">
          <label className="ml-16 mb-8">Residence address</label>
          {renderAddress()}
        </div>
        <div className="application-summary-table">
          <label className="ml-16 mb-8">Documents</label>
          {renderDocumentTable()}
        </div>

        {!checkDisable() && (
          <div className="app-summary-checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="checkbox">
              By clicking on the button, you acknowledge that your application
              will be sent to HDFC Bank and that the bank will request your
              credit score from the credit bureau. This can negatively affect
              your credit score. Incorrect information will lead to rejection of
              your application.
            </label>
          </div>
        )}

        <div className="application-summary-action">
          {checkDisable() && (
            <Button
              onClick={() => history.push(`/apply/15/${type}`)}
              text="CONTINUE UPLOAD"
              className="mb-8"
              type="ghost"
            />
          )}
          {!checkDisable() && (
            <Button
              text="SUBMIT MY APPLICATION"
              onClick={onNext}
              disabled={isDisable()}
            />
          )}
          {checkDisable() && (
            <Button
              text="GET MY LOAN OFFER"
              onClick={onNext}
              disabled={isDisable()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (action: IPLAppState): StateProps => {
  return { plApplication: action.plApplicationDetail };
};

export default connect(mapStateToProps)(ApplicationSummary);
