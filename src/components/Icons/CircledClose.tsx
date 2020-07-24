import React from 'react';

type IProps = {
  color?: string;
};

const CircledCloseIcon: React.FC<IProps> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <defs>
      <path
        id="prefix__a_c_close"
        d="M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm2.927 5.073c-.272-.272-.712-.272-.984 0L8 7.016 6.057 5.073c-.272-.272-.712-.272-.984 0s-.272.712 0 .984L7.016 8 5.073 9.943c-.272.272-.272.712 0 .984.136.135.314.203.492.203s.356-.068.492-.203L8 8.984l1.943 1.943c.136.135.314.203.492.203s.356-.068.492-.203c.272-.272.272-.712 0-.984L8.984 8l1.943-1.943c.272-.272.272-.712 0-.984z"
      />
    </defs>
    <g fill="none" fill-rule="evenodd">
      <mask id="prefix__b_c_close" fill="#fff">
        <use href="#prefix__a_c_close" />
      </mask>
      <use fill={color ? color : '#D54C4C'} href="#prefix__a_c_close" />
      <g fill={color ? color : '#3A3A3A'} mask="url(#prefix__b_c_close)">
        <path d="M0 0L16 0 16 16 0 16z" />
      </g>
    </g>
  </svg>
);

export default CircledCloseIcon;
