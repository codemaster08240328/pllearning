import React from 'react';
import Button from '../../components/Button';

import SmallFasterImg from '../../assets/faster.png';
import MediumFasterImg from '../../assets/faster@2x.png';
import LargeFasterImg from '../../assets/faster@3x.png';

import './GreatNews.scss';

const GreatNews = () => {
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
        Based on the information provided, HDFC is most likely to provide you
        the loan.
        <br />
        <br />
        Please answer a few more questions to get a decision in 4 hours.
      </div>

      <div className="mmk-great-news-button">
        <Button text="CONTINUE" type="secondary" />
      </div>
    </div>
  );
};

export default GreatNews;
