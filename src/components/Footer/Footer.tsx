import React from 'react';
import { SocialIcon } from '../../components/Icons';
import { IPropsSocialIcon } from '../../components/Icons/types';

import './Footer.scss';

const menuItems = {
  tools: [
    'About mymoneykarma',
    'Financial Tools',
    'EMI Calculator for Home Loan',
    'EMI Calculator for Car Loan',
    'EMI Calculator for Personal Loan',
    'Home loan checkup',
    'Aadhar Enabled Payment System',
    'E Wallet',
    'USSD (Unstructured Supplementary Service Data',
    'UPI (Unified Payment Interface)',
  ],

  'Bank Logins': [
    'SBI Online',
    'Aadhaar Card',
    'Axis Bank Login',
    'EPFO',
    'ICICI Bank',
    'Tax',
    'HDFC Bank',
    'Share Market',
    'ICICI netbanking',
    'Passport',
    'HDFC netbanking',
    'Driving License',
    'Aadhar Bank Login',
    'PAN',
    'Canara Bank Login',
    'Voter ID',
    'Citi Bank Login',
    'Two Wheeler',
    'IDBI Bank Login',
    'Saving Account',
    'LIC Login',
    'Recurring Deposit',
    'Indusind Bank Login',
    'Holidays',
    'Kotak Bank Login',
    'Gas',
    'Yes Bank Login',
    'EMI Calculator',
    'PNB Bank Login',
    'Mobile Banking',
    'Bank of Baroda NetBanking',
  ],

  'Gold Rate Today': [
    'Gold Rate in India',
    'Gold Rate Mumbai',
    'Gold Rate Bangalore',
    'Gold Rate Delhi',
    'Gold Rate Chennai',
    'Gold Rate Hyderabad',
  ],
};

const socialIcons: Array<IPropsSocialIcon> = [
  { type: 'twitter' },
  { type: 'facebook' },
  { type: 'wordpress' },
  { type: 'linkedin' },
];

const Footer = () => (
  <div className="mmk-footer">
    <div className="mmk-footer-menu">
      <div>
        <div className="mmk-footer-menu-title">Tools</div>
        <div className="mmk-footer-menu-tools">
          {menuItems['tools'].map((item, index) => (
            <div key={index.toString() + 'tools'}>{item}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="mmk-footer-menu-title">Bank Logins</div>
        <div className="mmk-footer-menu-bank">
          {menuItems['Bank Logins'].map((item, index) => (
            <div key={index.toString() + 'banklogin'}>{item}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="mmk-footer-menu-title">Gold Rate Today</div>
        <div className="mmk-footer-menu-bank">
          {menuItems['Gold Rate Today'].map((item, index) => (
            <div key={index.toString() + 'goldrate'}>{item}</div>
          ))}
        </div>
      </div>
    </div>
    <div className="divider bg-color-text-white opacity-2 mt-24" />
    <div className="mmk-footer-questions">
      <div className="mmk-footer-questions-title">Questions</div>
      <div className="mmk-footer-questions-email">
        Email us at{' '}
        <a
          className="mmk-footer-questions-email"
          href="mailto:askus@mymoneykarma.com"
        >
          askus@mymoneykarma.com
        </a>
      </div>
      <div className="mmk-footer-questions-social">
        {socialIcons.map((item, index) => (
          <div
            className="mmk-footer-questions-social-item"
            key={index.toString()}
          >
            <SocialIcon type={item.type} />
          </div>
        ))}
      </div>
      <div className="mmk-footer-questions-email">
        Disclaimer: The credit score provided by mymoneykarma is from Equifax.
        Visitors looking for their credit scores from any other Credit
        Information Company, are requested to refer to the official website of
        the concerned company for further details. Any reference to these Credit
        Information Companies on mymoneykarma website are strictly informative:
        mymoneykarma doesn't directly transact with them.
      </div>
    </div>
    <div className="divider bg-color-text-white opacity-2 mt-24" />
    <div className="mmk-footer-toc mt-24">
      <div className="mmk-footer-toc-copyright">
        © 2018 mymoneykarma, All Rights Reserved
      </div>

      <div className="mmk-footer-toc-toc">
        Terms and Condition | Privacy Policy | Security Disclaimer
      </div>
      <div className="dmca-badge mt-25">
        <a
          href="//www.dmca.com/Protection/Status.aspx?ID=f51a4bbb-c5fb-4093-917a-986573140006"
          title="DMCA.com Protection Status"
        >
          {' '}
          <img
            src="https://images.dmca.com/Badges/dmca_protected_16_120.png?ID=f51a4bbb-c5fb-4093-917a-986573140006"
            alt="DMCA.com Protection Status"
          />
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
