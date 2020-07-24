import React from 'react';

import { MenuIcon } from '../../components/Icons';
import ApplicationSavedSmallImg from '../../assets/document-saved.png';
import ApplicationSavedMediumImg from '../../assets/document-saved@2x.png';
import ApplicationSavedLargeImg from '../../assets/document-saved@3x.png';

import './ApplicationSaved.scss';
import Footer from '../../components/Footer';

const ApplicationSaved = () => {
  return (
    <div className="application-saved">
      <div className="application-saved-top-section">
        <h3 className="color-text-white font-calibri-bold">mymoneykarma</h3>
        <MenuIcon size={24} />
      </div>
      <div className="application-saved-content">
        <img
          src={ApplicationSavedSmallImg}
          alt="document saved img"
          srcSet={`${ApplicationSavedMediumImg}, ${ApplicationSavedLargeImg}`}
        />
        <h3 className="mt-32 color-text-blue-dark">
          Application has been saved
        </h3>
        <div className="application-saved-content-banner-desc">
          Login to your account any time to resume your application.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationSaved;
