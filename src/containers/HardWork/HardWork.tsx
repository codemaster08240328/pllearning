import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from '../../components/Icons';
import BannerImg from '../../assets/applied.png';
import BannerImg2 from '../../assets/applied@2x.png';
import BannerImg3 from '../../assets/applied@3x.png';
import './HardWork.scss';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

const HardWork = () => {
  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;

      setCurrentScrollY(currentScrollY);
      console.log(goingUp, currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  return (
    <div className="hardwork">
      <div
        className={
          currentScrollY > 0
            ? 'hardwork-top-section set-background'
            : 'hardwork-top-section'
        }
      >
        <h3 className="color-text-white font-calibri-bold">mymoneykarma</h3>
        <MenuIcon size={24} />
      </div>
      <div className="hardwork-content">
        <div className="hardwork-content-banner">
          <img src={BannerImg} alt="" srcSet={`${BannerImg2}, ${BannerImg3}`} />
          <h3 className="mt-24 color-text-white">Hardwork pays!</h3>
          <div className="hardwork-content-banner-desc">
            HDFC can approve a loan of Rs 150,000 for EMI starting at Rs 4,561.
            <br />
            <br />A loan specialist will call for further details within 1
            business day.
          </div>
        </div>

        <div className="hardwork-content-button">
          <Link to="/loan/1">
            <Button text="GET LOAN FASTER" type="secondary" />
          </Link>
        </div>
        <div className="hardwork-content-decision">
          Get decision within 4 hours by answering only 4 more questions in less
          than 2 mins.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HardWork;
