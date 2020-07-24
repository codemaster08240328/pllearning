import React from 'react';

type IProps = {
  color?: string;
};

const InfoIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <path
          id="prefix__a_info"
          d="M8.667 5.144c0 .368-.299.667-.667.667-.368 0-.667-.299-.667-.667v-.07c0-.369.299-.667.667-.667.368 0 .667.298.667.667v.07zm0 5.782c0 .368-.299.667-.667.667-.368 0-.667-.299-.667-.667V7.813c0-.368.299-.667.667-.667.368 0 .667.299.667.667v3.113zM8 0C3.589 0 0 3.589 0 8c0 4.41 3.589 8 8 8s8-3.59 8-8c0-4.411-3.589-8-8-8z"
        />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <mask id="prefix__b_info" fill="#fff">
          <use href="#prefix__a_info" />
        </mask>
        <use fill="#fff" href="#prefix__a_info" />
        <g fill={color ? color : '#3A3A3A'} mask="url(#prefix__b_info)">
          <path d="M0 0L18 0 18 18 0 18z" transform="translate(-1 -1)" />
        </g>
      </g>
    </svg>
  );
};

export default InfoIcon;
