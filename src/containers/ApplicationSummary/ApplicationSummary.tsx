import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/Table';
import { TFieldItem, TItem } from 'components/Table/types';
import Button from 'components/Button';
import { BackIcon, CheckGreyIcon } from 'components/Icons';

import './ApplicationSummary.scss';

const loanDummyDetails: TItem = {
  'loan-amount': '₹ 100,000',
  'time-to-repay': '2 years',
  'income-type': 'Salary',
  'salary-per-month': '₹ 30,000',
  'company-name': 'ABC',
  'salary-account': 'HDFC',
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

  return <Table fields={fields} items={loanDummyDetails} />;
};

const addressDummyData: TItem = {
  pin: '111111',
  address: '8A, 4/F, A Building, 2 A street',
  city: 'New Delhi',
  state: 'Delhi',
  'years-at-address': 'Less than 1 year',
  'years-at-city': 'Less than 1 year',
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

const employerDummyData: TItem = {
  email: 'test@mmk.com',
  'office-address': '8A, 4/F, A Building, 2 A street',
  city: 'New Delhi',
  state: 'Delhi',
  pin: '111111',
};

const renderEmployerTable = () => {
  const fields: Array<TFieldItem> = [
    {
      key: 'email',
      label: 'Work email',
    },
    {
      key: 'office-address',
      label: 'Office address',
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
      key: 'pin',
      label: 'PIN code',
    },
  ];

  return <Table items={employerDummyData} fields={fields} />;
};

const addInformationDummy: TItem = {
  'number-dependants': '1 person',
  education: 'Bachelor',
  'email-approval': 'test@mmk.com',
};

const renderAddInformationTable = () => {
  const fields: Array<TFieldItem> = [
    {
      key: 'number-dependants',
      label: 'No. of dependants',
    },
    {
      key: 'education',
      label: 'Education',
    },
    {
      key: 'email-approval',
      label: 'Email approval',
    },
  ];

  return <Table items={addInformationDummy} fields={fields} />;
};

const renderDocumentTable = () => {
  const fields: Array<TFieldItem> = [
    {
      key: 'document-1',
      label: 'Document 1',
      component: (
        <div className="document-table-value">
          <div className="document-table-value-txt">Uploaded</div>
          <CheckGreyIcon />
        </div>
      ),
    },
    {
      key: 'document-2',
      label: 'Document 2',
      component: (
        <div className="document-table-value">
          <div className="document-table-value-txt">Uploaded</div>
          <CheckGreyIcon />
        </div>
      ),
    },
    {
      key: 'document-3',
      label: 'Document 3',
      component: (
        <div className="document-table-value">
          <div className="document-table-value-txt">Uploaded</div>
          <CheckGreyIcon />
        </div>
      ),
    },
    {
      key: 'document-4',
      label: 'Document 4',
      component: (
        <div className="document-table-value">
          <div className="document-table-value-txt">Uploaded</div>
          <CheckGreyIcon />
        </div>
      ),
    },
  ];

  return <Table fields={fields} />;
};

const ApplicationSummary = () => {
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
          <label className="ml-16 mb-8">Employer</label>
          {renderEmployerTable()}
        </div>
        <div className="application-summary-table">
          <label className="ml-16 mb-8">Additional Information</label>
          {renderAddInformationTable()}
        </div>
        <div className="application-summary-table">
          <label className="ml-16 mb-8">Documents</label>
          {renderDocumentTable()}
        </div>

        <div className="application-summary-action">
          <Button text="GET MY LOAN OFFER" />
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummary;
