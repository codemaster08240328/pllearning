import React from 'react';

type IProps = {
  color?: string;
};

const CloseIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id="prefix__a_close"
          d="M1.5 17.5c.256 0 .512-.098.707-.293L9 10.414l6.793 6.793c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.39.391-1.024 0-1.414L10.414 9l6.793-6.793c.391-.39.391-1.024 0-1.414-.39-.391-1.023-.391-1.414 0L9 7.586 2.207.793C1.817.402 1.184.402.793.793c-.39.39-.39 1.024 0 1.414L7.586 9 .793 15.793c-.39.39-.39 1.024 0 1.414.195.195.451.293.707.293z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(3 3)">
        <mask id="prefix__b_close" fill="#fff">
          <use href="#prefix__a_close" />
        </mask>
        <use fill="#000" href="#prefix__a_close" />
        <g fill={color ? color : '#3A3A3A'} mask="url(#prefix__b_close)">
          <path d="M0 0L24 0 24 24 0 24z" transform="translate(-3 -3)" />
        </g>
      </g>
    </svg>
  );
};

export default CloseIcon;
