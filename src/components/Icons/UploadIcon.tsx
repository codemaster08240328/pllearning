import React from 'react';

type IProps = {
  color?: string;
};

const UploadIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <path
          id="prefix__a_upload"
          d="M13 13c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h12zM6.593.186c.23-.248.602-.248.832 0l4.411 4.75c.17.182.22.454.128.691-.091.237-.306.391-.543.391l-3.422.001L8 11.01c0 .552-.448 1-1 1s-1-.448-1-1V6.02H2.596c-.237 0-.452-.155-.543-.392-.03-.078-.045-.16-.045-.242 0-.165.06-.327.172-.448z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1)">
        <mask id="prefix__b_upload" fill="#fff">
          <use href="#prefix__a_upload" />
        </mask>
        <use fill={color ? color : '#3A3A3A'} href="#prefix__a_upload" />
        <g fill={color ? color : '#3A3A3A'} mask="url(#prefix__b_upload)">
          <path d="M0 0L16 0 16 16 0 16z" transform="translate(-1)" />
        </g>
      </g>
    </svg>
  );
};

export default UploadIcon;
