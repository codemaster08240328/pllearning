import React from 'react';

type IProps = {
  color?: string;
};

const CircledPlusIcon: React.FC<IProps> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <defs>
      <path
        id="prefix__a_circled_plus"
        d="M12 0c6.617 0 12 5.383 12 12s-5.383 12-12 12S0 18.617 0 12 5.383 0 12 0zm0 5.39c-.614 0-1.11.496-1.11 1.11l-.001 4.39H6.5c-.614 0-1.11.496-1.11 1.11 0 .307.124.585.325.786.2.2.479.325.785.325h4.389V17.5c0 .306.124.584.325.785.201.201.48.325.786.325.614 0 1.11-.496 1.11-1.11V13.11h4.39c.614 0 1.11-.497 1.11-1.111s-.496-1.11-1.11-1.11h-4.39V6.5c0-.614-.496-1.11-1.11-1.11z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b_circled_plus" fill="#fff">
        <use href="#prefix__a_circled_plus" />
      </mask>
      <use fill={color ? color : '#D54C4C'} href="#prefix__a_circled_plus" />
      <g fill={color ? color : '#3A3A3A'} mask="url(#prefix__b_circled_plus)">
        <path d="M0 0L24 0 24 24 0 24z" />
      </g>
    </g>
  </svg>
);

export default CircledPlusIcon;
