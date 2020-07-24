import React from 'react';
import { IProps } from './types';

import SmallIcon from './assets/Arrow/left-arrow.png';
import MediumIcon from './assets/Arrow/left-arrow@2x.png';
import LargeIcon from './assets/Arrow/left-arrow@3x.png';

const Icons = [SmallIcon, MediumIcon, LargeIcon];

const BackIcon: React.FC<IProps> = ({ size }) => {
  const index = Math.ceil(size / 24) - 1;

  return <img src={Icons[index]} alt="menuIcon" />;
};

export default BackIcon;
