import React from 'react';

type IProps = {
  color?: string;
  direction: 'up' | 'down' | 'left' | 'right';
};

const renderDownIcon = (color: string | undefined) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <defs>
      <path
        id="prefix__a_down"
        d="M8.018-.412c0-.237-.154-.452-.39-.543-.238-.091-.51-.041-.691.128L2.186 3.584c-.248.23-.248.602 0 .832l4.75 4.412c.122.112.284.172.449.172.081 0 .164-.015.242-.045.237-.09.391-.306.391-.543V-.412z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3 5)">
      <mask id="prefix__b_down" fill="#fff">
        <use href="#prefix__a_down" />
      </mask>
      <use
        fill={color ? color : '#3a3a3a'}
        transform="matrix(0 -1 -1 0 9.01 9.01)"
        href="#prefix__a_down"
      />
    </g>
  </svg>
);

const renderUpIcon = (color: string | undefined) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <defs>
      <path
        id="prefix__a_up"
        d="M8.018-.412c0-.237-.154-.452-.39-.543-.238-.091-.51-.041-.691.128L2.186 3.584c-.248.23-.248.602 0 .832l4.75 4.412c.122.112.284.172.449.172.081 0 .164-.015.242-.045.237-.09.391-.306.391-.543V-.412z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3 4)">
      <mask id="prefix__b_up" fill="#fff">
        <use href="#prefix__a_up" />
      </mask>
      <use
        fill={color ? color : '#3a3a3a'}
        transform="rotate(90 5.01 4)"
        href="#prefix__a_up"
      />
    </g>
  </svg>
);

const renderRightIcon = (color: string | undefined) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <defs>
      <path
        id="prefix__a_right"
        d="M6.018.588c0-.237-.154-.452-.39-.543-.238-.091-.51-.041-.691.128L.186 4.584c-.248.23-.248.602 0 .832l4.75 4.412c.122.112.284.172.449.172.081 0 .164-.015.242-.045.237-.09.391-.306.391-.543V.588z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(5 3)">
      <mask id="prefix__b_right" fill="#fff">
        <use href="#prefix__a_right" />
      </mask>
      <use
        fill={color ? color : '#3a3a3a'}
        transform="matrix(-1 0 0 1 6.018 0)"
        href="#prefix__a_right"
      />
      <g fill={color ? color : '#3a3a3a'} mask="url(#prefix__b_right)">
        <path d="M0 0L16 0 16 16 0 16z" transform="translate(-6 -3)" />
      </g>
    </g>
  </svg>
);

const renderLeftIcon = (color: string | undefined) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
  >
    <defs>
      <path
        id="prefix__a_left"
        d="M6.018.588c0-.237-.154-.452-.39-.543-.238-.091-.51-.041-.691.128L.186 4.584c-.248.23-.248.602 0 .832l4.75 4.412c.122.112.284.172.449.172.081 0 .164-.015.242-.045.237-.09.391-.306.391-.543V.588z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(5 3)">
      <mask id="prefix__b_left" fill="#fff">
        <use href="#prefix__a_left" />
      </mask>
      <use fill={color ? color : '#3a3a3a'} href="#prefix__a_left" />
      <g fill={color ? color : '#3a3a3a'} mask="url(#prefix__b_left)">
        <path d="M0 0L16 0 16 16 0 16z" transform="translate(-4 -3)" />
      </g>
    </g>
  </svg>
);

const ArrowIcon: React.FC<IProps> = ({ color, direction }) => {
  return (
    <>
      {direction === 'up' && renderUpIcon(color)}
      {direction === 'down' && renderDownIcon(color)}
      {direction === 'left' && renderLeftIcon(color)}
      {direction === 'right' && renderRightIcon(color)}
    </>
  );
};

export default ArrowIcon;
