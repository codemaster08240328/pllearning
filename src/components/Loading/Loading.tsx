import React from 'react';
import { ClipLoader } from 'react-spinners';

import './styles.scss';

const Loading = () => (
  <div className="mmk-loading">
    <ClipLoader size={30} color="#fff" />
  </div>
);

export default Loading;
