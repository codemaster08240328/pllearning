import React from 'react';
import { IProps } from './types';

import SmallIcon from './assets/Check/checkmark.png';
import MediumIcon from './assets/Check/checkmark@2x.png';
import LargeIcon from './assets/Check/checkmark@3x.png';

const Icons = [SmallIcon, MediumIcon, LargeIcon];

const CheckIcon: React.FC<IProps> = ({ size }) => {
  const index = Math.ceil(size / 16) - 1;

  return <img src={Icons[index]} alt="menuIcon" />;
};

export default CheckIcon;
