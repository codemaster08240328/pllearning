import React from 'react';

type IProps = {
  color?: string;
};

const AlertIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <path
          id="prefix__a_alert"
          d="M8.011 8.195H7.99c-.428 0-.776-.347-.776-.775V5.298c0-.428.348-.776.776-.776h.022c.429 0 .776.348.776.776V7.42c0 .428-.348.775-.776.775zm-.797 2.351c0-.428.346-.775.774-.775h.023c.429 0 .776.347.776.775v.107c0 .428-.348.774-.776.774H7.99c-.428 0-.776-.346-.776-.774v-.107zm8.377-.596l-5.428-8.733C9.689.455 8.88 0 8 0c-.88 0-1.688.455-2.162 1.217L.408 9.95c-.512.823-.544 1.826-.087 2.682C.78 13.49 1.62 14 2.571 14h10.858c.952 0 1.793-.51 2.25-1.368.457-.856.425-1.859-.088-2.682z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(0 1)">
        <mask id="prefix__b_alert" fill="#fff">
          <use href="#prefix__a_alert" />
        </mask>
        <use fill={!!color ? color : '#000'} href="#prefix__a_alert" />
        <g fill={!!color ? color : '#3a3a3a'} mask="url(#prefix__b_alert)">
          <path d="M0 0L16 0 16 16 0 16z" transform="translate(0 -1)" />
        </g>
      </g>
    </svg>
  );
};

export default AlertIcon;
