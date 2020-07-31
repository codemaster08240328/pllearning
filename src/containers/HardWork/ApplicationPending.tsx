import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from '../../components/Icons';
import BannerImg from '../../assets/sending.png';
import BannerImg2 from '../../assets/sending@2x.png';
import BannerImg3 from '../../assets/sending@3x.png';
import './HardWork.scss';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

const ApplicationPending = () => {
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
        <Link to="/">
          <h3 className="color-text-white font-calibri-bold">mymoneykarma</h3>
        </Link>
        <MenuIcon size={24} />
      </div>
      <div className="hardwork-content">
        <div className="hardwork-content-banner">
          <img src={BannerImg} alt="" srcSet={`${BannerImg2}, ${BannerImg3}`} />
          <h3 className="mt-24 color-text-white">Application Received!</h3>
          <div className="hardwork-content-banner-desc">
            A loan specialist will call you within 1 day to take your
            application forward. Please accept the call.
          </div>
        </div>

        <div className="hardwork-content-button">
          <Link to="/">
            <Button text="BACK TO HOME" type="transparent" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationPending;
