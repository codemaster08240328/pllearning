import React from 'react';
import { useHistory } from 'react-router';
import Button from 'components/Button';

import SmallFasterImg from 'assets/good-application.png';
import MediumFasterImg from 'assets/good-application@2x.png';
import LargeFasterImg from 'assets/good-application@3x.png';

import './GetLoanFaster.scss';

const GetLoanFaster = () => {
  const history = useHistory();
  return (
    <div className="mmk-great-news">
      <div className="mmk-great-news-img">
        <img
          width="72"
          src={SmallFasterImg}
          alt="faster-img"
          srcSet={`${MediumFasterImg}, ${LargeFasterImg}`}
        />
      </div>
      <h3 className="mt-16 color-text-white">Great news!</h3>
      <div className="mt-8 color-text-white">
        HDFC is ready to review your application.
      </div>

      <div className="mt-24">
        <Button
          text="GET LOAN FASTER"
          type="secondary"
          onClick={() => history.push('/apply/15/long')}
        />
      </div>

      <div className="btn-description">
        Click button to upload documents. Providing only 4 documents gets you a
        decision in 4 hours.
      </div>

      <div className="mt-24 color-text-white">or</div>

      <div className="mt-24">
        <Button
          text="GO SLOWER"
          type="transparent"
          onClick={() => history.push('/application-summary/long')}
        />
      </div>

      <div className="btn-description">
        Click button to have a loan specialist help you. You will not receive an
        instant decision.
      </div>
    </div>
  );
};

export default GetLoanFaster;
