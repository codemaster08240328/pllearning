import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TRouterParam } from './types';
import Lottie from 'react-lottie';
import animationData from 'assets/loading-analyzing.json';
import './analyze.scss';

const Analyze = () => {
  const history = useHistory();
  const { type } = useParams<TRouterParam>();
  // setTimeout(() => {
  //   history.push('/hardwork');
  // }, 10000);

  setTimeout(() => {
    history.push(`/application-sorry`);
  }, 5000);

  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="mmk-apply-final">
      <div className="mmk-apply-final-img">
        <Lottie options={lottieOption} />
      </div>
      <h3 className="mt-24 color-text-blue-dark">Please wait</h3>
      <div className="mmk-apply-final-desc">
        We're analyzing your application..
      </div>
    </div>
  );
};

export default Analyze;
