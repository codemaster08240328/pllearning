import React from 'react';

type IProps = {
  color?: string;
};

const UserSmileIcon: React.FC<IProps> = ({ color }) => {
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
            id="prefix__c_user"
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
          id="prefix__a_user"
          d="M22 0c12.13 0 22 9.87 22 22s-9.87 22-22 22S0 34.13 0 22 9.87 0 22 0zm0 2C10.972 2 2 10.972 2 22s8.972 20 20 20 20-8.972 20-20S33.028 2 22 2zm11.616 23.346c.334 0 .646.166.832.446.186.278.22.63.09.938-3.472 8.326-11.394 8.616-12.462 8.616h-.048l-.07-.002c-.004.01-8.788.278-12.496-8.614-.13-.308-.096-.66.09-.938.186-.28.498-.446.832-.446zm-1.59 2H11.974c3.402 6.168 9.702 6.008 9.986 6 .36.008 6.666.168 10.066-6zM30.66 12.878c1.28 0 2.322 1.042 2.322 2.322 0 1.278-1.042 2.32-2.322 2.32s-2.322-1.042-2.322-2.32c0-1.28 1.042-2.322 2.322-2.322zm-17.153 0c1.28 0 2.322 1.042 2.322 2.322 0 1.278-1.042 2.32-2.322 2.32s-2.322-1.042-2.322-2.32c0-1.28 1.042-2.322 2.322-2.322z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <mask id="prefix__b_user" fill="#fff">
          <use href="#prefix__a_user" />
        </mask>
        <use fill={!!color ? color : '#fff'} href="#prefix__a_user" />
        <g fill="url(#prefix__c_user)" mask="url(#prefix__b_user)">
          <path d="M0 0L64 0 64 64 0 64z" transform="translate(-2 -2)" />
        </g>
      </g>
    </svg>
  );
};

export default UserSmileIcon;
