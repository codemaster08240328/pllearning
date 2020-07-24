import React from 'react';

type IProps = {
  color?: string;
};

const SuitcaseIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <defs>
        {!color && (
          <linearGradient
            id="prefix__c_suit"
            x1="0%"
            x2="97.071%"
            y1="0%"
            y2="97.071%"
          >
            <stop offset="0%" stopColor="#0B4182" />
            <stop offset="53.527%" stopColor="#1E88E5" />
            <stop offset="100%" stopColor="#40BAF5" />
          </linearGradient>
        )}
        <path
          id="prefix__a_suit"
          d="M23.52 0c2.382 0 4.318 1.922 4.318 4.286v2.571h5.844C36.064 6.857 38 8.78 38 11.143v20.571C38 34.078 36.064 36 33.682 36H4.318C1.936 36 0 34.078 0 31.714V11.143c0-2.364 1.936-4.286 4.318-4.286h5.844V4.286C10.162 1.922 12.098 0 14.48 0zm12.752 19H22.2v1H15v-1H1.727v12.714c0 1.363 1.075 2.483 2.428 2.567l.163.005h29.364c1.428 0 2.59-1.154 2.59-2.572V19zm-2.59-10.429H4.318c-1.428 0-2.59 1.154-2.59 2.572L1.726 17H15v-1h7.2v1h14.072v-5.857c0-1.363-1.074-2.482-2.427-2.567l-.163-.005zM23.52 1.714h-9.04c-1.429 0-2.591 1.154-2.591 2.572v2.571H26.11V4.286c0-1.418-1.162-2.572-2.59-2.572z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(5 6)">
        <mask id="prefix__b_suit" fill="#fff">
          <use href="#prefix__a_suit" />
        </mask>
        <use fill={!!color ? color : '#000'} href="#prefix__a_suit" />
        <g fill="url(#prefix__c_suit)" mask="url(#prefix__b_suit)">
          <path d="M0 0L64 0 64 64 0 64z" transform="translate(-5 -6)" />
        </g>
      </g>
    </svg>
  );
};

export default SuitcaseIcon;
