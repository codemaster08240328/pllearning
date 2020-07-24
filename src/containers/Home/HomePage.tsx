import React from 'react';
import { Link } from 'react-router-dom';

import { MenuIcon, CheckIcon } from '../../components/Icons';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import FAQComponent from './FAQ';

import Banner from '../../assets/gl-banner.png';
import ICICIBank from '../../assets/bank/icici-bank-salary.png';
import HDFCBank from '../../assets/bank/hdfc-bank-salary.png';
import RBLBank from '../../assets/bank/rbl-bank-salary.png';
import BAJAJBank from '../../assets/bank/bajaj-bank-salary.png';
import IDFCBank from '../../assets/bank/idfc-bank-salary.png';
import HDBBank from '../../assets/bank/hdb-bank-salary.png';

import 'react-awesome-slider/src/core/styles.scss';
import './HomePage.scss';

const homeApplyItems: Array<string> = [
  'Options from 10+ lenders',
  'Loans suited to your finances',
  'Low interest rates',
];

const BankImages = [
  [HDFCBank, ICICIBank, BAJAJBank, IDFCBank, HDBBank, RBLBank],
];

const renderSliderContent = (index: number) => {
  return (
    <div className="slider-content">
      {BankImages[index].map((image, i) => (
        <div key={i.toString() + index.toString()}>
          <img src={image} alt={`${index}-${i}-bank`} width="100%" />
        </div>
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-top-section">
        <h3 className="color-text-white font-calibri-bold">mymoneykarma</h3>
        <MenuIcon size={24} />
      </div>
      <div className="home-img">
        <img src={Banner} alt="home-banner" width="100%" />
      </div>
      <div className="home-apply-section">
        <h3 className="color-text-blue-dark">
          Find a personal loan that suits you best
        </h3>
        <div className="mt-16">
          {homeApplyItems.map((item, index) => (
            <div className="mt-8 home-apply-item" key={index.toString()}>
              <CheckIcon size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <Link to="/apply/1">
          <Button text="APPLY NOW" className="mt-24" />
        </Link>

        <h4 className="color-text-blue-dark mt-32">Our partners</h4>

        {renderSliderContent(0)}
      </div>
      {/* <div className="home-pl-data mt-8">
        <h4 className="color-text-blue-dark">Your personal loan application</h4>
        <div className="home-pl-data-content"></div>
      </div> */}
      <div className="home-pl-faq">
        <h4 className="home-pl-faq-title">F.A.Q</h4>
        <FAQComponent question="What is a personal loan?" showDivider>
          A personal loan is a loan approved to an individual to fund any
          personal expense, such as a wedding, a home renovation or a family
          vacation. Unlike many other kinds of loan, there are less regulations
          on how the borrowed amount is finally used - the borrower has greater
          freedom to use the money for any purpose they want.
          <br />
          <br />
          <b>Two attractive features in personal loans:</b>
          <br />
          <br />
          It provides flexibility of end-use as there are no restrictions on how
          you should spend the loan amount. This is in contrast to a home loan
          or auto loan because when you apply for such loans, you have to spend
          on the property or vehicle respectively. personal loans give you the
          freedom to use the money in the way you want.
          <br />
          <br />A personal loan is an 'unsecured loan,' meaning that you are not
          at all required to provide any security to the lender in the form of
          cash or any other assets. This might make it more attractive to some
          customers who may not be able to raise the cash required as
          collateral.
        </FAQComponent>
        <FAQComponent question="Where can I get a personal loan?" showDivider>
          You can approach one of the following institutions for a personal
          loan. All of these will assess your credit history and credit score.
          They will probably review other factors as well, including your
          current job and educational qualification before approving you for a
          loan
          <br />
          <br />
          <b>Banks</b>
          <br />
          <br />
          It is not very easy to get a personal loan from a bank. However, it is
          the most preferred option as the procedure of obtaining a personal
          loan from a recognized and reputed financial institution is secure as
          well as convenient. In all probabilities, you will approach the bank
          where you already have an account.
          <br />
          <br />
          <b>P2P Lending</b>
          <br />
          <br />
          Peer-to-Peer lending is a recent option that has opened up in this
          field. They offer online suggestions and options for loans, which may
          be helpful even if you do not qualify for them through more
          traditional channels.
          <br />
          <br />
          Regardless of which among the three you choose to go with, make sure
          that you limit the number of applications, as too many of them can
          negatively affect your credit score. The moment you apply for a loan,
          the lender will check your credit report to assess your
          creditworthiness. This results in a hard inquiry and you lose a few
          points on your credit score.
          <br />
          <br />
          You might find other alternatives to personal loans. Payday and car
          title loans are among those. However, these loans are not recommended
          as they typically levy exorbitant interest rates and fees.
          <br />
          <br />
          <b>Getting a personal loan when your credit needs work.</b>
          <br />
          <br />
          If you have a credit history that needs work, you may consider getting
          a personal loan. It could be difficult to get and obviously more
          expensive. The lending body will evaluate your financial situation and
          your credit history before approving a loan. Interest rates might be
          very high if your credit score isn't good enough.
          <br />
          <br />
          If your credit score doesn't satisfy the lending body, you might need
          a co-signer who has a good credit history in order to get approval for
          such a loan. However, in that scenario, the co-signer would be legally
          responsible for repaying the debt. This might complicate the
          situation, and you are advised to think it through before taking a
          step ahead.
        </FAQComponent>
        <FAQComponent
          question="How do I apply for a Personal loan?"
          showDivider
        >
          There are various ways to apply for a loan. You can login and apply
          directly online at the bank/NBFC's website, or you can go in person to
          the branch to apply for a loan. Go through online comparison websites;
          or you can contact us at mymoneykarma.
          <br />
          <br />
          If you want to apply for a loan and think your credit score might not
          be good enough, mymoneykarma can guide you on how to boost your score
          in the most efficient and effective way so that your loan application
          is approved. You will also be matched with the most suitable loan
          offer for you in the market. With a good credit score, you can have a
          faster and hassle-free access to credit.
        </FAQComponent>
        <FAQComponent
          question="My credit score is below 750. Will I get a personal loan?"
          showDivider
        >
          There is no guarantee that your loan will be approved at a particular
          score. However, a higher score has a better chance of approval; at the
          same time, a person with a lower score might also get a loan approval.
          Therefore, you should not be worried if your credit score is below 750
          as that does not mean an automatic loan rejection. Let's elaborate on
          different ranges of credit score and their impact on personal loan
          approval:
          <ul>
            <li>
              300-599: Your personal loan will not get approved because of low
              credit score. The application itself would initiate a hard inquiry
              that would serve as a warning sign to potential lenders that you
              don’t have a good credit history and are in dire need of credit.
              In such a situation, let mymoneykarma help you improve your credit
              score{' '}
            </li>
            <br />
            <br />
            <li>
              600-749: This may not be considered a high score, but you may have
              chances of getting your loan approved by lenders because lenders
              might approve your loan based on other factors like your salary,
              consistency of employment and other liabilities.
            </li>
            <br />
            <br />
            <li>
              750 Above: Great score to apply for personal loans. The chances of
              obtaining a loan are higher, but the lenders will still consider
              other factors such as your salary, other loans, cheque bounces,
              etc. before taking a final call.
            </li>
          </ul>
        </FAQComponent>
        <FAQComponent
          question="When should I opt for a personal loan?"
          showDivider
        >
          If you are in urgent need of money, then a personal loan might be the
          best option. However, it is important to keep in mind that you will be
          paying a higher rate of interest on this kind of loan.
          <br />
          <br />
          Therefore, you should have a plan for being able to make all your
          payments on time. It is important to have a good credit score to apply
          for a personal loan.
          <br />
          <br />
          Applications with low credit scores do not have a good chance of being
          approved; and with each rejection, your credit score goes further
          down.
          <br />
          <br />
          You can check your credit score at mymoneykarma for free and know
          which are the banks you should approach based on your credit score.
        </FAQComponent>
        <FAQComponent
          question="How do I know my credit score before applying for a personal loan?"
          showDivider
        >
          Let us help you with this. mymoneykarma helps you to get your credit
          score for free, so that you can take informed decisions.
          <br /> mymoneykarma also helps you understand what are the best banks
          to apply for a personal loan based on your credit score
        </FAQComponent>
        <FAQComponent
          question="What are the documents I needed to apply for personal loan?"
          showDivider
        >
          <ul>
            <li>
              Identity proof: Photocopy passport, voter ID card, and driving
              license.
            </li>
            <br />
            <br />
            <li>
              Address proof: Photocopy of ration card/telephone or electricity
              bill/rental agreement/passport.
            </li>
            <br />
            <br />
            <li>
              3 months' bank statement, updated bank passbook till 6 months
            </li>
            <br />
            <br />
            <li>Current dated salary certificate with Form 16 latest.</li>
          </ul>
        </FAQComponent>
        <FAQComponent question="What is a personal loan emiculator or personal loan eligibility check?">
          Personal loan emi calculator is a handy tool to check your
          eligibility, calculate your emi amount, rate of interest and loan
          tenure at mymoneykarma.
        </FAQComponent>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
