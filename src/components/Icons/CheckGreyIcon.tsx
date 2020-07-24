import React from 'react';

const CheckGreyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <path
          id="prefix__a"
          d="M13.243 1.224c.517-.508 1.35-.508 1.867 0 .52.514.52 1.348 0 1.861l-8.494 8.376c-.248.245-.584.382-.934.382l-.169-.01c-.298-.039-.577-.178-.788-.396L.866 7.427C.36 6.901.381 6.066.915 5.567c.529-.495 1.363-.474 1.866.048l2.926 3.039z"
        />
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(0 2)">
        <mask id="prefix__b" fill="#fff">
          <use href="#prefix__a" />
        </mask>
        <use fill="#979797" fill-rule="nonzero" href="#prefix__a" />
        <g fill="#3A3A3A" mask="url(#prefix__b)">
          <path d="M0 0L64 0 64 64 0 64z" transform="translate(0 -2)" />
        </g>
      </g>
    </svg>
  );
};

export default CheckGreyIcon;
