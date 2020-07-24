import React from 'react';
import { IProps } from './types';

import SmallIcon from './assets/Menu/mtr-menu-white.png';
import MediumIcon from './assets/Menu/mtr-menu-white@2x.png';
import LargeIcon from './assets/Menu/mtr-menu-white@3x.png';

const Icons = [SmallIcon, MediumIcon, LargeIcon];

const MenuIcon: React.FC<IProps> = ({ size }) => {
  const index = Math.ceil(size / 24) - 1;

  return <img src={Icons[index]} alt="menuIcon" />;
};

export default MenuIcon;
