import React from 'react';

type IProps = {
  color?: string;
  checked?: boolean;
  size?: number;
};

const renderIconChecked = (color: string | undefined) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <defs>
      <path
        id="prefix__a_circle_checked"
        d="M12 0c6.617 0 12 5.383 12 12s-5.383 12-12 12S0 18.617 0 12 5.383 0 12 0zm5.685 7.311c-.42-.415-1.097-.415-1.517 0L9.97 13.44l-2.14-2.114c-.418-.414-1.097-.414-1.516 0-.419.415-.419 1.086 0 1.5l2.897 2.863c.201.2.474.311.759.311.284 0 .557-.111.758-.31l6.957-6.88c.42-.414.42-1.084 0-1.499z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b_circle_checked" fill="#fff">
        <use href="#prefix__a_circle_checked" />
      </mask>
      <use fill={color ? color : '#37D47E'} href="#prefix__a_circle_checked" />
      <g fill={color ? color : '#3A3A3A'} mask="url(#prefix__b_circle_checked)">
        <path d="M0 0L24 0 24 24 0 24z" />
      </g>
    </g>
  </svg>
);

const renderIconUnchecked = (color: string | undefined) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <defs>
      <path
        id="prefix__a_circle_unchecked"
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="prefix__b_circle_unchecked" fill="#fff">
        <use href="#prefix__a_circle_unchecked" />
      </mask>
      <use
        fill={color ? color : '#D0D0D0'}
        fillRule="nonzero"
        href="#prefix__a_circle_unchecked"
      />
      <g
        fill={color ? color : '#3A3A3A'}
        mask="url(#prefix__b_circle_unchecked)"
      >
        <path d="M0 0L24 0 24 24 0 24z" />
      </g>
    </g>
  </svg>
);

const CircledCheckIcon: React.FC<IProps> = ({ checked, color, size }) => {
  const style = !!size ? { display: 'flex', width: size } : { display: 'flex' };
  return (
    <div style={style}>
      {checked && renderIconChecked(color)}
      {!checked && renderIconUnchecked(color)}
    </div>
  );
};

export default CircledCheckIcon;
