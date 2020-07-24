import React from 'react';

import { MenuIcon } from '../../components/Icons';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import './Sorry.scss';

const Sorry = () => {
  return (
    <div className="application-sorry">
      <div className="application-sorry-top-section">
        <h3 className="color-text-white font-calibri-bold">mymoneykarma</h3>
        <MenuIcon size={24} />
      </div>
      <div className="application-sorry-content">
        <h3 className="color-text-blue-dark">Sorry,</h3>
        <div className="application-sorry-content-banner-desc">
          We are presently unable to fetch the best personal loan deals for you.
        </div>

        <h5 className="mt-32">
          Don't worry! <br /> We can get you a Low Interest rate Gold Loan in 1
          day.
        </h5>

        <div className="mt-24">
          <Button text="GET A GOLD LOAN" />
        </div>
        {/* <img
          src={ApplicationsorrySmallImg}
          alt="document saved img"
          srcSet={`${ApplicationSavedMediumImg}, ${ApplicationSavedLargeImg}`}
        /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Sorry;
