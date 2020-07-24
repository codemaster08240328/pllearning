import React from 'react';
import { IProps } from './types';

import SmallIcon from './assets/Currency/inr.png';
import MediumIcon from './assets/Currency/inr@2x.png';
import LargeIcon from './assets/Currency/inr@3x.png';

const Icons = [SmallIcon, MediumIcon, LargeIcon];

const CurrencyIcon: React.FC<IProps> = ({ size }) => {
  const index = Math.ceil(size / 16) - 1;

  return <img src={Icons[index]} alt="menuIcon" width="100%" height="100%" />;
};

export default CurrencyIcon;
